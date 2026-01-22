'use client';

import { useState, useEffect } from 'react';
import { Plus, Loader } from 'lucide-react';
import CouponList from './components/CouponList';
import CouponForm from './components/CouponForm';
import AssignEntitiesModal from './components/AssignEntitiesModal';

interface Coupon {
  id: number;
  code: string;
  name: string;
  description: string | null;
  discountValue: number;
  maxUses: number | null;
  currentUses: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [assigningCoupon, setAssigningCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/coupons?page=1&limit=100');
      const data = await response.json();
      setCoupons(data.coupons);
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this coupon?')) {
      try {
        const response = await fetch(`/api/coupons/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setCoupons(coupons.filter((c) => c.id !== id));
        } else {
          alert('Failed to delete coupon');
        }
      } catch (error) {
        console.error('Error deleting coupon:', error);
        alert('Error deleting coupon');
      }
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingCoupon(null);
    fetchCoupons();
  };

  const handleAssignComplete = () => {
    setAssigningCoupon(null);
    fetchCoupons();
  };

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Coupons Management</h1>
          <p className="text-gray-600 mt-1">Create and manage discount coupons</p>
        </div>
        <button
          onClick={() => {
            setEditingCoupon(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Coupon
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <CouponForm
            coupon={editingCoupon}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingCoupon(null);
            }}
          />
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by code or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : filteredCoupons.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No coupons found</p>
        </div>
      ) : (
        <CouponList
          coupons={filteredCoupons}
          onAssign={(coupon) => {
            setAssigningCoupon(coupon);
          }}
          onEdit={(coupon) => {
            setEditingCoupon(coupon);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {/* Assignment Modal */}
      {assigningCoupon && (
        <AssignEntitiesModal
          couponId={assigningCoupon.id}
          onClose={() => setAssigningCoupon(null)}
          onSubmit={handleAssignComplete}
        />
      )}
    </div>
  );
}
