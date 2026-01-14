'use client';

import React, { useState } from 'react';
import { icons } from '@/assets/icons';
import { images } from '@/assets/images';

const Hero = () => {
    const [activeTab, setActiveTab] = useState('Flüge');

    const tabs = [
        { name: 'Flüge', icon: icons.Plane },
        { name: 'Hotels', icon: icons.Hotel },
        { name: 'Mietwagen', icon: icons.Car },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${images.heroBg})` }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/30 to-primary/80"></div>
            </div>

            {/* Hero Content */}
            <div className="container mx-auto px-4 relative z-10 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    Finde echte <span className="text-secondary">Urlaubsschnäppchen.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-700 delay-100">
                    Wir durchsuchen täglich für dich das Internet nach den besten Reisedeals.
                </p>

                {/* Search Engine */}
                <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-500 delay-200">
                    {/* Tabs */}
                    <div className="flex border-b">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 font-semibold transition-all ${activeTab === tab.name
                                    ? 'text-secondary border-b-2 border-secondary bg-secondary/5'
                                    : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.name}
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full text-left">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Abflughafen</label>
                            <div className="relative group">
                                <icons.MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary" />
                                <input
                                    type="text"
                                    placeholder="Wo startest du?"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex-1 w-full text-left">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Zielort</label>
                            <div className="relative group">
                                <icons.Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary" />
                                <input
                                    type="text"
                                    placeholder="Wohin soll's gehen?"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex-1 w-full text-left">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Reisezeitraum</label>
                            <div className="relative group">
                                <icons.Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary" />
                                <input
                                    type="text"
                                    placeholder="Wann fliegst du?"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-transparent focus:border-secondary focus:bg-white outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button className="w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 group">
                            <icons.Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            Suchen
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
        </section>
    );
};

export default Hero;
