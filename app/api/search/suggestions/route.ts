import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');
        const type = searchParams.get('type') || 'hotels';

        if (!query || query.length < 1) {
            return NextResponse.json({ success: true, data: [] });
        }

        let suggestions: any[] = [];

        if (type === 'hotels') {
            // Search for hotels matching the query
            const hotels = await prisma.hotel.findMany({
                where: {
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { city: { contains: query, mode: 'insensitive' } },
                        { country: { contains: query, mode: 'insensitive' } },
                    ],
                },
                take: 8,
                select: {
                    id: true,
                    title: true,
                    city: true,
                    country: true,
                },
            });

            suggestions = hotels.map((hotel: any) => ({
                id: hotel.id,
                text: hotel.title,
                type: 'hotel',
                data: hotel
            }));
        } else if (type === 'flights') {
            // Search for flights matching the query in title, departure, or arrival cities
            const flights = await prisma.flight.findMany({
                where: {
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { departureCity: { contains: query, mode: 'insensitive' } },
                        { arrivalCity: { contains: query, mode: 'insensitive' } },
                    ],
                },
                take: 8,
                select: {
                    id: true,
                    title: true,
                    departureCity: true,
                    arrivalCity: true,
                },
            });

            suggestions = flights.map((flight: any) => ({
                id: flight.id,
                text: flight.title,
                type: 'flight',
                data: {
                    title: flight.title,
                    city: `${flight.departureCity} to ${flight.arrivalCity}`,
                    country: 'Flight Deal'
                }
            }));
        } else if (type === 'rentals') {
            // Search for rentals matching the query
            const rentals = await prisma.rental.findMany({
                where: {
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { mainHeading: { contains: query, mode: 'insensitive' } },
                    ],
                },
                take: 8,
                select: {
                    id: true,
                    title: true,
                    mainHeading: true,
                },
            });

            suggestions = rentals.map((rental: any) => ({
                id: rental.id,
                text: rental.title || rental.mainHeading,
                type: 'rental',
                data: {
                    title: rental.title || rental.mainHeading,
                    city: 'Rental Deal',
                    country: ''
                }
            }));
        }


        return NextResponse.json({ success: true, data: suggestions });
    } catch (error: any) {
        console.error('Error fetching suggestions:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch suggestions' },
            { status: 500 }
        );
    }
}
