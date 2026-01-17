import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const flights = await prisma.flight.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, data: flights }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching flights:', error?.stack || error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to fetch flights' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const flight = await prisma.flight.create({
            data: {
                ...body,
                price: parseFloat(body.price),
                flexibleDates: Boolean(body.flexibleDates),
                // services, whyAdore, extras, tips are expected to be sent as JSON/Arrays
            },
        });

        return NextResponse.json(
            { success: true, data: flight },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating flight:', error?.stack || error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Failed to create flight' },
            { status: 500 }
        );
    }
}
