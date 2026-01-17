'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { icons } from '@/assets/icons';
import Link from 'next/link';

export default function FlightSearchResults() {
    const searchParams = useSearchParams();
    const from = searchParams.get('from') || 'any';
    const to = searchParams.get('to') || 'any';
    const date = searchParams.get('date') || 'any';

    const [flights, setFlights] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch('/api/flights');
                const data = await res.json();
                if (data.success) {
                    // Simple client-side filtering logic
                    let filtered = data.data;
                    if (from !== 'any') {
                        filtered = filtered.filter((f: any) =>
                            f.departureCity.toLowerCase().includes(from.toLowerCase())
                        );
                    }
                    if (to !== 'any') {
                        filtered = filtered.filter((f: any) =>
                            f.arrivalCity.toLowerCase().includes(to.toLowerCase())
                        );
                    }
                    setFlights(filtered);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [from, to, date]);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Search Summary Header */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-100">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Departure</span>
                            <span className="text-lg font-bold text-primary">{from === 'any' ? 'Anywhere' : from}</span>
                        </div>
                        <icons.Plane className="text-secondary w-5 h-5" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Destination</span>
                            <span className="text-lg font-bold text-primary">{to === 'any' ? 'Anywhere' : to}</span>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-gray-100 hidden md:block"></div>
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date</span>
                        <span className="text-lg font-bold text-primary">{date === 'any' ? 'Flexibile' : date}</span>
                    </div>
                    <Link href="/" className="px-6 py-2 border-2 border-primary/10 text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all">
                        Change Search
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar (Dummy for UI consistency) */}
                    <div className="lg:w-1/4 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                                <icons.Search className="w-4 h-4" /> Filter
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Stops</label>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" className="rounded text-secondary focus:ring-secondary" defaultChecked />
                                            <span className="text-sm text-gray-600">Direct flights</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results List */}
                    <div className="lg:w-3/4 space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-500 font-medium">{loading ? 'Searching...' : `${flights.length} results found`}</span>
                        </div>

                        {loading ? (
                            <div className="text-center py-20">
                                <div className="text-xl font-bold text-primary animate-pulse">Loading amazing deals...</div>
                            </div>
                        ) : flights.length > 0 ? (
                            flights.map((flight) => (
                                <div key={flight.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                                    <div className="p-6 flex flex-col md:flex-row items-center gap-8">
                                        {/* Airline */}
                                        <div className="flex items-center gap-4 w-full md:w-1/4">
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 overflow-hidden">
                                                <icons.Plane className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-primary leading-tight">{flight.airline}</div>
                                                <div className="text-xs text-gray-400">{flight.flightClass}</div>
                                            </div>
                                        </div>

                                        {/* Connection */}
                                        <div className="flex-1 flex items-center justify-between gap-4 w-full md:w-auto">
                                            <div className="text-center md:text-left">
                                                <div className="text-xl font-bold text-primary">TBD</div>
                                                <div className="text-xs text-gray-400">{flight.departureCity}</div>
                                            </div>
                                            <div className="flex-1 flex flex-col items-center px-4">
                                                <div className="text-xs font-semibold text-gray-400 mb-1">{flight.duration}</div>
                                                <div className="relative w-full h-px bg-gray-200 flex items-center justify-center">
                                                    <div className="absolute w-2 h-2 bg-gray-200 rounded-full"></div>
                                                    <icons.Plane className="w-4 h-4 text-secondary rotate-90" />
                                                </div>
                                                <div className="text-xs font-bold text-secondary mt-1">Direct</div>
                                            </div>
                                            <div className="text-center md:text-right">
                                                <div className="text-xl font-bold text-primary">TBD</div>
                                                <div className="text-xs text-gray-400">{flight.arrivalCity}</div>
                                            </div>
                                        </div>

                                        {/* Price and Action */}
                                        <div className="w-full md:w-1/5 md:border-l border-gray-100 md:pl-8 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-secondary">{flight.price} {flight.currency}</div>
                                                <div className="text-xs text-gray-400">per person</div>
                                            </div>
                                            <Link href={`/flights/${flight.id}`} className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 hover:scale-105 transition-all shadow-lg text-sm w-full md:w-auto text-center">
                                                Select
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50/50 px-6 py-2 border-t border-gray-50 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{flight.title}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                                <icons.Plane className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-primary mb-2">No flights found</h3>
                                <p className="text-gray-500">Try adjusting your search criteria or dates.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
