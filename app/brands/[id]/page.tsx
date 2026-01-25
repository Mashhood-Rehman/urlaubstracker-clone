'use client';

import React, { useEffect, useState } from 'react';
import { icons } from '@/assets/icons';
import { useParams } from 'next/navigation';
import Loading from '../../components/Loading';

interface Coupon {
    id: number;
    code: string;
    name: string;
    description: string | null;
    discountValue: number;
}

interface Brand {
    id: number;
    name: string;
    websiteLink: string | null;
    images: string[];
    description: string | null;
    coupons: Coupon[];
}

export default function BrandDetailPage() {
    const params = useParams();
    const [brand, setBrand] = useState<Brand | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await fetch(`/api/brands/${params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBrand(data);
                }
            } catch (error) {
                console.error('Failed to fetch brand:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) fetchBrand();
    }, [params.id]);


    // ... inside the component
    if (loading) {
        return <Loading variant="page" text="Gathering brand info..." />;
    }

    if (!brand) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">
                Brand not found.
            </div>
        );
    }

    return (
        <main className="bg-gray-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {brand.images && brand.images.length > 0 ? (
                            brand.images.map((img, idx) => (
                                <div key={idx} className="w-32 h-32 bg-gray-50 rounded-2xl border flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <img src={img} alt={`${brand.name} ${idx + 1}`} className="w-full h-full object-contain p-4" />
                                </div>
                            ))
                        ) : (
                            <div className="w-32 h-32 bg-gray-50 rounded-2xl border flex items-center justify-center">
                                <span className="text-4xl font-bold text-gray-300">{brand.name[0]}</span>
                            </div>
                        )}
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{brand.name}</h1>
                    {brand.websiteLink && (
                        <a
                            href={brand.websiteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-2 mb-6"
                        >
                            <icons.ExternalLink className="w-4 h-4" />
                            Visit Official Website
                        </a>
                    )}
                    <div className="max-w-2xl text-gray-600 leading-relaxed">
                        {brand.description || "Expert curated deals and exclusive vouchers for your journey."}
                    </div>
                </div>
            </div>

            {/* Coupons Grid */}
            <div className="container mx-auto px-4 mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-blue-600 pl-4">
                    Active Coupons for {brand.name}
                </h2>

                {brand.coupons.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl text-center border text-gray-500">
                        No active coupons available for this brand right now.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {brand.coupons.map((coupon) => (
                            <div key={coupon.id} className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all">
                                <div className="text-3xl font-bold text-blue-600 mb-2">{coupon.discountValue}% OFF</div>
                                <h3 className="font-bold text-gray-900 mb-4">{coupon.name}</h3>
                                <div className="w-full h-px bg-gray-100 mb-6"></div>
                                <div className="bg-gray-50 px-6 py-3 rounded-xl border border-dashed border-blue-200 font-mono text-xl text-blue-700 tracking-wider">
                                    {coupon.code}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
