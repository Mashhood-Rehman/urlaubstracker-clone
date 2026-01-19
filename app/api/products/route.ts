import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { mainCategory, ...data } = body;

        let product;

        if (mainCategory === 'Flight') {
            product = await prisma.flight.create({
                data: {
                    ...data,
                    description: data.desc || '',
                    price: parseFloat(data.price),
                    flexibleDates: Boolean(data.flexibleDates),
                },
            });
        } else if (mainCategory === 'Rental') {
            product = await prisma.rental.create({
                data: {
                    ...data,
                    title: data.title || data.mainHeading || '',
                    description: data.description || data.mainDescription || '',
                    offer: data.offer || {},
                    additionalInfo: data.additionalInfo || {},
                    thingsToDo: data.thingsToDo || [],
                },
            });
        } else {
            // Default to Hotel (current behavior)
            product = await prisma.hotel.create({
                data: {
                    title: data.title,
                    desc: data.desc,
                    title_fr: data.title_fr,
                    desc_fr: data.desc_fr,
                    address: data.address,
                    city: data.city,
                    country: data.country,
                    price_per_night: parseFloat(data.price_per_night),
                    total_price: data.total_price ? parseFloat(data.total_price) : null,
                    currency: data.currency,
                    rating: data.rating ? parseFloat(data.rating) : null,
                    review_count: data.review_count ? parseInt(data.review_count) : null,
                    amenities: data.amenities,
                    check_in: data.check_in,
                    check_out: data.check_out,
                    notes: data.notes || null,
                },
            });
        }

        return NextResponse.json(
            { success: true, data: { ...product, mainCategory: mainCategory || 'Hotel' } },
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
        const [hotels, flights, rentals] = await Promise.all([
            prisma.hotel.findMany(),
            prisma.flight.findMany(),
            prisma.rental.findMany(),
        ]);

        const unifiedProducts = [
            ...hotels.map((h: any) => ({ ...h, mainCategory: 'Hotel' })),
            ...flights.map((f: any) => ({ ...f, mainCategory: 'Flight' })),
            ...rentals.map((r: any) => ({ ...r, mainCategory: 'Rental' })),
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json({ success: true, data: unifiedProducts }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching products:', error?.stack || error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to fetch products' },
            { status: 500 }
        );
    }
}