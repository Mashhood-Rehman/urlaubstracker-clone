'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { icons } from '@/assets/icons';
import Link from 'next/link';

const FlightDetailPage = () => {
    const { id } = useParams();
    const [flight, setFlight] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const res = await fetch(`/api/flights/${id}`);
                const data = await res.json();
                if (data.success) {
                    setFlight(data.data);
                }
            } catch (error) {
                console.error('Error fetching flight:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchFlight();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-xl font-bold text-primary animate-pulse">Loading flight details...</div>
        </div>
    );

    if (!flight) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-2xl font-bold text-primary mb-4">Flight not found</h1>
            <Link href="/" className="text-secondary hover:underline">Back to home</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="bg-primary p-8 text-white relative overflow-hidden">
                        <icons.Plane className="absolute top-0 right-0 w-64 h-64 text-white/5 -translate-y-12 translate-x-12 rotate-12" />
                        <div className="relative z-10">
                            <span className="bg-secondary text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                                {flight.flightClass} Deal
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">{flight.title}</h1>
                            <div className="flex items-center gap-4 text-white/80">
                                <span className="flex items-center gap-1"><icons.Plane className="w-4 h-4" /> {flight.airline}</span>
                                <span>•</span>
                                <span>{flight.duration}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-8">
                        {/* Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 bg-gray-50 rounded-2xl text-center">
                                <div className="text-xs text-gray-400 font-bold uppercase mb-1">From</div>
                                <div className="text-xl font-bold text-primary">{flight.departureCity}</div>
                            </div>
                            <div className="p-4 bg-secondary/10 rounded-2xl text-center flex items-center justify-center">
                                <icons.Plane className="text-secondary w-8 h-8 rotate-90" />
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl text-center">
                                <div className="text-xs text-gray-400 font-bold uppercase mb-1">To</div>
                                <div className="text-xl font-bold text-primary">{flight.arrivalCity}</div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-bold text-primary mb-4">About this Flight</h2>
                            <p className="text-gray-600 leading-relaxed">{flight.description}</p>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                                    <icons.Check className="w-4 h-4 text-green-500" /> Services & Amenities
                                </h3>
                                <ul className="space-y-2">
                                    {flight.services && Array.isArray(flight.services) && flight.services.map((service: string, idx: number) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                                            {service}
                                        </li>
                                    ))}
                                    <li className="text-sm text-gray-600 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                                        Baggage: {flight.baggage}
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                                    <icons.Star className="w-4 h-4 text-secondary" /> Why we love it
                                </h3>
                                <ul className="space-y-2">
                                    {flight.whyAdore && Array.isArray(flight.whyAdore) && flight.whyAdore.map((reason: string, idx: number) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                            <icons.Check className="w-3 h-3 text-secondary" />
                                            {reason}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Price & Action */}
                        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <div className="text-sm text-gray-400">Total price per person</div>
                                <div className="text-4xl font-bold text-secondary">{flight.price} {flight.currency}</div>
                                {flight.flexibleDates && (
                                    <div className="text-xs text-green-600 font-bold mt-1 inline-flex items-center gap-1">
                                        <icons.Calendar className="w-3 h-3" /> Flexible dates available
                                    </div>
                                )}
                            </div>
                            <button className="px-12 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 w-full md:w-auto">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightDetailPage;
