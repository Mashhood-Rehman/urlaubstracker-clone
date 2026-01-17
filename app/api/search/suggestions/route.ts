import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');

        if (!query || query.length < 2) {
            return NextResponse.json({ success: true, data: [] });
        }

        // Search for hotels matching the query
        // We'll search in title, city, and country
        const hotels = await prisma.hotel.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { city: { contains: query, mode: 'insensitive' } },
                    { country: { contains: query, mode: 'insensitive' } },
                ],
            },
            take: 5,
            select: {
                id: true,
                title: true,
                city: true,
                country: true,
            },
        });

        // Format suggestions
        const suggestions = hotels.map((hotel: any) => ({
            id: hotel.id,
            text: `${hotel.title}, ${hotel.city}, ${hotel.country}`,
            type: 'hotel',
            data: hotel
        }));

        // We could also aggregate distinct cities if we wanted separate 'Location' suggestions
        // But for now, returning matching hotels is a good start.

        return NextResponse.json({ success: true, data: suggestions });
    } catch (error: any) {
        console.error('Error fetching suggestions:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch suggestions' },
            { status: 500 }
        );
    }
}
