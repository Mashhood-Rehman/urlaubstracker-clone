"use client";
import React from 'react';
import { travelHacks } from '../data';
import { ArrowUpRight } from 'lucide-react';

const TravelHacks = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="h-1 w-20 bg-[#5B2EFF] mb-8"></div>
                        <h2 className="text-5xl md:text-7xl font-black text-gray-900 italic uppercase tracking-tighter leading-none">
                            TRAVEL <span className="text-[#5B2EFF]">HACKS</span>
                        </h2>
                        <p className="mt-6 text-xl text-gray-500 font-medium italic">Expert secrets to unlocking the world for less.</p>
                    </div>
                    <button className="px-10 py-5 bg-gray-900 text-white font-black italic uppercase rounded-full hover:bg-[#5B2EFF] transition-all shrink-0">
                        View All Secrets
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {travelHacks.map((hack) => (
                        <div key={hack.id} className="group relative h-[450px] overflow-hidden rounded-[3rem] cursor-pointer bg-gray-100">
                            <img
                                src={hack.image}
                                alt={hack.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                            <div className="absolute top-8 left-8">
                                <div className="bg-[#5EEAD4] text-[#5B2EFF] px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">
                                    {hack.tag}
                                </div>
                            </div>

                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <h3 className="text-2xl font-black italic uppercase leading-none mb-3 group-hover:text-[#5EEAD4] transition-colors">{hack.title}</h3>
                                <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500 ease-in-out">
                                    <p className="text-white/70 text-sm font-medium leading-tight">
                                        {hack.description}
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                                    Read Guide <ArrowUpRight size={14} className="text-[#5EEAD4]" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TravelHacks;
