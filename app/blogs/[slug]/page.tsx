'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, User, Tag, Share2, Facebook, Twitter, Link as LinkIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    mainImage: string;
    author: string;
    category: string;
    tags: string[];
    createdAt: string;
}

export default function BlogDetailsPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/${slug}`);
                const data = await res.json();
                if (data) {
                    setBlog(data);
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
            } finally {
                setLoading(false);
            }
        };
        if (slug) fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#5B2EFF]/20 border-t-[#5B2EFF] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <h1 className="text-4xl font-black text-gray-900 mb-4">Post not found</h1>
                <Link href="/" className="text-[#5B2EFF] font-bold flex items-center gap-2">
                    <ArrowLeft size={20} /> Back to home
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] selection:bg-[#5B2EFF] selection:text-white">
            {/* Minimal Sticky Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between transition-all duration-300">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#5B2EFF] hover:gap-3 transition-all"
                >
                    <ArrowLeft size={18} /> Back
                </button>
                <div className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 truncate max-w-sm">
                    {blog.title}
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-gray-400 hover:text-[#5B2EFF]">
                        <Share2 size={18} />
                    </button>
                </div>
            </nav>

            {/* Asymmetrical Hero Header */}
            <header className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/2 order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 mb-6 text-[#5B2EFF] bg-[#5B2EFF]/5 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                        <Tag size={12} /> {blog.category}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase italic mb-8">
                        {blog.title.split(' ').map((word, i) => (
                            <span key={i} className={i % 2 === 1 ? 'text-[#5B2EFF] block' : 'block'}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>
                    <div className="flex flex-wrap items-center gap-8 text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#5B2EFF]">
                                <User size={14} />
                            </div>
                            <span>By {blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#1A1A1A]">
                            <Clock size={14} />
                            <span>5 Min Read</span>
                        </div>
                        <div>
                            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 order-1 lg:order-2 w-full">
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-700">
                        <img
                            src={blog.mainImage}
                            alt={blog.title}
                            className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                    </div>
                </div>
            </header>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-12 pb-32">
                {/* Static Index/Meta Sidebar */}
                <div className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
                    <div className="p-8 border-l-2 border-[#5B2EFF] bg-slate-50/50 rounded-r-3xl">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-gray-400 italic">Topics Covered</h4>
                        <ul className="space-y-4">
                            {blog.content.split('\n').filter(l => l.length > 50).slice(0, 4).map((_, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-bold group cursor-pointer hover:text-[#5B2EFF] transition-colors">
                                    <span className="text-[#5B2EFF]/30 group-hover:text-[#5B2EFF]">0{i + 1}</span>
                                    <span>Key Insight {i + 1}</span>
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </li>
                            ))}
                        </ul>
                        <div className="mt-12 pt-8 border-t border-slate-100">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Join Discussion</h4>
                            <div className="flex gap-4">
                                <Facebook size={18} className="text-gray-300 hover:text-[#5B2EFF] cursor-pointer" />
                                <Twitter size={18} className="text-gray-300 hover:text-[#5B2EFF] cursor-pointer" />
                                <LinkIcon size={18} className="text-gray-300 hover:text-[#5B2EFF] cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Body */}
                <article className="col-span-12 lg:col-span-7 lg:col-start-5">
                    <div className="prose prose-xl prose-slate max-w-none">
                        <p className="text-2xl font-medium text-gray-500 italic leading-relaxed mb-12 first-letter:text-7xl first-letter:font-black first-letter:text-[#5B2EFF] first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
                            {blog.excerpt}
                        </p>

                        <div
                            className="rich-content space-y-8 font-serif leading-[1.8] text-lg lg:text-xl text-gray-800"
                            dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }}
                        />
                    </div>

                    {/* Tags Footer */}
                    <div className="mt-20 flex flex-wrap gap-3">
                        {Array.isArray(blog.tags) && blog.tags.map((tag, i) => (
                            <span key={i} className="px-6 py-2 bg-slate-50 hover:bg-[#5B2EFF]/10 hover:text-[#5B2EFF] transition-all rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </article>
            </section>

            <style jsx>{`
                .rich-content :global(h2) {
                    font-family: ui-sans-serif, system-ui, -apple-system;
                    font-size: 2.5rem;
                    font-weight: 900;
                    font-style: italic;
                    text-transform: uppercase;
                    letter-spacing: -0.05em;
                    line-height: 1;
                    margin-top: 4rem;
                    margin-bottom: 2rem;
                }
                .rich-content :global(p) {
                    margin-bottom: 2rem;
                }
                .rich-content :global(br) {
                    display: block;
                    content: "";
                    margin-top: 1.5rem;
                }
            `}</style>
        </main>
    );
}
