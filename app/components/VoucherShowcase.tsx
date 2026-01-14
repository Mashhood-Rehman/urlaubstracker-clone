'use client';

import React from 'react';

const vouchers = [
    { partner: 'Lufthansa', discount: '€50 Off', code: 'LUFT50' },
    { partner: 'Booking.com', discount: '15% Cashback', code: 'BOOK15' },
    { partner: 'Europcar', discount: '20% Discount', code: 'EURO20' },
    { partner: 'Expedia', discount: '€100 Coupon', code: 'EXP100' },
];

const VoucherShowcase = () => {
    return (
        <section className="py-20 bg-muted">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-12 text-center underline decoration-secondary decoration-4 underline-offset-8">
                    Exclusive Vouchers
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {vouchers.map((v) => (
                        <div
                            key={v.partner}
                            className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center justify-center transition-all hover:shadow-xl hover:-translate-y-2 group"
                        >
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
                                <span className="text-primary font-bold text-xs">{v.partner[0]}</span>
                            </div>
                            <h3 className="font-bold text-primary mb-1">{v.partner}</h3>
                            <p className="text-secondary font-bold text-lg mb-4">{v.discount}</p>
                            <div className="px-4 py-2 bg-muted rounded-lg text-primary font-mono text-sm border border-dashed border-primary/30">
                                {v.code}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VoucherShowcase;
