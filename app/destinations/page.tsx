'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { icons } from '@/assets/icons';
import Loading from '../components/Loading';

interface Coupon {
    id: number;
    hotels?: { city: string, country: string }[];
    flights?: any[];
    rentals?: any[];
}

interface Destination {
    name: string;
    type: 'city' | 'country';
    count: number;
}

export default function DestinationsPage() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const res = await fetch('/api/coupons');
                const data = await res.json();

                if (data.coupons) {
                    const placesMap = new Map<string, { type: 'city' | 'country', count: number }>();

                    data.coupons.forEach((coupon: Coupon) => {
                        if (coupon.hotels) {
                            coupon.hotels.forEach(hotel => {
                                if (hotel.city) {
                                    const cityKey = hotel.city.toLowerCase().trim();
                                    const existing = placesMap.get(cityKey);
                                    placesMap.set(cityKey, {
                                        type: 'city',
                                        count: (existing?.count || 0) + 1
                                    });
                                }
                                if (hotel.country) {
                                    const countryKey = hotel.country.toLowerCase().trim();
                                    const existing = placesMap.get(countryKey);
                                    placesMap.set(countryKey, {
                                        type: 'country',
                                        count: (existing?.count || 0) + 1
                                    });
                                }
                            });
                        }
                    });

                    const sortedDestinations = Array.from(placesMap.entries())
                        .map(([name, data]) => ({
                            name: name.charAt(0).toUpperCase() + name.slice(1),
                            ...data
                        }))
                        .sort((a, b) => b.count - a.count);

                    setDestinations(sortedDestinations);
                }
            } catch (error) {
                console.error('Error fetching destinations:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);

    if (loading) return <Loading variant="container" text="Loading top destinations with coupons..." />;

    return (
        <div className="min-h-screen bg-(--background) pt-24 pb-12">
            <div className="container mx-auto px-4">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-(--primary) mb-2">Destinations</h1>
                    <p className="text-(--gray-600) font-medium">Discover places where you can save more with our exclusive coupons.</p>
                </header>

                {destinations.length === 0 ? (
                    <div className="text-center py-20 bg-(--white) rounded-2xl border border-(--gray-100) shadow-sm">
                        <icons.Globe className="w-16 h-16 text-(--gray-300) mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-(--gray-900)">No destinations found</h3>
                        <p className="text-(--gray-500)">We're currently expanding our reach. Check back soon for new places!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {destinations.map((dest) => (
                            <Link
                                key={dest.name}
                                href={`/search?q=${dest.name}`}
                                className="bg-(--white) p-6 rounded-2xl border border-(--gray-100) hover:border-(--primary)/20 hover:shadow-lg transition-all duration-300 text-center group cursor-pointer"
                            >
                                <div className="w-12 h-12 bg-(--primary)/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-(--primary) transition-colors">
                                    <icons.MapPin className="w-6 h-6 text-(--primary) group-hover:text-(--white) transition-colors" />
                                </div>
                                <h3 className="font-bold text-(--gray-900) group-hover:text-(--primary) transition-colors">
                                    {dest.name}
                                </h3>
                                <p className="text-xs text-(--gray-500) mt-1 uppercase tracking-tight">
                                    {dest.type}
                                </p>
                                <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 bg-(--success)/10 rounded-lg">
                                    <icons.Gift className="w-3 h-3 text-(--success)" />
                                    <span className="text-[10px] font-bold text-(--success)">{dest.count} Coupons</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
