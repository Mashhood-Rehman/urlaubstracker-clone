import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, description } = body;

        if (!name) {
            return NextResponse.json(
                { success: false, error: 'Category name is required' },
                { status: 400 }
            );
        }

        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const category = await prisma.category.create({
            data: {
                name,
                slug,
                description,
            },
        });

        return NextResponse.json({ success: true, data: category }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating category:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create category' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const dynamicCategories = await prisma.category.findMany();

        const staticCategories = [
            { id: 'hotel', name: 'Hotel', slug: 'hotel', type: 'static' },
            { id: 'flight', name: 'Flight', slug: 'flight', type: 'static' },
            { id: 'rental', name: 'Rental', slug: 'rental', type: 'static' },
        ];

        return NextResponse.json({
            success: true,
            data: [...staticCategories, ...dynamicCategories.map(c => ({ ...c, type: 'dynamic' }))],
        });
    } catch (error: any) {
        console.error('Error fetching categories:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}
