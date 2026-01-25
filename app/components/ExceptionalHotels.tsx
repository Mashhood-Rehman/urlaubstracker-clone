"use client";
import React, { useEffect, useState } from 'react';
import { icons } from '@/assets/icons';
import Link from 'next/link';

interface Hotel {
    id: number;
    title: string;
    city: string;
    country: string;
    price_per_night: number;
    currency: string;
    images: string[];
    rating?: number;
}

import Loading from './Loading';

const ExceptionalHotels = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                if (data.success) {
                    const filteredHotels = data.data
                        .filter((p: any) => p.mainCategory === 'Hotel')
                        .slice(0, 4);
                    setHotels(filteredHotels);
                }
            } catch (error) {
                console.error('Error fetching exceptional hotels:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, []);

    if (loading) return <Loading variant="container" />;
    if (hotels.length === 0) return null;

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                <div className="text-center mb-16">
                    <h4 className="text-[#5B2EFF] font-black uppercase tracking-[0.3em] text-[10px] mb-4">Curated Stays</h4>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                        EXCEPTIONAL <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #111827' }}>HOTELS</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {hotels.map((hotel) => (
                        <Link
                            href={`/hotels/${hotel.id}`}
                            key={hotel.id}
                            className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full cursor-pointer"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={hotel.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80'}
                                    alt={hotel.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                {hotel.rating && (
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-xl">
                                        <icons.Star size={10} className="fill-[#5B2EFF] text-[#5B2EFF]" />
                                        <span className="font-black text-[10px] text-gray-900">{hotel.rating.toFixed(1)}</span>
                                    </div>
                                )}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-gray-900/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-white font-black text-xl group-hover:text-[#5EEAD4] transition-colors">
                                        {hotel.currency || '€'} {hotel.price_per_night}
                                        <span className="text-[10px] font-medium ml-1 opacity-80">/ night</span>
                                    </p>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-1.5 text-[#5B2EFF] font-black text-[9px] uppercase tracking-widest mb-3">
                                    <icons.MapPin size={10} />
                                    {hotel.city}, {hotel.country}
                                </div>
                                <h3 className="text-lg font-black text-gray-900 leading-tight mb-6 line-clamp-2 h-12">{hotel.title}</h3>

                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#5B2EFF] flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Discover Stay <icons.ArrowRight size={14} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExceptionalHotels;
