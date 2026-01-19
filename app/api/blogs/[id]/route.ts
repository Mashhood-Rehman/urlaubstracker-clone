import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const blogId = parseInt(id);
        if (isNaN(blogId)) {
            // If not a number, try fetching by slug
            const blog = await prisma.blog.findUnique({
                where: { slug: id }
            });
            if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
            return NextResponse.json(blog);
        }

        const blog = await prisma.blog.findUnique({
            where: { id: blogId }
        });

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        if (isNaN(Number(id))) {
            // Update by slug
            const blog = await prisma.blog.update({
                where: { slug: id },
                data: await request.json()
            });

            return NextResponse.json(blog);
        }

        const blog = await prisma.blog.update({
            where: { id: parseInt(id) },
            data: await request.json()
        });

        return NextResponse.json(blog);
    } catch (error: any) {
        console.error('Error updating blog:', error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const blogId = parseInt(id);
        if (isNaN(blogId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

        await prisma.blog.delete({
            where: { id: blogId }
        });

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting blog:', error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
