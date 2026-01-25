'use client';

import React from 'react';
import { images } from '@/assets/images';
import { icons } from '@/assets/icons';

import { appHacks } from '@/app/data';

const AppAndHacks = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* App Promotion (Split Screen Left) */}
                    <div className="flex-1 w-full bg-primary rounded-[3rem] p-12 relative flex flex-col md:flex-row items-center gap-8">
                        <div className="relative z-10 text-white flex-1">
                            <h2 className="text-4xl font-bold mb-6">Take the deals with you.</h2>
                            <p className="text-white/70 mb-8 max-w-sm">Download our mobile app and never miss another incredible travel bargain.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="btn bg-white text-primary hover:bg-white/90">App Store</button>
                                <button className="btn border border-white/30 text-white hover:bg-white/10">Play Store</button>
                            </div>
                        </div>

                        <div className="relative w-64 h-[450px] shrink-0">
                            <div className="absolute inset-0 bg-secondary rounded-[2.5rem] rotate-6"></div>
                            <img
                                src={images.appMockup}
                                alt="App Mockup"
                                className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] shadow-2xl z-10"
                            />
                        </div>
                    </div>

                    {/* Travel Hacks (Split Screen Right) */}
                    <div className="flex-1 w-full">
                        <h2 className="text-3xl font-bold text-primary mb-8">Travel Hacks & Tips</h2>
                        <div className="space-y-6">
                            {appHacks.map((hack) => (
                                <div
                                    key={hack.title}
                                    className="flex items-start gap-6 p-6 rounded-2xl hover:bg-muted transition-colors cursor-pointer group"
                                >
                                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                                        <hack.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-primary mb-1">{hack.title}</h3>
                                        <p className="text-gray-500">{hack.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-8 btn btn-blue w-full md:w-auto">
                            Read More Hacks
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppAndHacks;
