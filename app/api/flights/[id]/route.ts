import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const flightId = parseInt(id);

        const flight = await prisma.flight.findUnique({
            where: { id: flightId },
        });

        if (!flight) {
            return NextResponse.json(
                { success: false, error: 'Flight not found' },
                { status: 404 }
            );
        }

        // Find country/hotels for departure and arrival cities
        const [departureInfo, arrivalInfo] = await Promise.all([
            prisma.hotel.findFirst({
                where: { city: { equals: flight.departureCity, mode: 'insensitive' } },
                select: { country: true }
            }),
            prisma.hotel.findFirst({
                where: { city: { equals: flight.arrivalCity, mode: 'insensitive' } },
                select: { country: true }
            })
        ]);

        const [departureHotels, arrivalHotels, flightsToArrival, flightsFromDeparture] = await Promise.all([
            prisma.hotel.findMany({
                where: { city: { equals: flight.departureCity, mode: 'insensitive' } },
                take: 4,
                orderBy: { rating: 'desc' }
            }),
            prisma.hotel.findMany({
                where: { city: { equals: flight.arrivalCity, mode: 'insensitive' } },
                take: 4,
                orderBy: { rating: 'desc' }
            }),
            prisma.flight.findMany({
                where: {
                    arrivalCity: { equals: flight.arrivalCity, mode: 'insensitive' },
                    id: { not: flightId }
                },
                take: 4,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.flight.findMany({
                where: {
                    departureCity: { equals: flight.departureCity, mode: 'insensitive' },
                    id: { not: flightId }
                },
                take: 4,
                orderBy: { createdAt: 'desc' }
            })
        ]);

        return NextResponse.json({
            success: true,
            data: {
                ...flight,
                departureCountry: departureInfo?.country || null,
                arrivalCountry: arrivalInfo?.country || null,
                relatedData: {
                    departureHotels,
                    arrivalHotels,
                    flightsToArrival,
                    flightsFromDeparture
                }
            }
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const flightId = parseInt(id);

        const body = await request.json();

        const updatedFlight = await prisma.flight.update({
            where: { id: flightId },
            data: {
                ...body,
                price: body.price ? parseFloat(body.price) : undefined,
                flexibleDates:
                    body.flexibleDates !== undefined
                        ? Boolean(body.flexibleDates)
                        : undefined,
            },
        });

        return NextResponse.json({ success: true, data: updatedFlight });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const flightId = parseInt(id);

        await prisma.flight.delete({
            where: { id: flightId },
        });

        return NextResponse.json({
            success: true,
            message: 'Flight deleted successfully',
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
