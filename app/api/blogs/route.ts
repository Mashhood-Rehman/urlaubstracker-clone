import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const publishedOnly = searchParams.get('published') === 'true';
        const category = searchParams.get('category');
        const limit = searchParams.get('limit');

        const blogs = await prisma.blog.findMany({
            where: {
                ...(publishedOnly ? { published: true } : {}),
                ...(category ? { category: { equals: category, mode: 'insensitive' } } : {}),
            },
            orderBy: { createdAt: 'desc' },
            ...(limit ? { take: parseInt(limit) } : {})
        });

        return NextResponse.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, slug, content, excerpt, mainImage, images, author, category, tags, published, featured } = body;

        if (!title || !slug || !content) {
            return NextResponse.json({ error: 'Title, slug, and content are required' }, { status: 400 });
        }

        const blog = await prisma.blog.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                mainImage,
                images: images || [],
                author: author || 'Admin',
                category: category || 'Travel',
                tags: tags || [],
                published: published ?? false,
                featured: featured ?? false,
            }
        });

        return NextResponse.json(blog, { status: 201 });
    } catch (error: any) {
        console.error('Error creating blog:', error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
