import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            title,
            desc,
            title_fr,
            desc_fr,
            address,
            city,
            country,
            price_per_night,
            total_price,
            currency,
            rating,
            review_count,
            amenities,
            check_in,
            check_out,
            notes,
        } = body;

        const product = await prisma.hotel.create({
            data: {
                title,
                desc,
                title_fr,
                desc_fr,
                address,
                city,
                country,
                price_per_night: parseFloat(price_per_night),
                total_price: total_price ? parseFloat(total_price) : null,
                currency,
                rating: rating ? parseFloat(rating) : null,
                review_count: review_count ? parseInt(review_count) : null,
                amenities,
                check_in,
                check_out,
                notes: notes || null,
            },
        });

        return NextResponse.json(
            { success: true, data: product },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating product:', error?.stack || error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to create product' },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const product = await prisma.hotel.findMany();
        return NextResponse.json({ success: true, data: product }, { status: 200 });
    } catch (error: any) {
  console.error('Error creating product:', error?.stack || error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to create product' },
            { status: 500 }
        );
    }
}