'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { icons } from '@/assets/icons';
import Link from 'next/link';

export default function RentalDetailPage() {
    const { id } = useParams();
    const [rental, setRental] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRental = async () => {
            try {
                const res = await fetch(`/api/rentals/${id}`);
                const data = await res.json();
                if (data.success) {
                    setRental(data.data);
                }
            } catch (error) {
                console.error('Error fetching rental:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchRental();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-xl font-bold text-primary animate-pulse">Loading rental details...</div>
        </div>
    );

    if (!rental) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-2xl font-bold text-primary mb-4">Rental not found</h1>
            <Link href="/" className="text-secondary hover:underline">Back to home</Link>
        </div>
    );

    return (
        <main className="min-h-screen bg-gray-50 py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/rentals/search">Rentals</Link>
                        <span>/</span>
                        <span className="text-primary font-medium">{rental.title}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${rental.category === 'car' ? 'bg-blue-100 text-blue-800' :
                                        rental.category === 'parking' ? 'bg-gray-100 text-gray-800' :
                                            'bg-purple-100 text-purple-800'
                                    } mb-4 inline-block`}>
                                    {rental.category} deal
                                </span>
                                <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">{rental.mainHeading}</h1>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">{rental.mainDescription}</p>

                                <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10">
                                    <h3 className="text-xl font-bold text-secondary mb-3 flex items-center gap-2">
                                        <icons.Star className="w-5 h-5" /> Why this is a super deal
                                    </h3>
                                    <p className="text-gray-700">{rental.whySuperDeal}</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-primary mb-6">What's included in the offer</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {rental.offer && Object.entries(rental.offer).map(([key, value]: [string, any]) => (
                                        <div key={key} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                                <icons.Check className="w-4 h-4 text-green-500" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">{key}</div>
                                                <div className="text-sm font-bold text-primary">{String(value)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {rental.thingsToDo && Array.isArray(rental.thingsToDo) && rental.thingsToDo.length > 0 && (
                                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold text-primary mb-6">Things to do</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {rental.thingsToDo.map((thing: string, idx: number) => (
                                            <div key={idx} className="flex items-start gap-4">
                                                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 mt-1">
                                                    <icons.MapPin className="w-5 h-5 text-primary" />
                                                </div>
                                                <p className="text-gray-600 font-medium">{thing}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {rental.ecoTip && (
                                <div className="bg-green-50 border border-green-100 rounded-3xl p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
                                            <icons.Globe className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-green-800">Eco-Friendly Tip</h3>
                                    </div>
                                    <p className="text-green-700 leading-relaxed font-medium">{rental.ecoTip}</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar / Booking Card */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <div className="bg-primary rounded-3xl p-8 text-white shadow-2xl shadow-primary/20">
                                    <div className="mb-6">
                                        <div className="text-sm text-white/60 mb-1">Starting from</div>
                                        <div className="text-4xl font-bold">
                                            {rental.offer?.pricePerDay ? `${rental.offer.pricePerDay} ${rental.offer.currency || '€'}` :
                                                rental.offer?.price ? `${rental.offer.price} ${rental.offer.currency || '€'}` : 'Check Price'}
                                            {rental.offer?.pricePerDay && <span className="text-lg font-normal text-white/60 ml-2">/ day</span>}
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        {rental.additionalInfo && Object.entries(rental.additionalInfo).slice(0, 4).map(([key, value]: [string, any]) => (
                                            <div key={key} className="flex items-center justify-between text-sm py-3 border-b border-white/10 last:border-0">
                                                <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                                <span className="font-bold">{String(value)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full py-4 bg-secondary text-primary font-bold rounded-2xl hover:bg-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2">
                                        Book this Deal
                                        <icons.ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                                    <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                                        <icons.Calendar className="w-4 h-4" /> Need Help?
                                    </h4>
                                    <p className="text-sm text-gray-500 mb-4">Our support team is available 24/7 to help you with your booking.</p>
                                    <button className="text-secondary text-sm font-bold hover:underline">Contact Support</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
