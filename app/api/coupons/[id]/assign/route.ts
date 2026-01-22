import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const couponId = parseInt(id);
    const body = await request.json();

    const { flights = [], hotels = [], rentals = [] } = body;

    const existingCoupon = await prisma.coupon.findUnique({
      where: { id: couponId },
    });

    if (!existingCoupon) {
      return NextResponse.json(
        { error: "Coupon not found" },
        { status: 404 }
      );
    }

    // Replace coupon entity IDs with the new selections (not merge)
    const updatedFlightIds = flights;
    const updatedHotelIds = hotels;
    const updatedRentalIds = rentals;

    const updatedCoupon = await prisma.coupon.update({
      where: { id: couponId },
      data: {
        flightIds: updatedFlightIds,
        hotelIds: updatedHotelIds,
        rentalIds: updatedRentalIds,
        flights: {
          set: updatedFlightIds.map((id: number) => ({ id })),
        },
        hotels: {
          set: updatedHotelIds.map((id: number) => ({ id })),
        },
        rentals: {
          set: updatedRentalIds.map((id: number) => ({ id })),
        },
      },
      include: {
        flights: true,
        hotels: true,
        rentals: true,
      },
    });

    return NextResponse.json(
      {
        message: "Coupon entities assigned successfully",
        coupon: updatedCoupon,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error assigning entities to coupon:", error);
    return NextResponse.json(
      { error: "Failed to assign entities to coupon" },
      { status: 500 }
    );
  }
}
