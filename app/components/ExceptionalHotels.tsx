"use client";
import React from 'react';
import { exceptionalHotels } from '../data';
import { Star, MapPin } from 'lucide-react';

const ExceptionalHotels = () => {
    return (
        <section className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                <div className="text-center mb-20">
                    <h4 className="text-[#5B2EFF] font-black uppercase tracking-[0.3em] text-xs mb-4">Curated Stays</h4>
                    <h2 className="text-5xl md:text-7xl font-black text-gray-900 italic uppercase tracking-tighter leading-none">
                        EXCEPTIONAL <span className="text-transparent border-t-2 border-b-2 border-gray-900 bg-clip-text" style={{ WebkitTextStroke: '1px #111827' }}>HOTELS</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {exceptionalHotels.map((hotel) => (
                        <div key={hotel.id} className="bg-white rounded-[2.5rem] overflow-hidden group border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={hotel.image}
                                    alt={hotel.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                    <Star size={12} className="fill-[#5B2EFF] text-[#5B2EFF]" />
                                    <span className="font-black text-[10px] text-gray-900">5.0</span>
                                </div>
                                <div className="absolute inset-0 bg-linear-to-t from-gray-900/40 to-transparent"></div>
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-white font-black text-2xl group-hover:text-[#5EEAD4] transition-colors">{hotel.price}</p>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-1 text-[#5B2EFF] font-black text-[10px] uppercase tracking-widest mb-2">
                                    <MapPin size={10} />
                                    {hotel.location}
                                </div>
                                <h3 className="text-xl font-black text-gray-900 leading-tight mb-6">{hotel.title}</h3>
                                <button className="w-full py-4 bg-gray-50 text-gray-900 font-black rounded-2xl group-hover:bg-[#5B2EFF] group-hover:text-white transition-all duration-300 uppercase text-xs tracking-widest">
                                    Elevate Stay
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExceptionalHotels;
