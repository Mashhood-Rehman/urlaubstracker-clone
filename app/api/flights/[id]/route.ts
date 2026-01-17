import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const flight = await prisma.flight.findUnique({
            where: { id },
        });

        if (!flight) {
            return NextResponse.json(
                { success: false, error: 'Flight not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: flight });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const body = await request.json();

        const updatedFlight = await prisma.flight.update({
            where: { id },
            data: {
                ...body,
                price: body.price ? parseFloat(body.price) : undefined,
                flexibleDates: body.flexibleDates !== undefined ? Boolean(body.flexibleDates) : undefined,
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
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        await prisma.flight.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: 'Flight deleted successfully' });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
