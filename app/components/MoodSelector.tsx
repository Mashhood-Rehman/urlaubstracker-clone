'use client';

import React from 'react';
import { icons } from '@/assets/icons';

import { moods } from '@/app/data';

const MoodSelector = () => {
    return (
        <section className="py-24 bg-(--white) px-4">
            <div className="container mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-(--primary) mb-4">Travel by Mood</h2>
                    <p className="text-(--gray-500) max-w-lg">Don't know where to go? Select your current vibe and let us curate the perfect escape for you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[600px]">
                    {moods.map((mood) => (
                        <div
                            key={mood.title}
                            className={`${mood.size} relative group overflow-hidden rounded-[2.5rem] cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700`}
                        >
                            {/* Background Image with Hover Zoom */}
                            <img
                                src={mood.image}
                                alt={mood.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity`} />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className={`w-14 h-14 ${mood.color} rounded-2xl flex items-center justify-center text-(--white) mb-6 transform group-hover:-translate-y-2 transition-transform duration-500`}>
                                    <mood.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-(--white) mb-2">{mood.title}</h3>
                                <p className="text-(--white)/70 text-sm max-w-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    {mood.desc}
                                </p>
                            </div>

                            {/* Interactive Border/Glow on Hover */}
                            <div className="absolute inset-0 border-2 border-(--white)/0 group-hover:border-(--white)/20 rounded-[2.5rem] transition-colors pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MoodSelector;
