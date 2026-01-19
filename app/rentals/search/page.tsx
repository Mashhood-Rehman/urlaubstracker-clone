'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { icons } from '@/assets/icons';
import Link from 'next/link';

function RentalSearchResultsContent() {
    const searchParams = useSearchParams();
    const location = searchParams.get('location') || 'any';

    const [rentals, setRentals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch('/api/rentals');
                const data = await res.json();
                if (data.success) {
                    let filtered = data.data;
                    if (location !== 'any') {
                        filtered = filtered.filter((r: any) =>
                            r.title.toLowerCase().includes(location.toLowerCase()) ||
                            r.mainDescription.toLowerCase().includes(location.toLowerCase())
                        );
                    }
                    setRentals(filtered);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [location]);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Search Summary Header */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-100">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rental Location</span>
                            <span className="text-lg font-bold text-primary">{location === 'any' ? 'Anywhere' : location}</span>
                        </div>
                    </div>
                    <Link href="/" className="px-6 py-2 border-2 border-primary/10 text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all">
                        Change Search
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Results List */}
                    <div className="w-full space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-500 font-medium">{loading ? 'Searching...' : `${rentals.length} rentals available`}</span>
                        </div>

                        {loading ? (
                            <div className="text-center py-20">
                                <div className="text-xl font-bold text-primary animate-pulse">Loading rentals...</div>
                            </div>
                        ) : rentals.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {rentals.map((rental) => (
                                    <div key={rental.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col h-full">
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${rental.category === 'car' ? 'bg-blue-100 text-blue-800' :
                                                    rental.category === 'parking' ? 'bg-gray-100 text-gray-800' :
                                                        'bg-purple-100 text-purple-800'
                                                    }`}>
                                                    {rental.category}
                                                </span>
                                                <div className="text-xl font-bold text-secondary">
                                                    {rental.offer?.pricePerDay ? `${rental.offer.pricePerDay} ${rental.offer.currency || '€'}` :
                                                        rental.offer?.price ? `${rental.offer.price} ${rental.offer.currency || '€'}` : 'See Deal'}
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2 leading-tight group-hover:text-secondary transition-colors">
                                                {rental.title}
                                            </h3>

                                            <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                                                {rental.description}
                                            </p>

                                            <div className="mt-auto space-y-3">
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {rental.thingsToDo?.slice(0, 3).map((thing: string, idx: number) => (
                                                        <span key={idx} className="text-[10px] font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                                                            {thing}
                                                        </span>
                                                    ))}
                                                </div>

                                                <Link href={`/rentals/search/${rental.id}`} className="w-full py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2">
                                                    Book Now
                                                    <icons.ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                                <icons.Car className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-primary mb-2">No rentals found in this area</h3>
                                <p className="text-gray-500">We're expanding rapidly. Check back soon!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RentalSearchResults() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
                <div className="text-xl font-bold text-primary animate-pulse">Loading search...</div>
            </div>
        }>
            <RentalSearchResultsContent />
        </Suspense>
    );
}
