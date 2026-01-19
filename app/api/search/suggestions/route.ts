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
                text: `${hotel.title}, ${hotel.city}, ${hotel.country}`,
                type: 'hotel',
                data: hotel
            }));
        } else if (type === 'flights') {
            // Search for flights - search in city names
            const flights = await prisma.flight.findMany({
                where: {
                    OR: [
                        { departureCity: { contains: query, mode: 'insensitive' } },
                        { arrivalCity: { contains: query, mode: 'insensitive' } },
                    ],
                },
                distinct: ['departureCity', 'arrivalCity'],
                take: 8,
                select: {
                    id: true,
                    departureCity: true,
                    arrivalCity: true,
                },
            });

            // Create unique suggestions from flights
            const seenLocations = new Set<string>();
            flights.forEach((flight: any) => {
                const departure = flight.departureCity;
                const arrival = flight.arrivalCity;

                if (!seenLocations.has(departure) && departure.toLowerCase().includes(query.toLowerCase())) {
                    suggestions.push({
                        id: `dep-${flight.id}`,
                        text: departure,
                        type: 'flight',
                        data: { city: departure }
                    });
                    seenLocations.add(departure);
                }

                if (!seenLocations.has(arrival) && arrival.toLowerCase().includes(query.toLowerCase())) {
                    suggestions.push({
                        id: `arr-${flight.id}`,
                        text: arrival,
                        type: 'flight',
                        data: { city: arrival }
                    });
                    seenLocations.add(arrival);
                }
            });

            suggestions = suggestions.slice(0, 8);
        } else if (type === 'rentals') {
            // Search for rentals - search in title/mainHeading
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
                data: rental
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
