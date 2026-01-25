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
    const { flights, hotels, rentals, dynamicProducts } = body;

    const existingCoupon = await prisma.coupon.findUnique({
      where: { id: couponId },
    });

    if (!existingCoupon) {
      return NextResponse.json(
        { error: "Coupon not found" },
        { status: 404 }
      );
    }

    // Build update data dynamically based on what's in the body
    const updateData: any = {};

    if (flights !== undefined) {
      updateData.flightIds = flights;
      updateData.flights = {
        set: flights.map((id: number) => ({ id })),
      };
    }

    if (hotels !== undefined) {
      updateData.hotelIds = hotels;
      updateData.hotels = {
        set: hotels.map((id: number) => ({ id })),
      };
    }

    if (rentals !== undefined) {
      updateData.rentalIds = rentals;
      updateData.rentals = {
        set: rentals.map((id: number) => ({ id })),
      };
    }

    if (dynamicProducts !== undefined) {
      updateData.dynamicProductIds = dynamicProducts;
      updateData.dynamicProducts = {
        set: dynamicProducts.map((id: number) => ({ id })),
      };
    }

    const updatedCoupon = await prisma.coupon.update({
      where: { id: couponId },
      data: updateData,
      include: {
        flights: true,
        hotels: true,
        rentals: true,
        dynamicProducts: true,
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
