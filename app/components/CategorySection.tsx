'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { icons } from '@/assets/icons';
import { LucideIcon } from 'lucide-react';

interface Category {
    id: string | number;
    name: string;
    slug: string;
    type: 'static' | 'dynamic';
}

const CategorySection = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                if (data.success) {
                    setCategories(data.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const getIcon = (slug: string) => {
        switch (slug.toLowerCase()) {
            case 'hotel':
                return icons.Hotel;
            case 'flight':
                return icons.Plane;
            case 'rental':
                return icons.Car;
            default:
                return icons.Globe;
        }
    };

    if (loading) {
        return (
            <div className="py-12 flex justify-center items-center">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-24">
                <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
                    <h3 className="text-secondary/60 font-black text-xs uppercase tracking-[0.2em]">Explore Categories</h3>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a5f5f] tracking-tight">
                        What are you looking for?
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {categories.map((category) => {
                        const Icon = getIcon(category.slug);
                        return (
                            <Link
                                key={category.id}
                                href={`/search?category=${category.slug}`}
                                className="group relative bg-slate-50 border border-slate-100 rounded-2xl p-6 transition-all duration-300 hover:bg-white hover:border-secondary/20 hover:shadow-2xl hover:shadow-secondary/10 hover:-translate-y-1 flex flex-col items-center justify-center text-center overflow-hidden"
                            >
                                {/* Decorative Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-br from-secondary/0 to-secondary/0 group-hover:from-secondary/[0.03] group-hover:to-transparent transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

                                <div className="relative z-10 w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:border-secondary/30 group-hover:shadow-secondary/10">
                                    <Icon className="w-6 h-6 text-[#1a5f5f] transition-colors duration-300 group-hover:text-secondary" />
                                </div>
                                <span className="relative z-10 font-bold text-slate-700 text-sm tracking-tight transition-colors duration-300 group-hover:text-[#1a5f5f]">
                                    {category.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
