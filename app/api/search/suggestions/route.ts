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
            // Search for flights - search in city/airport names
            const flights = await prisma.flight.findMany({
                where: {
                    OR: [
                        { departure_city: { contains: query, mode: 'insensitive' } },
                        { arrival_city: { contains: query, mode: 'insensitive' } },
                        { departure_airport: { contains: query, mode: 'insensitive' } },
                        { arrival_airport: { contains: query, mode: 'insensitive' } },
                    ],
                },
                distinct: ['departure_city', 'arrival_city', 'departure_airport', 'arrival_airport'],
                take: 8,
                select: {
                    id: true,
                    departure_city: true,
                    departure_airport: true,
                    arrival_city: true,
                    arrival_airport: true,
                },
            });

            // Create unique suggestions from flights
            const seenLocations = new Set<string>();
            flights.forEach((flight: any) => {
                const departure = `${flight.departure_city} (${flight.departure_airport})`;
                const arrival = `${flight.arrival_city} (${flight.arrival_airport})`;
                
                if (!seenLocations.has(departure)) {
                    suggestions.push({
                        id: `dep-${flight.id}`,
                        text: departure,
                        type: 'flight',
                        data: { city: flight.departure_city, airport: flight.departure_airport }
                    });
                    seenLocations.add(departure);
                }
                
                if (!seenLocations.has(arrival)) {
                    suggestions.push({
                        id: `arr-${flight.id}`,
                        text: arrival,
                        type: 'flight',
                        data: { city: flight.arrival_city, airport: flight.arrival_airport }
                    });
                    seenLocations.add(arrival);
                }
            });

            suggestions = suggestions.slice(0, 8);
        } else if (type === 'rentals') {
            // Search for rentals - search in location
            const rentals = await prisma.rental.findMany({
                where: {
                    OR: [
                        { location: { contains: query, mode: 'insensitive' } },
                        { city: { contains: query, mode: 'insensitive' } },
                    ],
                },
                distinct: ['location', 'city'],
                take: 8,
                select: {
                    id: true,
                    location: true,
                    city: true,
                },
            });

            // Create unique suggestions from rentals
            const seenLocations = new Set<string>();
            rentals.forEach((rental: any) => {
                const displayText = rental.city || rental.location;
                if (!seenLocations.has(displayText)) {
                    suggestions.push({
                        id: rental.id,
                        text: displayText,
                        type: 'rental',
                        data: { location: rental.location, city: rental.city }
                    });
                    seenLocations.add(displayText);
                }
            });
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
