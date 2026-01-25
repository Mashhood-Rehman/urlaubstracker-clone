'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { icons } from '@/assets/icons';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Coupon {
    id: number;
    code: string;
    description: string | null;
    discountValue: number;
    validUntil: string;
}

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    currency: string;
    images: string[];
    link: string | null;
    mainCategory: string;
    coupons: Coupon[];
    details?: any;
}

export default function DynamicProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [copiedId, setCopiedId] = useState<number | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                if (data.success) {
                    setProduct(data.data);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();
    }, [id]);

    const copyToClipboard = (text: string, couponId: number) => {
        navigator.clipboard.writeText(text);
        setCopiedId(couponId);
        toast.success('Coupon code copied!');
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <icons.Loader2 className="w-10 h-10 animate-spin text-[#5B2EFF]" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <h1 className="text-2xl font-black text-gray-900 mb-4 uppercase italic">Product Not Found</h1>
                <Link href="/" className="text-[#5B2EFF] font-bold hover:underline">Return to Home</Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
                    <Link href="/" className="hover:text-[#5B2EFF] transition-colors">Home</Link>
                    <icons.ChevronRight size={10} />
                    <span className="text-[#5B2EFF]">{product.mainCategory}</span>
                    <icons.ChevronRight size={10} />
                    <span className="text-slate-900 truncate max-w-[200px]">{product.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Gallery */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-white shadow-2xl border border-white">
                            {product.images.length > 0 ? (
                                <img
                                    src={product.images[activeImage]}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                                    <icons.ImageIcon size={48} />
                                    <span className="mt-2 font-bold uppercase tracking-widest text-xs">No Images Available</span>
                                </div>
                            )}
                            <div className="absolute top-6 left-6">
                                <div className="bg-[#5EEAD4] text-[#5B2EFF] px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">
                                    {product.mainCategory}
                                </div>
                            </div>
                        </div>

                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-[#5B2EFF] scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Info */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100">
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-6 italic">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-2 text-[#5B2EFF] font-black text-[11px] uppercase tracking-[0.2em] mb-8">
                                <icons.Tag size={14} />
                                Exclusive Offer
                            </div>

                            <div className="prose prose-slate max-w-none mb-10">
                                <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">
                                    {product.description}
                                </p>
                            </div>

                            <div className="flex flex-col gap-6 pt-8 border-t border-slate-50">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Starting From</div>
                                        <div className="text-4xl font-black text-[#5B2EFF] italic">
                                            {product.currency} {product.price}
                                        </div>
                                    </div>
                                    {product.link && (
                                        <a
                                            href={product.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-10 py-5 bg-[#111827] text-white font-black italic uppercase rounded-2xl hover:bg-[#5B2EFF] transition-all flex items-center gap-2 shadow-lg hover:shadow-[#5B2EFF]/20"
                                        >
                                            View Website
                                            <icons.ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Coupons Section */}
                        {product.coupons && product.coupons.length > 0 && (
                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                    <span className="w-6 h-[2px] bg-[#5EEAD4]"></span> Available Discounts
                                </h3>
                                <div className="space-y-4">
                                    {product.coupons.map((coupon) => (
                                        <div key={coupon.id} className="group relative bg-[#F8FAFC] border border-slate-100 rounded-2xl p-5 hover:border-[#5B2EFF]/30 transition-all">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="text-[#5B2EFF] text-xl font-black italic">{coupon.discountValue}% OFF</div>
                                                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mt-1">{coupon.description || 'Verified Discount'}</div>
                                                </div>
                                                <div className="bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Valid Until: {new Date(coupon.validUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-white border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-between group-hover:bg-slate-50 transition-colors">
                                                    <code className="text-sm font-black text-slate-900 tracking-wider">
                                                        {coupon.code}
                                                    </code>
                                                    <button
                                                        onClick={() => copyToClipboard(coupon.code, coupon.id)}
                                                        className="text-[#5B2EFF] hover:text-slate-900 transition-colors cursor-pointer"
                                                    >
                                                        {copiedId === coupon.id ? <icons.Check size={18} /> : <icons.Copy size={18} />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Summary Info */}
                        <div className="bg-gradient-to-br from-[#111827] to-[#1E293B] rounded-3xl p-8 text-white shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-[#5EEAD4]/20 flex items-center justify-center text-[#5EEAD4]">
                                    <icons.Info size={20} />
                                </div>
                                <h3 className="font-black italic uppercase tracking-tighter">Booking Information</h3>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed mb-0">
                                This offer is provided by our partner website. Clicking "View Website" will redirect you to the official landing page where you can complete your booking and apply the coupon codes listed above.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
