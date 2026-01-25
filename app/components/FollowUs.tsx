"use client";
import React from 'react';
import { icons } from '@/assets/icons';
import { images } from '@/assets/images';

const FollowUs = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-(--white)">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-(--brand-purple)/5 skew-x-12 transform translate-x-32"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-10 relative">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Visual Side */}
                    <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
                        <div className="relative z-10">
                            <img
                                src={images.followImage}
                                alt="Travel Lifestyle"
                                className="rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(91,46,255,0.3)] w-full h-[500px] object-cover"
                            />

                        </div>
                        {/* Decorative Circles */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-(--brand-teal)/20 rounded-full blur-3xl"></div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">


                        <h2 className="text-5xl md:text-7xl font-black text-(--gray-900) leading-[0.9] mb-8 italic uppercase tracking-tighter">
                            NEVER MISS <br />
                            <span className="text-(--brand-purple)">THE BEST</span> <br />
                            TRAVEL DEALS!
                        </h2>

                        <p className="text-xl text-(--gray-500) font-medium mb-12 max-w-lg leading-relaxed">
                            Join 500k+ travelers getting exclusive error fares, secret hotel discounts, and last-minute gems.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a href="#" className="group flex items-center justify-between px-2 py-3 bg-(--gray-900) text-(--white) rounded-lg hover:bg-(--brand-purple) transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <icons.Instagram className="w-6 h-6" />
                                    <span className="font-black italic uppercase">Instagram</span>
                                </div>
                                <icons.Send className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="#" className="group flex items-center justify-between p-2 py-3 bg-(--white) border-2 border-(--gray-100) rounded-lg hover:border-(--brand-teal) transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <icons.Smartphone className="w-6 h-6 text-(--gray-900)" />
                                    <span className="font-black text-(--gray-900) italic uppercase">TikTok</span>
                                </div>
                                <icons.Globe className="w-5 h-5 text-(--gray-400) opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FollowUs;
