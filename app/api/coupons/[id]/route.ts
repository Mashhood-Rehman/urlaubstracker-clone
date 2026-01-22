import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const couponId = parseInt(id);

    const coupon = await prisma.coupon.findUnique({
      where: { id: couponId },
      include: {
        flights: true,
        hotels: true,
        rentals: true,
      },
    });

    if (!coupon) {
      return NextResponse.json(
        { error: "Coupon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(coupon, { status: 200 });
  } catch (error) {
    console.error("Error fetching coupon:", error);
    return NextResponse.json(
      { error: "Failed to fetch coupon" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const couponId = parseInt(id);
    const body = await request.json();

    const {
      code,
      name,
      description,
      discountValue,
      maxUses,
      validFrom,
      validUntil,
      isActive,
      flightIds,
      hotelIds,
      rentalIds,
    } = body;

    const existingCoupon = await prisma.coupon.findUnique({
      where: { id: couponId },
    });

    if (!existingCoupon) {
      return NextResponse.json(
        { error: "Coupon not found" },
        { status: 404 }
      );
    }

    if (validFrom && validUntil) {
      const validFromDate = new Date(validFrom);
      const validUntilDate = new Date(validUntil);
      if (validUntilDate <= validFromDate) {
        return NextResponse.json(
          { error: "Valid until date must be after valid from date" },
          { status: 400 }
        );
      }
    }

    const coupon = await prisma.coupon.update({
      where: { id: couponId },
      data: {
        ...(code && { code: code.toUpperCase() }),
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(discountValue && { discountValue }),
        ...(maxUses !== undefined && { maxUses }),
        ...(validFrom && { validFrom: new Date(validFrom) }),
        ...(validUntil && { validUntil: new Date(validUntil) }),
        ...(isActive !== undefined && { isActive }),
        ...(flightIds !== undefined && { flightIds }),
        ...(hotelIds !== undefined && { hotelIds }),
        ...(rentalIds !== undefined && { rentalIds }),
        ...(flightIds !== undefined && {
          flights: {
            set: flightIds.map((id: number) => ({ id })),
          },
        }),
        ...(hotelIds !== undefined && {
          hotels: {
            set: hotelIds.map((id: number) => ({ id })),
          },
        }),
        ...(rentalIds !== undefined && {
          rentals: {
            set: rentalIds.map((id: number) => ({ id })),
          },
        }),
      },
      include: {
        flights: true,
        hotels: true,
        rentals: true,
      },
    });

    return NextResponse.json(coupon, { status: 200 });
  } catch (error) {
    console.error("Error updating coupon:", error);
    return NextResponse.json(
      { error: "Failed to update coupon" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const couponId = parseInt(id);

    const existingCoupon = await prisma.coupon.findUnique({
      where: { id: couponId },
    });

    if (!existingCoupon) {
      return NextResponse.json(
        { error: "Coupon not found" },
        { status: 404 }
      );
    }

    await prisma.coupon.delete({
      where: { id: couponId },
    });

    return NextResponse.json(
      { message: "Coupon deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting coupon:", error);
    return NextResponse.json(
      { error: "Failed to delete coupon" },
      { status: 500 }
    );
  }
}
