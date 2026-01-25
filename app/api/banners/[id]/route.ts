import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const { image, link, isActive } = body;
        const bannerId = parseInt(id);

        const banner = await prisma.adsBanner.update({
            where: { id: bannerId },
            data: { image, link, isActive },
        });

        return NextResponse.json({ success: true, data: banner });
    } catch (error: any) {
        console.error('Error updating banner:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update banner' },
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
        const bannerId = parseInt(id);
        await prisma.adsBanner.delete({ where: { id: bannerId } });
        return NextResponse.json({ success: true, message: 'Banner deleted' });
    } catch (error: any) {
        console.error('Error deleting banner:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete banner' },
            { status: 500 }
        );
    }
}
