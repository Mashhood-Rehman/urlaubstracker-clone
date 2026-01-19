'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Calendar, User, Tag } from 'lucide-react';
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

const BlogSection = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs?published=true');
                const data = await res.json();
                // Take only the latest 3 for the landing page
                setBlogs(Array.isArray(data) ? data.slice(0, 3) : []);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (!loading && blogs.length === 0) return null;

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 md:px-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="h-1.5 w-20 bg-[#5B2EFF] mb-8 rounded-full"></div>
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
                            Latest from <span className="text-[#5B2EFF]">Our Blog</span>
                        </h2>
                        <p className="mt-4 text-lg text-gray-500 font-medium">Insights, guides, and inspiration for your next adventure.</p>
                    </div>
                    <Link href="/blogs" className="group px-8 py-4 bg-gray-900 text-white font-bold uppercase rounded-2xl hover:bg-[#5B2EFF] transition-all flex items-center gap-2">
                        View All Articles
                        <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-[2rem] h-[450px] animate-pulse border border-slate-100" />
                        ))
                    ) : (
                        blogs.map((blog) => (
                            <Link
                                href={`/blogs/${blog.slug}`}
                                key={blog.id}
                                className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={blog.mainImage || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80'}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <div className="bg-[#5EEAD4] text-[#5B2EFF] px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">
                                            {blog.category}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-4">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={12} className="text-[#5B2EFF]" />
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <User size={12} className="text-[#5B2EFF]" />
                                            {blog.author}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-black text-gray-900 leading-tight mb-4 group-hover:text-[#5B2EFF] transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-8">
                                        {blog.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-[12px] font-black uppercase tracking-widest text-[#5B2EFF] flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More <ArrowUpRight size={14} />
                                        </span>
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#5B2EFF] group-hover:text-white transition-colors">
                                            <ArrowUpRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
