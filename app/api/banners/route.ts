import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { image, link, isActive } = body;

        if (!image || !link) {
            return NextResponse.json(
                { success: false, error: 'Image and Link are required' },
                { status: 400 }
            );
        }

        const banner = await prisma.adsBanner.create({
            data: {
                image,
                link,
                isActive: isActive ?? true,
            },
        });

        return NextResponse.json(
            { success: true, data: banner },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating banner:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create banner' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const banners = await prisma.adsBanner.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, data: banners }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching banners:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch banners' },
            { status: 500 }
        );
    }
}
