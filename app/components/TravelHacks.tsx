"use client";
import React, { useEffect, useState } from 'react';
import { icons } from '@/assets/icons';
import Link from 'next/link';

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    mainImage: string;
    category: string;
}

const TravelHacks = () => {
    const [hacks, setHacks] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHacks = async () => {
            try {
                const res = await fetch('/api/blogs?published=true&category=Travel&limit=4');
                const data = await res.json();
                setHacks(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching travel hacks:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHacks();
    }, []);

    if (!loading && hacks.length === 0) return null;

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="h-1 w-20 bg-[#5B2EFF] mb-8"></div>
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 italic uppercase tracking-tighter leading-none">
                            TRAVEL <span className="text-[#5B2EFF]">HACKS</span>
                        </h2>
                        <p className="mt-6 text-xl text-gray-500 font-medium italic">Expert secrets to unlocking the world for less.</p>
                    </div>
                    <Link
                        href="/blogs?category=Travel"
                        className="px-10 py-5 bg-gray-900 text-white font-black italic uppercase rounded-lg hover:bg-[#5B2EFF] transition-all shrink-0 flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-[#5B2EFF]/20"
                    >
                        View All Travel Tips
                        <icons.ArrowUpRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                        [1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-slate-50 rounded-2xl h-[400px] animate-pulse border border-slate-100" />
                        ))
                    ) : (
                        hacks.map((hack) => (
                            <Link
                                key={hack.id}
                                href={`/blogs/${hack.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full cursor-pointer"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={hack.mainImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80'}
                                        alt={hack.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <div className="bg-[#5EEAD4] text-[#5B2EFF] px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest shadow-lg">
                                            {hack.category}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-lg font-black italic uppercase leading-tight text-gray-900 group-hover:text-[#5B2EFF] transition-colors line-clamp-2 h-12">
                                        {hack.title}
                                    </h3>
                                    <p className="mt-4 text-gray-500 text-xs leading-relaxed line-clamp-3">
                                        {hack.excerpt}
                                    </p>
                                    <div className="mt-auto pt-6 flex items-center justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#5B2EFF] flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Unlock Hack <icons.ArrowUpRight size={14} />
                                        </span>
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

export default TravelHacks;
