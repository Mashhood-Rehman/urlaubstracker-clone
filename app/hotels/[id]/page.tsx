// app/hotels/[id]/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { icons } from '@/assets/icons';
import HotelDetailClient from './client';

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ MUST await params in Next 15
  const { id } = await params;

  const hotelId = Number(id);
  console.log('Parsed hotelId:', hotelId);

  if (isNaN(hotelId)) {
    return <div>Invalid hotel ID</div>;
  }

  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
  });

  console.log('Hotel from DB:', hotel);

  if (!hotel) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <icons.Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Hotel not found
          </h3>
          <p className="text-gray-500 mb-6">
            The hotel you're looking for doesn't exist
          </p>
          <Link
            href="/"
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            Go Home
          </Link>
        </div>
      </main>
    );
  }

  const coupons = await prisma.coupon.findMany({
    where: {
      isActive: true,
      hotelIds: {
        has: hotelId,
      },
    },
  });

  console.log('Coupons from DB:', coupons);

  return <HotelDetailClient hotel={hotel} coupons={coupons} />;
}
