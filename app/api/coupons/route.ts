import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const coupons = await prisma.coupon.findMany({
      skip,
      take: limit,
      include: {
        flights: true,
        hotels: true,
        rentals: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.coupon.count();

    return NextResponse.json(
      {
        coupons,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json(
      { error: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      code,
      name,
      description,
      discountValue,
      maxUses,
      validFrom,
      validUntil,
      flightIds = [],
      hotelIds = [],
      rentalIds = [],
    } = body;

    if (!code || !name || !discountValue || !validFrom || !validUntil) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const validFromDate = new Date(validFrom);
    const validUntilDate = new Date(validUntil);

    if (validUntilDate <= validFromDate) {
      return NextResponse.json(
        { error: "Valid until date must be after valid from date" },
        { status: 400 }
      );
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        name,
        description,
        discountValue,
        maxUses,
        validFrom: validFromDate,
        validUntil: validUntilDate,
        flightIds,
        hotelIds,
        rentalIds,
        flights: {
          connect: flightIds.map((id: number) => ({ id })),
        },
        hotels: {
          connect: hotelIds.map((id: number) => ({ id })),
        },
        rentals: {
          connect: rentalIds.map((id: number) => ({ id })),
        },
      },
      include: {
        flights: true,
        hotels: true,
        rentals: true,
      },
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch (error) {
    console.error("Error creating coupon:", error);
    return NextResponse.json(
      { error: "Failed to create coupon" },
      { status: 500 }
    );
  }
}
