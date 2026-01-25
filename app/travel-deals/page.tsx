'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { icons } from '@/assets/icons';
import Loading from '../components/Loading';

interface Product {
    id: number;
    title: string;
    description?: string;
    price?: number;
    price_per_night?: number;
    mainCategory: string;
    images: string[];
    city?: string;
    country?: string;
}

export default function TravelDealsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                if (data.success) {
                    // Filter for travel categories: Hotel, Flight, Rental
                    const travelDeals = data.data.filter((p: Product) =>
                        ['hotel', 'flight', 'rental'].includes(p.mainCategory.toLowerCase())
                    );
                    setProducts(travelDeals);
                }
            } catch (error) {
                console.error('Error fetching travel deals:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    const getLink = (product: Product) => {
        const cat = product.mainCategory.toLowerCase();
        if (cat === 'hotel') return `/hotels/${product.id}`;
        if (cat === 'flight') return `/flights/${product.id}`;
        if (cat === 'rental') return `/rentals/${product.id}`;
        return `/products/${product.id}`;
    };

    if (loading) return <Loading variant="container" text="Searching for the best travel deals..." />;

    return (
        <div className="min-h-screen bg-(--background) pt-24 pb-12">
            <div className="container mx-auto px-4">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-(--primary) mb-2">Travel Deals</h1>
                    <p className="text-(--gray-600) font-medium">Explore our curated collection of hotels, flights, and rentals.</p>
                </header>

                {products.length === 0 ? (
                    <div className="text-center py-20 bg-(--white) rounded-2xl border border-(--gray-100) shadow-sm">
                        <icons.Plane className="w-16 h-16 text-(--gray-300) mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-(--gray-900)">No deals found</h3>
                        <p className="text-(--gray-500)">We're currently updating our offers. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={getLink(product)}
                                className="bg-(--white) group rounded-2xl overflow-hidden border border-(--gray-100) hover:border-(--primary)/20 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={product.images[0] || 'https://images.unsplash.com/photo-1506929113670-07bf3b4ae5f1?auto=format&fit=crop&q=80'}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-(--white)/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-(--primary)">
                                            {product.mainCategory}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-center gap-1 text-(--gray-500) text-xs mb-2">
                                        <icons.MapPin className="w-3 h-3" />
                                        <span>{product.city}{product.country ? `, ${product.country}` : ''}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-(--gray-900) leading-tight mb-3 line-clamp-2 group-hover:text-(--primary) transition-colors">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm text-(--gray-600) line-clamp-2 mb-4 flex-1 italic">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-(--gray-50)">
                                        <div className="text-xs text-(--gray-500)">
                                            Starting from
                                        </div>
                                        <div className="text-xl font-black text-(--primary)">
                                            €{product.price || product.price_per_night || '---'}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
