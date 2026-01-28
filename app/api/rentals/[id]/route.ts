import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const rentalId = parseInt(id);

        const rental = await prisma.rental.findUnique({
            where: { id: rentalId },
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
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const rentalId = parseInt(id);

        const body = await request.json();

        const updatedRental = await prisma.rental.update({
            where: { id: rentalId },
            data: {
                category: body.category,
                title: body.title,
                description: body.description,
                mainHeading: body.mainHeading,
                mainDescription: body.mainDescription,
                offer: body.offer,
                whySuperDeal: body.whySuperDeal,
                thingsToDo: body.thingsToDo,
                additionalInfo: body.additionalInfo,
                ecoTip: body.ecoTip,
                link: body.link,
                images: body.images || [],
            },
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
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const rentalId = parseInt(id);

        await prisma.rental.delete({
            where: { id: rentalId },
        });

        return NextResponse.json({ success: true, message: 'Rental deleted successfully' });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
