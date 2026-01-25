'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { icons } from '@/assets/icons';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';

interface Coupon {
    id: number;
    code: string;
    name: string;
    description: string | null;
    discountValue: number;
    validFrom: string;
    validUntil: string;
    brand?: {
        name: string;
        images: string[];
    };
    hotels: any[];
    flights: any[];
    rentals: any[];
}

function VouchersContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                setLoading(true);
                const url = category ? `/api/coupons?category=${category}` : '/api/coupons';
                const res = await fetch(url);
                const data = await res.json();
                if (data.coupons) {
                    setCoupons(data.coupons);
                }
            } catch (error) {
                console.error('Error fetching vouchers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchVouchers();
    }, [category]);

    const copyText = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success('Code copied to clipboard');
    }
    if (loading) return <div className='flex items-center justify-center'>
        <Loading variant="container" text="Loading exclusive vouchers..." className='mt-12' />;
    </div>

    return (
        <div className="min-h-screen bg-(--background) pt-24 pb-12">
            <div className="container mx-auto px-4">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-(--primary) mb-2 capitalize">
                        {category ? `${category} Vouchers` : 'All Vouchers'}
                    </h1>
                    <p className="text-(--gray-600) font-medium">Save more on your next trip with these exclusive discount codes.</p>
                </header>

                {coupons.length === 0 ? (
                    <div className="text-center py-20 bg-(--white) rounded-2xl border border-(--gray-100) shadow-sm">
                        <icons.Ticket className="w-16 h-16 text-(--gray-300) mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-(--gray-900)">No vouchers found</h3>
                        <p className="text-(--gray-500)">We're currently negotiating new deals. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coupons.map((coupon) => (
                            <div
                                key={coupon.id}
                                className="bg-(--white) rounded-2xl overflow-hidden border-2 border-dashed border-(--gray-200) hover:border-(--primary)/30 transition-all duration-300 flex flex-col relative"
                            >
                                <div className="p-6 flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-(--gray-50) border border-(--gray-100) shrink-0">
                                        {coupon.brand?.images?.[0] ? (
                                            <img src={coupon.brand.images[0]} alt={coupon.brand.name} className="w-full h-full object-contain" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-(--primary)">
                                                <icons.Ticket className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-(--gray-900) leading-tight mb-1">
                                            {coupon.name}
                                        </h3>
                                        <p className="text-sm text-(--gray-500) line-clamp-1 italic">
                                            {coupon.brand?.name || 'Urlaubstracker Exclusive'}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-(--primary)">
                                            {coupon.discountValue}%
                                        </div>
                                        <div className="text-[10px] font-bold text-(--gray-400) uppercase tracking-tighter">
                                            Discount
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 pb-6 mt-auto">
                                    <div className="bg-(--gray-50) rounded-xl p-3 flex items-center justify-between group cursor-pointer border border-(--gray-100) hover:border-(--primary)/20 hover:bg-(--white) transition-all">
                                        <code className="text-lg font-black text-(--secondary) tracking-widest uppercase">
                                            {coupon.code}
                                        </code>
                                        <button onClick={() => copyText(coupon.code)} className="text-xs cursor-pointer font-bold text-(--primary) bg-(--white) px-3 py-1 rounded-lg border border-(--primary)/10 shadow-sm group-hover:bg-(--primary) group-hover:text-(--white) transition-all">
                                            Copy Code
                                        </button>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-(--gray-400) uppercase tracking-widest">
                                        <span>Expires: {new Date(coupon.validUntil).toLocaleDateString()}</span>
                                        <span className="text-(--success)">✓ Verified</span>
                                    </div>
                                </div>

                                {/* Decorative Cutouts */}
                                <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 bg-(--background) rounded-full border-r border-(--gray-200)"></div>
                                <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-(--background) rounded-full border-l border-(--gray-200)"></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function VouchersPage() {
    return (
        <Suspense fallback={<Loading variant="container" text="Loading vouchers..." />}>
            <VouchersContent />
        </Suspense>
    );
}
