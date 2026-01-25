'use client';

import { useState } from 'react';
import Link from 'next/link';
import { icons } from '@/assets/icons';
import toast from 'react-hot-toast';

interface HotelDetailClientProps {
    hotel: any;
    coupons: any[];
}

export default function HotelDetailClient({ hotel, coupons }: HotelDetailClientProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [copiedCouponId, setCopiedCouponId] = useState<number | null>(null);

    const copyToClipboard = (code: string, couponId: number) => {
        navigator.clipboard.writeText(code);
        setCopiedCouponId(couponId);
        toast.success(`Copied: ${code}`);
        setTimeout(() => setCopiedCouponId(null), 2000);
    };

    const nextImage = () => {
        if (hotel?.images) {
            setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
        }
    };

    const prevImage = () => {
        if (hotel?.images) {
            setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
        }
    };

    return (
        <main className="min-h-screen bg-(--gray-50)">
            {/* Header */}
            <div className="bg-(--white) border-b sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-(--gray-100) rounded-lg transition-colors">
                        <icons.ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-(--gray-900)">{hotel.title_fr || hotel.title}</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative group">
                                {hotel.images && hotel.images.length > 0 ? (
                                    <div className="relative aspect-video bg-(--gray-200) rounded-xl overflow-hidden">
                                        <img
                                            src={hotel.images[currentImageIndex]}
                                            alt={`${hotel.title_fr || hotel.title} - Image ${currentImageIndex + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        {hotel.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-(--white)/80 hover:bg-(--white) p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <icons.ChevronLeft className="w-6 h-6 text-(--gray-900)" />
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-(--white)/80 hover:bg-(--white) p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <icons.ChevronRight className="w-6 h-6 text-(--gray-900)" />
                                                </button>
                                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-(--black)/50 text-(--white) px-3 py-1 rounded-full text-sm">
                                                    {currentImageIndex + 1} / {hotel.images.length}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="aspect-video bg-linear-to-br from-(--gray-100) to-(--gray-200) rounded-xl flex items-center justify-center">
                                        <icons.Hotel className="w-16 h-16 text-(--gray-400) opacity-30" />
                                    </div>
                                )}
                            </div>

                            {/* Image Thumbnails */}
                            {hotel.images && hotel.images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {hotel.images.map((image: string, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${idx === currentImageIndex
                                                ? 'border-(--primary)'
                                                : 'border-(--gray-200) opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`Thumbnail ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Hotel Info */}
                        <div className="bg-(--white) rounded-xl p-6 space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold text-(--gray-900) mb-2">
                                    {hotel.title_fr || hotel.title}
                                </h2>
                                <div className="flex items-center gap-4 text-sm text-(--gray-600) flex-wrap">
                                    <span className="flex items-center gap-1">
                                        <icons.MapPin className="w-4 h-4" />
                                        {hotel.address}, {hotel.city}, {hotel.country}
                                    </span>
                                    {hotel.rating && (
                                        <span className="flex items-center gap-1">
                                            <span className="text-(--accent)">★</span>
                                            {hotel.rating}
                                            {hotel.review_count && <span>({hotel.review_count} reviews)</span>}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {hotel.desc_fr && (
                            <div className="bg-(--white) rounded-xl p-6">
                                <h3 className="text-lg font-bold text-(--gray-900) mb-3">About</h3>
                                <p className="text-(--gray-700) leading-relaxed whitespace-pre-wrap">
                                    {hotel.desc_fr}
                                </p>
                            </div>
                        )}

                        {/* Amenities */}
                        {hotel.amenities && hotel.amenities.length > 0 && (
                            <div className="bg-(--white) rounded-xl p-6">
                                <h3 className="text-lg font-bold text-(--gray-900) mb-4">Amenities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {hotel.amenities.map((amenity: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2 text-(--gray-700)">
                                            <div className="w-2 h-2 bg-(--primary) rounded-full"></div>
                                            {amenity}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Check-in/out */}
                        <div className="bg-(--white) rounded-xl p-6 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-(--gray-600) mb-1">Check-in</p>
                                <p className="text-lg font-bold text-(--gray-900)">{hotel.check_in || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-(--gray-600) mb-1">Check-out</p>
                                <p className="text-lg font-bold text-(--gray-900)">{hotel.check_out || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Pricing and Coupons */}
                    <div className="space-y-6">
                        {/* Price Card */}
                        <div className="bg-(--white) rounded-xl p-6 top-24">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-(--gray-600) mb-1">Price per night</p>
                                    <p className="text-3xl font-bold text-(--primary)">
                                        {hotel.currency} {hotel.price_per_night.toFixed(2)}
                                    </p>
                                </div>

                                {hotel.total_price && (
                                    <div>
                                        <p className="text-sm text-(--gray-600) mb-1">Total price</p>
                                        <p className="text-2xl font-bold text-(--gray-900)">
                                            {hotel.currency} {hotel.total_price.toFixed(2)}
                                        </p>
                                    </div>
                                )}

                                {hotel.link ? (
                                    <a
                                        href={hotel.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-(--primary) text-(--white) py-3 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                    >
                                        Book Now
                                        <icons.ChevronRight className="w-5 h-5" />
                                    </a>
                                ) : (
                                    <button className="w-full bg-(--primary) text-(--white) py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
                                        Book Now
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Coupons */}
                        {coupons.length > 0 && (
                            <div className="bg-(--white) rounded-xl p-6 space-y-4">
                                <h3 className="text-lg font-bold text-(--gray-900) flex items-center gap-2">
                                    <icons.Gift className="w-5 h-5 text-(--primary)" />
                                    Available Deals
                                </h3>

                                <div className="space-y-3">
                                    {coupons.map((coupon) => (
                                        <div
                                            key={coupon.id}
                                            className="border border-(--primary)/20 bg-(--primary)/5 rounded-lg p-3 space-y-2"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-bold text-(--gray-900)">{coupon.name}</p>
                                                    <p className="text-sm text-(--gray-600)">
                                                        {coupon.discountValue}% Off
                                                    </p>
                                                </div>
                                            </div>

                                            {coupon.description && (
                                                <p className="text-xs text-(--gray-600)">{coupon.description}</p>
                                            )}

                                            <div className="flex items-center gap-2 pt-2 border-t border-(--primary)/10">
                                                <code className="flex-1 text-sm font-mono bg-(--gray-50) px-2 py-1 rounded text-(--gray-900)">
                                                    {coupon.code}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(coupon.code, coupon.id)}
                                                    className={`p-2 rounded transition-all ${copiedCouponId === coupon.id
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-(--gray-100) text-(--gray-700) hover:bg-(--gray-200)'
                                                        }`}
                                                    title="Copy coupon code"
                                                >
                                                    {copiedCouponId === coupon.id ? (
                                                        <icons.Check className="w-4 h-4" />
                                                    ) : (
                                                        <icons.Copy className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>

                                            {coupon.validFrom && coupon.validUntil && (
                                                <p className="text-xs text-(--gray-500)">
                                                    Valid until {new Date(coupon.validUntil).toLocaleDateString('en-US')}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
