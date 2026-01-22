import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const hotels = await prisma.hotel.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, data: hotels }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching hotels:', error?.stack || error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to fetch hotels' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const hotel = await prisma.hotel.create({
            data: {
                title: body.title,
                desc: body.desc,
                title_fr: body.title_fr,
                desc_fr: body.desc_fr,
                address: body.address,
                city: body.city,
                country: body.country,
                price_per_night: parseFloat(body.price_per_night),
                total_price: body.total_price ? parseFloat(body.total_price) : null,
                currency: body.currency,
                rating: body.rating ? parseFloat(body.rating) : null,
                review_count: body.review_count ? parseInt(body.review_count) : null,
                amenities: body.amenities,
                check_in: body.check_in,
                check_out: body.check_out,
                notes: body.notes || null,
            },
        });

        return NextResponse.json(
            { success: true, data: hotel },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating hotel:', error?.stack || error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to create hotel' },
            { status: 500 }
        );
    }
}
