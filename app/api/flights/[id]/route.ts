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
