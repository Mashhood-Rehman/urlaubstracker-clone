'use client';

import React from 'react';
import { images } from '@/assets/images';

const deals = [
    {
        title: 'Luxury Maldives Getaway',
        price: '1,299',
        category: 'Resort',
        image: images.deal1,
        size: 'large'
    },
    {
        title: 'City Break in Prague',
        price: '249',
        category: 'City Trip',
        image: images.deal2,
        size: 'small'
    },
    {
        title: 'Alpine Hiking Adventure',
        price: '450',
        category: 'Active',
        image: images.deal3,
        size: 'small'
    },
    {
        title: 'Greek Island Hopping',
        price: '899',
        category: 'Cruise',
        image: images.deal4,
        size: 'medium'
    }
];

const DealsGrid = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Latest Travel Deals</h2>
                        <p className="text-gray-500 max-w-lg">Handpicked offers for your next unforgettable journey.</p>
                    </div>
                    <button className="btn btn-blue hidden md:flex">
                        View All Deals
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
                    {/* Asymmetrical Grid Logic */}
                    <div className="md:col-span-8 relative overflow-hidden rounded-3xl group h-96 md:h-full">
                        <img
                            src={deals[0].image}
                            alt={deals[0].title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent flex flex-col justify-end p-8">
                            <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-2">{deals[0].category}</span>
                            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">{deals[0].title}</h3>
                            <div className="flex items-center justify-between">
                                <span className="text-white text-xl">from <span className="text-3xl font-bold">€{deals[0].price}</span></span>
                                <button className="btn btn-orange">Check Deal</button>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-4 grid grid-rows-2 gap-6 h-full">
                        <div className="relative overflow-hidden rounded-3xl group h-64 md:h-full">
                            <img
                                src={deals[1].image}
                                alt={deals[1].title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent flex flex-col justify-end p-6">
                                <span className="text-secondary font-bold text-xs uppercase mb-1">{deals[1].category}</span>
                                <h4 className="text-lg font-bold text-white mb-2">{deals[1].title}</h4>
                                <span className="text-white font-bold">from €{deals[1].price}</span>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl group h-64 md:h-full">
                            <img
                                src={deals[2].image}
                                alt={deals[2].title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent flex flex-col justify-end p-6">
                                <span className="text-secondary font-bold text-xs uppercase mb-1">{deals[2].category}</span>
                                <h4 className="text-lg font-bold text-white mb-2">{deals[2].title}</h4>
                                <span className="text-white font-bold">from €{deals[2].price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealsGrid;
