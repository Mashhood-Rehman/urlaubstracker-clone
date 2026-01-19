import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { mainCategory, ...data } = body;

        let product;
        const productId = parseInt(id);

        if (mainCategory === 'Flight') {
            product = await prisma.flight.update({
                where: { id: productId },
                data: {
                    ...data,
                    description: data.desc || data.description || '',
                    price: data.price ? parseFloat(data.price) : undefined,
                },
            });
        } else if (mainCategory === 'Rental') {
            product = await prisma.rental.update({
                where: { id: productId },
                data: {
                    ...data,
                    title: data.title || data.mainHeading || undefined,
                    description: data.desc || data.mainDescription || undefined,
                },
            });
        } else {
            // Default to Hotel
            product = await prisma.hotel.update({
                where: { id: productId },
                data: {
                    ...data,
                    price_per_night: data.price_per_night ? parseFloat(data.price_per_night) : undefined,
                    total_price: data.total_price ? parseFloat(data.total_price) : null,
                    rating: data.rating ? parseFloat(data.rating) : null,
                    review_count: data.review_count ? parseInt(data.review_count) : null,
                },
            });
        }

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
        const { searchParams } = new URL(request.url);
        const mainCategory = searchParams.get('category') || 'Hotel';
        const productId = parseInt(id);

        if (mainCategory === 'Flight') {
            await prisma.flight.delete({ where: { id: productId } });
        } else if (mainCategory === 'Rental') {
            await prisma.rental.delete({ where: { id: productId } });
        } else {
            await prisma.hotel.delete({ where: { id: productId } });
        }

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
