import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const hotel = await prisma.hotel.findUnique({
            where: { id: parseInt(id) },
        });

        if (!hotel) {
            return NextResponse.json({ success: false, error: 'Hotel not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: hotel }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching hotel:', error?.stack || error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to fetch hotel' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const hotel = await prisma.hotel.update({
            where: { id: parseInt(id) },
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
                link: body.link,
                images: body.images || [],
            },
        });

        return NextResponse.json({ success: true, data: hotel }, { status: 200 });
    } catch (error: any) {
        console.error('Error updating hotel:', error?.stack || error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to update hotel' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await prisma.hotel.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        console.error('Error deleting hotel:', error?.stack || error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to delete hotel' },
            { status: 500 }
        );
    }
}
