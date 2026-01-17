import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const rentals = await prisma.rental.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, data: rentals }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching rentals:', error?.stack || error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to fetch rentals' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const rental = await prisma.rental.create({
            data: {
                ...body,
                // price might be nested in 'offer' or 'additionalInfo' as JSON
            },
        });

        return NextResponse.json(
            { success: true, data: rental },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating rental:', error?.stack || error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to create rental' },
            { status: 500 }
        );
    }
}
