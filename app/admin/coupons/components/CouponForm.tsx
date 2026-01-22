'use client';

import { useState, useEffect } from 'react';
import { X, Loader } from 'lucide-react';
import { format } from 'date-fns';

interface Coupon {
  id?: number;
  code: string;
  name: string;
  description: string | null;
  discountValue: number;
  maxUses: number | null;
  currentUses?: number;
  validFrom: string;
  validUntil: string;
  isActive?: boolean;
}

interface CouponFormProps {
  coupon: Coupon | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function CouponForm({ coupon, onSubmit, onCancel }: CouponFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Coupon>({
    code: '',
    name: '',
    description: '',
    discountValue: 10,
    maxUses: null,
    validFrom: format(new Date(), 'yyyy-MM-dd'),
    validUntil: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        ...coupon,
        validFrom: format(new Date(coupon.validFrom), 'yyyy-MM-dd'),
        validUntil: format(new Date(coupon.validUntil), 'yyyy-MM-dd'),
      });
    }
  }, [coupon]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (name === 'discountValue' || name === 'maxUses') {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? parseFloat(value) : (name === 'maxUses' ? null : 0),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value || null,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.code || !formData.name || formData.discountValue <= 0) {
      setError('Please fill in all required fields');
      return;
    }

    const validFromDate = new Date(formData.validFrom);
    const validUntilDate = new Date(formData.validUntil);

    if (validUntilDate <= validFromDate) {
      setError('Valid until date must be after valid from date');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        code: formData.code,
        name: formData.name,
        description: formData.description || null,
        discountValue: formData.discountValue,
        maxUses: formData.maxUses || null,
        validFrom: validFromDate.toISOString(),
        validUntil: validUntilDate.toISOString(),
      };

      if (coupon && coupon.id) {
        const response = await fetch(`/api/coupons/${coupon.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Failed to update coupon');
        }
      } else {
        const response = await fetch('/api/coupons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Failed to create coupon');
        }
      }

      onSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {coupon ? 'Edit Coupon' : 'Create New Coupon'}
        </h2>
        <button
          onClick={onCancel}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Coupon Code <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g., SUMMER20"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              disabled={!!coupon}
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Coupon Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Summer Sale"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Enter coupon description..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Discount Value */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Discount (%) <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="discountValue"
              value={formData.discountValue}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Max Uses */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Max Uses
            </label>
            <input
              type="number"
              name="maxUses"
              value={formData.maxUses || ''}
              onChange={handleChange}
              min="1"
              placeholder="Unlimited"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Valid From */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Valid From <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="validFrom"
              value={formData.validFrom}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Valid Until */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Valid Until <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="validUntil"
              value={formData.validUntil}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {coupon ? 'Update Coupon' : 'Create Coupon'}
          </button>
        </div>
      </form>
    </div>
  );
}
