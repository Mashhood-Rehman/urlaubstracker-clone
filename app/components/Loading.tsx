"use client";

import React from 'react';
import { icons } from '@/assets/icons';

interface LoadingProps {
    variant?: 'page' | 'overlay' | 'inline' | 'container';
    text?: string;
    className?: string;
}

const Loading = ({ variant = 'inline', text, className = "" }: LoadingProps) => {
    const variants = {
        page: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white",
        overlay: "absolute inset-0 z-40 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]",
        container: "w-full py-12 flex flex-col items-center justify-center",
        inline: "flex items-center gap-2"
    };

    const spinnerSize = {
        page: 40,
        overlay: 32,
        container: 32,
        inline: 16
    };

    return (
        <div className={`${variants[variant]} ${className} h-screen`}>
            <div className="relative">
                <icons.Loader2
                    size={spinnerSize[variant]}
                    className="animate-spin text-[#5B2EFF]"
                />
                {(variant === 'page' || variant === 'overlay') && (
                    <div className="absolute inset-0 animate-pulse bg-[#5B2EFF]/20 rounded-full blur-xl"></div>
                )}
            </div>
            {text && (
                <p className={`mt-4 font-black uppercase tracking-[0.2em] italic text-[#5B2EFF] ${variant === 'inline' ? 'text-[9px]' : 'text-[10px]'
                    }`}>
                    {text}
                </p>
            )}
        </div>
    );
};

export default Loading;
