import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Coupon code is required" },
        { status: 400 }
      );
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon) {
      return NextResponse.json(
        { error: "Coupon not found" },
        { status: 404 }
      );
    }

    await prisma.coupon.update({
      where: { id: coupon.id },
      data: {
        currentUses: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(
      { message: "Coupon usage recorded" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error recording coupon usage:", error);
    return NextResponse.json(
      { error: "Failed to record coupon usage" },
      { status: 500 }
    );
  }
}
