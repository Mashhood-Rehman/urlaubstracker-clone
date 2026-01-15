'use client';

import React from 'react';
import { icons } from '@/assets/icons';
import { images } from '@/assets/images';
import Link from 'next/link';

interface FlightResult {
    id: string;
    airline: string;
    logo: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: number;
    stopInfo: string;
    price: number;
    route: string;
}

const dummyFlights: FlightResult[] = [
    {
        id: '1',
        airline: 'Turkish Airlines',
        logo: 'https://www.turkishairlines.com/favicon-32x32.png',
        departureTime: '06:15',
        arrivalTime: '05:37',
        duration: '31:22 h',
        stops: 2,
        stopInfo: 'IST, PTY',
        price: 1862,
        route: 'ISB Islamabad - ASU Asuncion'
    },
    {
        id: '2',
        airline: 'GOL',
        logo: 'https://www.voegol.com.br/assets/img/favicons/favicon-32x32.png',
        departureTime: '12:20',
        arrivalTime: '08:50',
        duration: '36:30 h',
        stops: 2,
        stopInfo: 'GRU, IST',
        price: 2004,
        route: 'ASU Asuncion - ISB Islamabad'
    },
    {
        id: '3',
        airline: 'Air Europa',
        logo: 'https://www.aireuropa.com/favicon.ico',
        departureTime: '04:30',
        arrivalTime: '07:30',
        duration: '35:00 h',
        stops: 2,
        stopInfo: 'AUH, MAD',
        price: 2150,
        route: 'ISB Islamabad - ASU Asuncion'
    }
];

const FlightResultsPage = ({ params }: { params: { params: string[] } }) => {
    // Decode params if needed
    const searchParams = params.params?.[0] || 'any-any-any';
    const [from, to, date] = searchParams.split('-');

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Search Summary Header */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-100">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Departure</span>
                            <span className="text-lg font-bold text-primary">{from === 'any' ? 'Islamabad (ISB)' : from}</span>
                        </div>
                        <icons.Plane className="text-secondary w-5 h-5" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Destination</span>
                            <span className="text-lg font-bold text-primary">{to === 'any' ? 'Asunción (ASU)' : to}</span>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-gray-100 hidden md:block"></div>
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date</span>
                        <span className="text-lg font-bold text-primary">{date === 'any' ? 'Jan 24 - March 01' : date}</span>
                    </div>
                    <Link href="/" className="px-6 py-2 border-2 border-primary/10 text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all">
                        Change Search
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar (Dummy) */}
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
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" className="rounded text-secondary focus:ring-secondary" defaultChecked />
                                            <span className="text-sm text-gray-600">1 Stop</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" className="rounded text-secondary focus:ring-secondary" defaultChecked />
                                            <span className="text-sm text-gray-600">2+ Stops</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Price up to</label>
                                    <input type="range" className="w-full accent-secondary" />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>500 €</span>
                                        <span>3.500 €</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results List */}
                    <div className="lg:w-3/4 space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-500 font-medium">{dummyFlights.length} results found</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Sort by:</span>
                                <select className="text-sm font-bold text-primary bg-transparent outline-none">
                                    <option>Best Price</option>
                                    <option>Fastest</option>
                                </select>
                            </div>
                        </div>

                        {dummyFlights.map((flight) => (
                            <div key={flight.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                                <div className="p-6 flex flex-col md:flex-row items-center gap-8">
                                    {/* Airline */}
                                    <div className="flex items-center gap-4 w-full md:w-1/4">
                                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 overflow-hidden">
                                            <img src={flight.logo} alt={flight.airline} className="w-8 h-8 object-contain" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-primary leading-tight">{flight.airline}</div>
                                            <div className="text-xs text-gray-400">Premium Economy</div>
                                        </div>
                                    </div>

                                    {/* Connection */}
                                    <div className="flex-1 flex items-center justify-between gap-4 w-full md:w-auto">
                                        <div className="text-center md:text-left">
                                            <div className="text-xl font-bold text-primary">{flight.departureTime}</div>
                                            <div className="text-xs text-gray-400">ISB</div>
                                        </div>
                                        <div className="flex-1 flex flex-col items-center px-4">
                                            <div className="text-xs font-semibold text-gray-400 mb-1">{flight.duration}</div>
                                            <div className="relative w-full h-px bg-gray-200 flex items-center justify-center">
                                                <div className="absolute w-2 h-2 bg-gray-200 rounded-full"></div>
                                                <icons.Plane className="w-4 h-4 text-secondary rotate-90" />
                                            </div>
                                            <div className="text-xs font-bold text-secondary mt-1">{flight.stops} Stops ({flight.stopInfo})</div>
                                        </div>
                                        <div className="text-center md:text-right">
                                            <div className="text-xl font-bold text-primary">{flight.arrivalTime}</div>
                                            <div className="text-xs text-gray-400">ASU</div>
                                        </div>
                                    </div>

                                    {/* Price and Action */}
                                    <div className="w-full md:w-1/5 md:border-l border-gray-100 md:pl-8 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-secondary">{flight.price.toLocaleString('en-US')} €</div>
                                            <div className="text-xs text-gray-400">per person</div>
                                        </div>
                                        <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 hover:scale-105 transition-all shadow-lg text-sm w-full md:w-auto">
                                            Select
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-gray-50/50 px-6 py-2 border-t border-gray-50 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Best option • Cheapest connection</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightResultsPage;
