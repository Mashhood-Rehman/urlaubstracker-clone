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
        <section className="py-12 bg-slate-50">
            <div className="container mx-auto px-4 md:px-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
                    <div className="max-w-2xl">
                        <div className="h-1 w-16 bg-[#5B2EFF] mb-6 rounded-full"></div>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
                            Latest from <span className="text-[#5B2EFF]">Our Blog</span>
                        </h2>
                        <p className="mt-3 text-base text-gray-500 font-medium">Insights, guides, and inspiration for your next adventure.</p>
                    </div>
                    <Link href="/blogs" className="group px-6 py-3 bg-gray-900 text-white font-bold uppercase rounded-lg hover:bg-[#5B2EFF] transition-all flex items-center gap-2 text-sm">
                        View All Articles
                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-lg h-[400px] animate-pulse border border-slate-100" />
                        ))
                    ) : (
                        blogs.map((blog) => (
                            <Link
                                href={`/blogs/${blog.slug}`}
                                key={blog.id}
                                className="group bg-white rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={blog.mainImage || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80'}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <div className="bg-[#5EEAD4] text-[#5B2EFF] px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest shadow-lg">
                                            {blog.category}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={10} className="text-[#5B2EFF]" />
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <User size={10} className="text-[#5B2EFF]" />
                                            {blog.author}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-black text-gray-900 leading-tight mb-3 group-hover:text-[#5B2EFF] transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>

                                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-6">
                                        {blog.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#5B2EFF] flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More <ArrowUpRight size={12} />
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#5B2EFF] group-hover:text-white transition-colors">
                                            <ArrowUpRight size={16} />
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
