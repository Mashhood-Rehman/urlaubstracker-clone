'use client';

import React, { useEffect, useState } from 'react';
import { icons } from '@/assets/icons';
import Link from 'next/link';

interface Coupon {
    id: number;
    code: string;
    name: string;
    description: string | null;
    discountValue: number;
    isShowcased: boolean;
    brand?: {
        id: number;
        name: string;
        image: string | null;
    } | null;
}

const VoucherShowcase = () => {
    const [vouchers, setVouchers] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                // The backend already includes the brand relation by default in findMany
                const response = await fetch('/api/coupons?showcased=true');
                const data = await response.json();
                setVouchers(data.coupons || []);
            } catch (error) {
                console.error('Failed to fetch vouchers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVouchers();
    }, []);

    return (
        <section className="py-20 bg-(--muted)">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-(--primary) mb-12 text-center underline decoration-(--secondary) decoration-4 underline-offset-8">
                    Exclusive Vouchers
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <icons.Loader className="w-8 h-8 animate-spin text-(--primary)" />
                    </div>
                ) : vouchers.length === 0 ? (
                    <div className="text-center text-(--gray-500) py-12">
                        No exclusive vouchers available at the moment.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {vouchers.map((v) => (
                            <Link
                                href={`/brands/${v.brand?.id || '#'}`}
                                key={v.id}
                                className="bg-(--white) p-8 rounded-2xl border border-(--gray-100) flex flex-col items-center justify-center transition-all hover:shadow-xl hover:-translate-y-2 group text-center"
                            >
                                <div className="w-20 h-20 bg-(--muted) rounded-2xl flex items-center justify-center mb-4 group-hover:bg-(--secondary)/10 transition-colors overflow-hidden border border-(--gray-50)">
                                    {v.brand?.image ? (
                                        <img src={v.brand.image} alt={v.brand.name} className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <span className="text-(--primary) font-bold text-xl">{(v.brand?.name || v.name)[0]}</span>
                                    )}
                                </div>
                                <h3 className="font-bold text-(--gray-900) mb-1 line-clamp-1">{v.brand?.name || v.name}</h3>
                                <p className="text-(--secondary) font-bold text-lg mb-4">
                                    {v.discountValue}% {v.discountValue > 0 ? 'Off' : ''}
                                </p>
                                <div className="px-4 py-2 bg-(--muted) rounded-lg text-(--primary) font-mono text-sm border border-dashed border-(--primary)/30 mb-4">
                                    {v.code}
                                </div>
                                <div className="flex items-center gap-1 text-xs font-semibold text-(--primary) opacity-0 group-hover:opacity-100 transition-opacity">
                                    View Brand <icons.ArrowRight className="w-3 h-3" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default VoucherShowcase;
