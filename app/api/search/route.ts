import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location');
        // Currently not using date/guests for filtering in this simple version, 
        // but would be added here in a real app.

        const where: any = {};

        if (location) {
            where.OR = [
                { city: { contains: location, mode: 'insensitive' } },
                { country: { contains: location, mode: 'insensitive' } },
                { title: { contains: location, mode: 'insensitive' } },
                { title_fr: { contains: location, mode: 'insensitive' } },
            ];
        }

        const hotels = await prisma.hotel.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({ success: true, data: hotels });
    } catch (error: any) {
        console.error('Error searching products:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to search products' },
            { status: 500 }
        );
    }
}
