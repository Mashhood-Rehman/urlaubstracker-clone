'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { icons } from '@/assets/icons';
import Link from 'next/link';

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    mainImage: string;
    author: string;
    category: string;
    createdAt: string;
}

import Loading from '../components/Loading';

const BlogList = () => {
    const searchParams = useSearchParams();
    const categoryFilter = searchParams.get('category');
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const url = categoryFilter
                    ? `/api/blogs?published=true&category=${categoryFilter}`
                    : '/api/blogs?published=true';
                const res = await fetch(url);
                const data = await res.json();
                setBlogs(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [categoryFilter]);

    if (loading) {
        return <Loading variant="page" text="Loading articles..." />;
    }

    return (
        <main className="min-h-screen pt-24 pb-20 bg-(--slate-50)">
            <div className="container mx-auto px-4 md:px-10">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-(--gray-900) uppercase tracking-tighter mb-4">
                        {categoryFilter ? `${categoryFilter} ` : ''}Articles
                    </h1>
                    <p className="text-xl text-(--gray-500) font-medium">
                        {categoryFilter
                            ? `Discover our best ${categoryFilter.toLowerCase()} guides and stories.`
                            : 'Explore our latest travel insights, guides, and inspiration.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <Link
                                href={`/blogs/${blog.slug}`}
                                key={blog.id}
                                className="group bg-(--white) rounded-2xl overflow-hidden border border-(--slate-100) shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={blog.mainImage || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80'}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <div className="bg-(--brand-teal) text-(--brand-purple) px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">
                                            {blog.category}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-6 text-(--gray-400) text-[11px] font-bold uppercase tracking-wider mb-4">
                                        <span className="flex items-center gap-2">
                                            <icons.Calendar size={14} className="text-(--brand-purple)" />
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <icons.User size={14} className="text-(--brand-purple)" />
                                            {blog.author}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-black text-(--gray-900) leading-tight mb-4 group-hover:text-(--brand-purple) transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>

                                    <p className="text-(--gray-500) text-sm leading-relaxed line-clamp-3 mb-8">
                                        {blog.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-[11px] font-black uppercase tracking-widest text-(--brand-purple) flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Read Article <icons.ArrowUpRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <h3 className="text-2xl font-bold text-(--gray-400)">No articles found in this category.</h3>
                            <Link href="/blogs" className="text-(--brand-purple) mt-4 inline-block font-bold hover:underline">
                                View all articles
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default function BlogsPage() {
    return (
        <Suspense fallback={<Loading variant="page" />}>
            <BlogList />
        </Suspense>
    );
}
