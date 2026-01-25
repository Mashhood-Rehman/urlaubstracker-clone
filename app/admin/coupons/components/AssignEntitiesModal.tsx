'use client';

import { useState, useEffect } from 'react';
import { icons } from '@/assets/icons';

interface Entity {
  id: number;
  title?: string;
  title_fr?: string;
  mainHeading?: string;
  name?: string;
  code?: string;
}

interface AssignEntitiesModalProps {
  couponId: number;
  onClose: () => void;
  onSubmit: () => void;
}

export default function AssignEntitiesModal({
  couponId,
  onClose,
  onSubmit,
}: AssignEntitiesModalProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [entityType, setEntityType] = useState<string>('flights');
  const [entities, setEntities] = useState<Entity[]>([]);
  const [selectedEntities, setSelectedEntities] = useState<Set<number>>(new Set());
  const [assignedEntityIds, setAssignedEntityIds] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data.success) {
          const allCats = [
            { name: 'Hotel', slug: 'hotels' },
            { name: 'Flight', slug: 'flights' },
            { name: 'Rental', slug: 'rentals' },
            ...data.data.filter((c: any) => !['Hotel', 'Flight', 'Rental'].includes(c.name)).map((c: any) => ({ ...c, slug: 'dynamicProducts' }))
          ];
          setCategories(allCats);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCouponData();
  }, [couponId, entityType]);

  useEffect(() => {
    fetchEntities();
  }, [entityType]);

  const fetchCouponData = async () => {
    try {
      const response = await fetch(`/api/coupons/${couponId}`);
      const data = await response.json();
      const coupon = data.coupon || data;

      // Set already assigned entity IDs based on entity type
      if (entityType === 'flights' && coupon.flightIds) {
        setAssignedEntityIds(new Set(coupon.flightIds));
        setSelectedEntities(new Set(coupon.flightIds));
      } else if (entityType === 'hotels' && coupon.hotelIds) {
        setAssignedEntityIds(new Set(coupon.hotelIds));
        setSelectedEntities(new Set(coupon.hotelIds));
      } else if (entityType === 'rentals' && coupon.rentalIds) {
        setAssignedEntityIds(new Set(coupon.rentalIds));
        setSelectedEntities(new Set(coupon.rentalIds));
      } else if (coupon.dynamicProductIds) {
        // Check if the current category is dynamic
        const currentCat = categories.find(c => c.slug === entityType || (c.slug === 'dynamicProducts' && c.name === entityType));
        if (currentCat && currentCat.slug === 'dynamicProducts') {
          setAssignedEntityIds(new Set(coupon.dynamicProductIds));
          setSelectedEntities(new Set(coupon.dynamicProductIds));
        }
      }
    } catch (err) {
      console.error('Failed to fetch coupon data:', err);
    }
  };

  const fetchEntities = async () => {
    try {
      setLoading(true);
      setError('');

      let url = `/api/${entityType}?limit=1000`;

      // If it's a dynamic product category, we might need to filter by category name
      // assuming /api/products returns all and we filter on frontend, 
      // or /api/products?category=Name if implemented.
      // Based on previous tool calls, /api/products returns all.

      if (entityType !== 'flights' && entityType !== 'hotels' && entityType !== 'rentals') {
        url = `/api/products?category=${entityType}&limit=1000`;
      }

      const response = await fetch(url);
      const data = await response.json();

      let items = [];
      if (entityType === 'hotels' || entityType === 'flights' || entityType === 'rentals') {
        items = data.data || data[entityType] || [];
      } else {
        items = data.data || [];
      }
      setEntities(items);
    } catch (err) {
      setError(`Failed to fetch ${entityType}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEntity = (id: number) => {
    const newSelected = new Set(selectedEntities);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedEntities(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedEntities.size === filteredEntities.length) {
      setSelectedEntities(new Set());
    } else {
      setSelectedEntities(new Set(filteredEntities.map((e) => e.id)));
    }
  };

  const handleAssign = async () => {
    if (selectedEntities.size === 0) {
      setError('Please select at least one entity');
      return;
    }

    try {
      setAssigning(true);
      setError('');
      setSuccess('');

      const isDynamic = !['flights', 'hotels', 'rentals'].includes(entityType);

      const payload = {
        [isDynamic ? 'dynamicProducts' : entityType]: Array.from(selectedEntities),
      };

      const response = await fetch(`/api/coupons/${couponId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to assign entities');
      }

      setSuccess(`Successfully assigned ${selectedEntities.size} units to coupon`);
      setTimeout(() => {
        onSubmit();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setAssigning(false);
    }
  };

  const filteredEntities = entities.filter((entity) => {
    let searchable = '';
    if (entityType === 'hotels') {
      searchable = ((entity as any).title_fr || (entity as any).title || '').toLowerCase();
    } else if (entityType === 'rentals') {
      searchable = ((entity as any).mainHeading || (entity as any).title || '').toLowerCase();
    } else {
      searchable = (entity.title || entity.name || '').toLowerCase();
    }
    return searchable.includes(searchTerm.toLowerCase());
  });

  const getEntityLabel = (entity: Entity) => {
    if (entityType === 'hotels') {
      return (entity as any).title_fr || (entity as any).title || entity.name || `ID: ${entity.id}`;
    } else if (entityType === 'rentals') {
      return (entity as any).mainHeading || (entity as any).title || entity.name || `ID: ${entity.id}`;
    }
    return entity.title || entity.name || `ID: ${entity.id}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-(--white) rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-(--gray-100)">
          <h2 className="text-2xl font-bold text-(--gray-900)">Assign Coupon to {entityType}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-(--gray-100) rounded-lg transition-colors"
          >
            <icons.X className="w-5 h-5 text-(--gray-600)" />
          </button>
        </div>

        {/* Entity Type Selector */}
        <div className="p-6 border-b border-(--gray-100) bg-(--gray-50)/50">
          <p className="text-sm font-medium text-(--gray-700) mb-3">Select Category:</p>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setEntityType(cat.slug === 'dynamicProducts' ? cat.name : cat.slug);
                  setSelectedEntities(new Set());
                  setSearchTerm('');
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${(entityType === cat.slug || entityType === cat.name)
                  ? 'bg-(--primary) text-(--white)'
                  : 'bg-(--gray-200) text-(--gray-800) hover:bg-(--gray-300)'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-6 p-4 bg-(--error)/10 border border-(--error)/20 rounded-lg text-(--error)">
            {error}
          </div>
        )}

        {success && (
          <div className="mx-6 mt-6 p-4 bg-(--success)/10 border border-(--success)/20 rounded-lg text-(--success)">
            {success}
          </div>
        )}

        {/* Search */}
        <div className="p-6 border-b border-(--gray-100)">
          <div className="relative">
            <icons.Search className="absolute left-3 top-3 w-5 h-5 text-(--gray-400)" />
            <input
              type="text"
              placeholder={`Search ${entityType}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-(--gray-200) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary) bg-(--white) text-(--foreground)"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <icons.Loader className="w-8 h-8 animate-spin text-(--primary)" />
          </div>
        ) : (
          <div className="p-6">
            {/* Select All */}
            {filteredEntities.length > 0 && (
              <div className="mb-4 pb-4 border-b border-(--gray-100)">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center gap-3 p-3 hover:bg-(--gray-50) rounded-lg transition-colors w-full"
                >
                  <input
                    type="checkbox"
                    checked={
                      filteredEntities.length > 0 &&
                      selectedEntities.size === filteredEntities.length
                    }
                    readOnly
                    className="w-4 h-4 text-(--primary) rounded cursor-pointer focus:ring-(--primary)"
                  />
                  <span className="font-medium text-(--gray-900)">
                    Select All ({filteredEntities.length})
                  </span>
                </button>
              </div>
            )}

            {/* Entity List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredEntities.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-(--gray-500)">No {entityType} found</p>
                </div>
              ) : (
                filteredEntities.map((entity) => (
                  <div
                    key={entity.id}
                    onClick={() => handleSelectEntity(entity.id)}
                    className="flex items-center gap-3 p-3 hover:bg-(--gray-50) rounded-lg transition-colors cursor-pointer border border-(--gray-200) hover:border-(--primary)/30"
                  >
                    <input
                      type="checkbox"
                      checked={selectedEntities.has(entity.id)}
                      readOnly
                      className="w-4 h-4 text-(--primary) rounded cursor-pointer focus:ring-(--primary)"
                    />
                    <span className="flex-1 text-(--gray-900)">{getEntityLabel(entity)}</span>
                    <div className="flex items-center gap-2">
                      {assignedEntityIds.has(entity.id) && (
                        <span className="text-xs bg-(--success)/10 text-(--success) px-2 py-1 rounded font-medium">
                          ✓ Assigned
                        </span>
                      )}
                      {selectedEntities.has(entity.id) && (
                        <icons.Check className="w-5 h-5 text-(--primary)" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Selection Counter */}
            {selectedEntities.size > 0 && (
              <div className="mt-4 p-3 bg-(--primary)/10 border border-(--primary)/20 rounded-lg">
                <p className="text-(--primary) font-medium">
                  {selectedEntities.size} {entityType} selected
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-(--gray-100) bg-(--gray-50)/50">
          <button
            onClick={onClose}
            disabled={assigning}
            className="px-4 py-2 text-(--gray-700) border border-(--gray-300) rounded-lg hover:bg-(--gray-50) transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={assigning || selectedEntities.size === 0}
            className="flex items-center gap-2 px-4 py-2 bg-(--primary) text-(--white) rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {assigning && <icons.Loader className="w-4 h-4 animate-spin" />}
            Assign ({selectedEntities.size})
          </button>
        </div>
      </div>
    </div>
  );
}
