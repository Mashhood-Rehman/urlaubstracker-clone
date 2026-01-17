import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
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

        const product = await prisma.hotel.update({
            where: { id: parseInt(id) },
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
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error updating product:', error?.stack || error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to update product' },
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

        return NextResponse.json(
            { success: true, message: 'Product deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error deleting product:', error?.stack || error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to delete product' },
            { status: 500 }
        );
    }
}