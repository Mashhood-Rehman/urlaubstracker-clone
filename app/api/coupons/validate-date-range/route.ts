import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const entityType = searchParams.get('entityType'); // 'flights', 'hotels', 'rentals'
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!entityType || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Parse dates
    const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
    const [endYear, endMonth, endDay] = endDate.split('-').map(Number);
    
    const searchStartDate = new Date(startYear, startMonth - 1, startDay);
    const searchEndDate = new Date(endYear, endMonth - 1, endDay);

    // Fetch all coupons
    const allCoupons = await prisma.coupon.findMany({
      where: { isActive: true },
    });

    // Filter coupons that are valid for the date range
    const validCoupons = allCoupons.filter((coupon) => {
      const validFrom = new Date(coupon.validFrom);
      const validUntil = new Date(coupon.validUntil);
      
      validFrom.setHours(0, 0, 0, 0);
      validUntil.setHours(23, 59, 59, 999);
      searchStartDate.setHours(0, 0, 0, 0);
      searchEndDate.setHours(23, 59, 59, 999);

      return validFrom <= searchStartDate && validUntil >= searchEndDate;
    });

    // Get entity IDs that have valid coupons
    let validEntityIds: number[] = [];

    if (entityType === 'flights') {
      validEntityIds = validCoupons
        .flatMap((c) => c.flightIds || [])
        .filter((id): id is number => id !== null && id !== undefined);
    } else if (entityType === 'hotels') {
      validEntityIds = validCoupons
        .flatMap((c) => c.hotelIds || [])
        .filter((id): id is number => id !== null && id !== undefined);
    } else if (entityType === 'rentals') {
      validEntityIds = validCoupons
        .flatMap((c) => c.rentalIds || [])
        .filter((id): id is number => id !== null && id !== undefined);
    }

    // Remove duplicates
    validEntityIds = Array.from(new Set(validEntityIds));

    return NextResponse.json(
      {
        validEntityIds,
        validCoupons: validCoupons.map((c) => ({
          id: c.id,
          code: c.code,
          name: c.name,
          discountValue: c.discountValue,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error filtering coupons by date:", error);
    return NextResponse.json(
      { error: "Failed to filter coupons" },
      { status: 500 }
    );
  }
}
