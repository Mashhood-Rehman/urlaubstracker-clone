import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const rental = await prisma.rental.findUnique({
            where: { id },
        });

        if (!rental) {
            return NextResponse.json(
                { success: false, error: 'Rental not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: rental });
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

        const updatedRental = await prisma.rental.update({
            where: { id },
            data: body,
        });

        return NextResponse.json({ success: true, data: updatedRental });
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
        await prisma.rental.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: 'Rental deleted successfully' });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
