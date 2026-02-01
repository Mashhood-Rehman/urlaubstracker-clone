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
                    title: data.title,
                    description: data.description || data.desc || '',
                    airline: data.airline,
                    departureCity: data.departureCity,
                    arrivalCity: data.arrivalCity,
                    duration: data.duration,
                    price: parseFloat(data.price),
                    currency: data.currency || 'EUR',
                    flightClass: data.flightClass || 'Economy',
                    baggage: data.baggage,
                    services: data.services || [],
                    whyAdore: data.whyAdore || [],
                    flexibleDates: Boolean(data.flexibleDates),
                    extras: data.extras || null,
                    tips: data.tips || null,
                    offerLink: data.offerLink,
                    link: data.link,
                    images: data.images || [],
                },
            });
        } else if (mainCategory === 'Rental') {
            product = await prisma.rental.create({
                data: {
                    category: data.category,
                    title: data.title || data.mainHeading || '',
                    description: data.description || data.mainDescription || '',
                    mainHeading: data.mainHeading,
                    mainDescription: data.mainDescription,
                    offer: data.offer || {},
                    whySuperDeal: data.whySuperDeal,
                    thingsToDo: data.thingsToDo || [],
                    additionalInfo: data.additionalInfo || {},
                    ecoTip: data.ecoTip,
                    link: data.link,
                    images: data.images || [],
                },
            });
        } else if (mainCategory === 'Hotel') {
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
                    notes: data.notes || null,
                    link: data.link,
                    images: data.images || [],
                },
            });
        } else {
            // Try to find if it's a dynamic category
            const category = await prisma.category.findFirst({
                where: { name: { equals: mainCategory, mode: 'insensitive' } }
            });

            if (category) {
                product = await prisma.dynamicProduct.create({
                    data: {
                        categoryId: category.id,
                        title: data.title || '',
                        description: data.description || data.desc || '',
                        price: parseFloat(data.price) || parseFloat(data.price_per_night) || 0,
                        currency: data.currency || 'EUR',
                        link: data.link,
                        images: data.images || [],
                        details: data, // Store all other fields in details
                    }
                });
            } else {
                return NextResponse.json(
                    { success: false, error: 'Invalid category' },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json(
            { success: true, data: { ...product, mainCategory: mainCategory } },
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
        const [hotels, flights, rentals, dynamicProducts] = await Promise.all([
            prisma.hotel.findMany(),
            prisma.flight.findMany(),
            prisma.rental.findMany(),
            prisma.dynamicProduct.findMany({
                include: { category: true }
            })
        ]);

        const unifiedProducts = [
            ...hotels.map((h: any) => ({ ...h, mainCategory: 'Hotel' })),
            ...flights.map((f: any) => ({ ...f, mainCategory: 'Flight' })),
            ...rentals.map((r: any) => ({ ...r, mainCategory: 'Rental' })),
            ...dynamicProducts.map((d: any) => ({ ...d, mainCategory: d.category.name, ...d.details })),
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