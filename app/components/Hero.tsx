'use client';

import React from 'react';
import { icons } from '@/assets/icons';
import { images } from '@/assets/images';
import BookingEngine from './BookingEngine';


const Hero = () => {

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${images.heroBg})` }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-(--primary)/60 via-(--primary)/30 to-(--primary)/80"></div>
            </div>

            {/* Hero Content */}
            <div className="container mx-auto px-4 relative z-10 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-(--white) mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    Find real <span className="text-(--secondary)">travel deals.</span>
                </h1>
                <p className="text-lg md:text-xl text-(--white)/90 mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-700 delay-100">
                    We search the internet daily to find the best travel deals for you.
                </p>

                {/* Booking Engine */}
                <BookingEngine />
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-(--white) to-transparent pointer-events-none"></div>
        </section>
    );
};

export default Hero;
