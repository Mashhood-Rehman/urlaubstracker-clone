'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { icons } from '@/assets/icons';
import Link from 'next/link';

interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    mainImage: string;
    images: string[];
    author: string;
    category: string;
    tags: string[];
    link?: string;
    createdAt: string;
}

import Loading from '../../components/Loading';

export default function BlogDetailsPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
    const [suggestedBlogs, setSuggestedBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const allImages = blog ? [blog.mainImage, ...(blog.images || [])].filter(Boolean) : [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch current blog
                const blogRes = await fetch(`/api/blogs/${slug}`);
                const blogData = await blogRes.json();
                if (blogData) {
                    setBlog(blogData);
                }

                // Fetch recent blogs for sidebar
                const recentRes = await fetch(`/api/blogs?limit=5`);
                const recentData = await recentRes.json();
                if (Array.isArray(recentData)) {
                    setRecentBlogs(recentData.filter((b: Blog) => b.slug !== slug).slice(0, 4));
                }

                const suggestedRes = await fetch(`/api/blogs?published=true`);
                const suggestedData = await suggestedRes.json();
                if (Array.isArray(suggestedData)) {
                    setSuggestedBlogs(suggestedData.filter((b: Blog) => b.slug !== slug).slice(0, 3));
                }
            } catch (error) {
                console.error('Error fetching blog data:', error);
            } finally {
                setLoading(false);
            }
        };
        if (slug) fetchData();
    }, [slug]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    if (loading) {
        return <Loading variant="page" text="Fetching story..." />;
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-(--white) flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-2xl font-bold text-(--gray-900) mb-4">Article not found</h1>
                <Link href="/" className="text-(--brand-purple) font-semibold flex items-center gap-2 hover:underline">
                    <icons.ArrowLeft size={18} /> Back to homepage
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen mt-12 bg-(--white) text-(--gray-900)">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-12">
                        <button
                            onClick={() => router.back()}
                            className="z-10 p-2 mb-5 bg-(--white)/80 backdrop-blur-sm rounded-full shadow-md hover:bg-(--white) text-(--gray-700) transition-all"
                        >
                            <icons.ArrowLeft size={20} />
                        </button>
                        {/* Carousel Wrapper */}
                        <div className="rounded-lg overflow-hidden bg-(--gray-100) group mb-8 border border-(--gray-100)">


                            <img
                                src={allImages[currentImageIndex] || '/placeholder-blog.jpg'}
                                alt={blog.title}
                                className="w-full h-96 object-cover transition-all duration-500"
                            />

                            {allImages.length > 1 && (
                                <>
                                    <div className="absolute inset-y-0 left-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <button
                                            onClick={prevImage}
                                            className="p-2 bg-(--white)/90 rounded-sm shadow-md hover:bg-(--white)"
                                        >
                                            <icons.ChevronRight size={20} className="rotate-180" />
                                        </button>
                                    </div>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <button
                                            onClick={nextImage}
                                            className="p-2 bg-(--white)/90 rounded-sm shadow-md hover:bg-(--white)"
                                        >
                                            <icons.ChevronRight size={20} />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                        {allImages.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentImageIndex(i)}
                                                className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? 'bg-(--white) scale-125' : 'bg-(--white)/50 hover:bg-(--white)/80'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-12">
                        {/* Article Header */}
                        <div className="mb-8">
                            <span className="inline-block px-2 py-1 rounded bg-(--brand-purple)/5 text-(--brand-purple) text-[10px] font-bold uppercase tracking-wider mb-3">
                                {blog.category}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-(--gray-900) mb-6 leading-tight">
                                {blog.title}
                            </h1>
                            <div className="flex items-center gap-4 text-xs text-(--gray-500) font-medium">
                                <div className="flex items-center gap-1.5">
                                    <icons.User size={14} />
                                    <span>{blog.author}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <icons.Clock size={14} />
                                    <span>5 min read</span>
                                </div>
                                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </div>

                        {/* Article Body */}
                        <article className="prose prose-slate max-w-none border-t border-(--gray-50)">
                            <div
                                className="blog-content text-(--gray-800) leading-relaxed text-lg space-y-6"
                                dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }}
                            />
                        </article>

                        {/* External Link Section */}
                        {blog.link && (
                            <div className="mt-10 p-6 bg-(--brand-purple)/5 rounded-xl border border-(--brand-purple)/10 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <h4 className="font-bold text-(--gray-900)">Want to see more details?</h4>
                                    <p className="text-sm text-(--gray-600)">Visit the original source for more information about this topic.</p>
                                </div>
                                <a
                                    href={blog.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-(--brand-purple) text-(--white) font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap"
                                >
                                    Visit Original Source
                                    <icons.ChevronRight size={18} />
                                </a>
                            </div>
                        )}

                        {/* Tags */}
                        {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                            <div className="mt-12 flex flex-wrap gap-2 pt-8 border-t border-(--gray-100)">
                                {blog.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-(--gray-50) rounded-md text-[11px] font-semibold text-(--gray-600) hover:bg-(--brand-purple)/5 hover:text-(--brand-purple) cursor-pointer transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Area */}
                    <aside className="lg:col-span-12">
                        <div className="border border-(--gray-100) rounded-lg p-5 bg-(--white) shadow-sm">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-(--gray-900) mb-6 pb-2 border-b-2 border-(--brand-purple)">
                                Recent Articles
                            </h3>
                            <div className="space-y-6">
                                {recentBlogs.length > 0 ? (
                                    recentBlogs.map((post) => (
                                        <Link key={post.id} href={`/blogs/${post.slug}`} className="flex gap-4 group">
                                            <div className="relative w-20 h-20 shrink-0 bg-(--gray-100) rounded-md overflow-hidden">
                                                <img
                                                    src={post.mainImage || '/placeholder-blog.jpg'}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-(--gray-900) line-clamp-2 leading-snug group-hover:text-(--brand-purple) transition-colors">
                                                    {post.title}
                                                </h4>
                                                <span className="text-[10px] text-(--gray-500) font-medium mt-1 inline-block">
                                                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-xs text-(--gray-400) italic">No recent articles found.</p>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Suggested Articles Bottom Section */}
                <section className="mt-20 pt-12 border-t border-(--gray-100)">
                    <h2 className="text-xl md:text-2xl font-bold text-(--gray-900) mb-8 flex items-center gap-3">
                        <span className="w-8 h-1 bg-(--brand-purple) rounded-full"></span>
                        You might also like
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {suggestedBlogs.map((post) => (
                            <Link key={post.id} href={`/blogs/${post.slug}`} className="group space-y-4">
                                <div className="aspect-16/10 bg-(--gray-100) rounded-lg overflow-hidden border border-(--gray-100)">
                                    <img
                                        src={post.mainImage || '/placeholder-blog.jpg'}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="px-1">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-(--brand-purple)">
                                        {post.category}
                                    </span>
                                    <h3 className="text-base font-bold text-(--gray-900) line-clamp-2 mt-1 leading-tight group-hover:text-(--brand-purple) transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-(--gray-500) line-clamp-2 mt-2 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>

            <style jsx>{`
                .blog-content :global(h2) {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #111827;
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                }
                .blog-content :global(p) {
                    margin-bottom: 1.5rem;
                }
                .blog-content :global(br) {
                    display: block;
                    content: "";
                    margin-top: 1rem;
                }
            `}</style>
        </main>
    );
}
