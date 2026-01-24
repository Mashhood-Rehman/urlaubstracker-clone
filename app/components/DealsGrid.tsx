'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader, ArrowRight } from 'lucide-react';

interface Product {
    id: number;
    title: string;
    description?: string;
    price?: number;
    price_per_night?: number;
    mainCategory: string;
    images: string[];
    slug?: string;
}

interface Blog {
    id: number;
    title: string;
    slug: string;
    mainImage: string;
}

const DealsGrid = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, blogsRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/blogs?published=true')
                ]);

                const productsData = await productsRes.json();
                const blogsData = await blogsRes.json();

                if (productsData.success) {
                    setProducts(productsData.data.slice(0, 3));
                }
                setBlogs(Array.isArray(blogsData) ? blogsData.slice(0, 3) : []);
            } catch (error) {
                console.error('Error fetching landing data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getLink = (product: Product) => {
        const cat = product.mainCategory.toLowerCase();
        if (cat === 'hotel') return `/hotels/${product.id}`;
        if (cat === 'flight') return `/flights/${product.id}`;
        if (cat === 'rental') return `/rentals/${product.id}`;
        return `/products/${product.id}`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[600px]">
                <Loader className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 text-[#1a5f5f]">Latest Travel Deals</h2>
                        <p className="text-gray-500 max-w-lg">Handpicked offers for your next unforgettable journey.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Product List Section (Left) */}
                    <div className="md:col-span-8 flex flex-col gap-6">
                        <div className="bg-gray-50/50 rounded-lg p-6 border border-gray-100 flex flex-col gap-6">
                            {products.map((product) => (
                                <Link
                                    key={product.id}
                                    href={getLink(product)}
                                    className="flex items-center gap-6 group hover:bg-white p-4 rounded-lg transition-all border border-transparent hover:border-gray-100 hover:shadow-sm"
                                >
                                    <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
                                        <img
                                            src={product.images[0] || 'https://images.unsplash.com/photo-1506929113670-07bf3b4ae5f1?auto=format&fit=crop&q=80'}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-secondary/60 font-bold text-[10px] uppercase tracking-widest mb-1 block">
                                            {product.mainCategory}
                                        </span>
                                        <h4 className="text-lg font-bold text-gray-900 leading-tight truncate">
                                            {product.title}
                                        </h4>
                                        <div className="text-primary text-sm font-semibold mt-1">
                                            from <span className="font-bold">€{product.price || product.price_per_night || '---'}</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-secondary group-hover:translate-x-1 transition-all mr-2" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Side Column (Right) */}
                    <div className="md:col-span-4 flex flex-col gap-8">
                        {/* Blog Box */}
                        <div className="bg-white rounded-lg p-6 flex-1 flex flex-col border border-gray-100 shadow-sm relative">
                            <h4 className="text-xl font-bold text-[#1a5f5f] mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                                Latest Blogs
                            </h4>
                            <div className="space-y-5">
                                {blogs.map((blog) => (
                                    <Link
                                        key={blog.id}
                                        href={`/blogs/${blog.slug}`}
                                        className="flex items-center gap-4 group cursor-pointer"
                                    >
                                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-50">
                                            <img src={blog.mainImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="font-bold text-gray-800 text-sm leading-tight group-hover:text-secondary transition-colors line-clamp-2 italic">
                                                {blog.title}
                                            </h5>
                                        </div>
                                        <ArrowRight className="w-3 h-3 text-gray-200 group-hover:text-secondary" />
                                    </Link>
                                ))}
                            </div>
                            <Link href="/blogs" className="mt-6 pt-6 border-t border-gray-50 text-xs font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors flex items-center gap-1 group">
                                View all stories <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        {/* Ad Space (Placeholders) */}
                        <div className="h-64 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm font-medium">
                            Ad Banner Space
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealsGrid;
