'use client';

import { icons } from '@/assets/icons';
import { format } from 'date-fns';

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
  isShowcased: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CouponListProps {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: number) => void;
  onAssign: (coupon: Coupon) => void;
  onToggleShowcase: (coupon: Coupon) => void;
}

export default function CouponList({ coupons, onEdit, onDelete, onAssign, onToggleShowcase }: CouponListProps) {
  const isExpired = (validUntil: string) => new Date(validUntil) < new Date();
  const isNotStarted = (validFrom: string) => new Date(validFrom) > new Date();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Code</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Discount</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Usage</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Valid Period</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-900 text-center">Showcase</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {coupons.map((coupon) => {
            const expired = isExpired(coupon.validUntil);
            const notStarted = isNotStarted(coupon.validFrom);
            const usageLimitReached =
              coupon.maxUses && coupon.currentUses >= coupon.maxUses;

            let statusColor = 'text-green-600';
            let statusText = 'Active';

            if (!coupon.isActive) {
              statusColor = 'text-gray-600';
              statusText = 'Inactive';
            } else if (notStarted) {
              statusColor = 'text-blue-600';
              statusText = 'Upcoming';
            } else if (expired) {
              statusColor = 'text-red-600';
              statusText = 'Expired';
            } else if (usageLimitReached) {
              statusColor = 'text-orange-600';
              statusText = 'Limit Reached';
            }

            return (
              <tr key={coupon.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {coupon.code}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{coupon.name}</p>
                    {coupon.description && (
                      <p className="text-sm text-gray-600">{coupon?.description.length > 15 ? coupon.description.substring(0, 15) + '...' : coupon.description}</p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">
                    {coupon.discountValue}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">
                    {coupon.currentUses}
                    {coupon.maxUses ? `/${coupon.maxUses}` : ''}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div>
                    <p className="text-gray-900">
                      {format(new Date(coupon.validFrom), 'MMM d, yyyy')}
                    </p>
                    <p className="text-gray-600">
                      to {format(new Date(coupon.validUntil), 'MMM d, yyyy')}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${statusColor}`}>
                    {statusText}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={coupon.isShowcased}
                    onChange={() => onToggleShowcase(coupon)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAssign(coupon)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Assign to entities"
                    >
                      <icons.Gift className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(coupon)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit coupon"
                    >
                      <icons.Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(coupon.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete coupon"
                    >
                      <icons.Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
