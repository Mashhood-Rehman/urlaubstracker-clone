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
                    // Fetch up to 9 products for a 3x3 grid
                    setProducts(productsData.data.slice(0, 9));
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
            <div className="flex justify-center items-center h-[400px]">
                <Loader className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="mb-8 flex flex-col gap-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1a5f5f]">Latest Travel Deals</h2>
                    <p className="text-gray-500 text-sm max-w-lg">Handpicked offers for your next unforgettable journey.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Products Grid (3 columns) */}
                    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={getLink(product)}
                                className="flex flex-col items-center text-center group hover:bg-gray-50  rounded-lg transition-all border border-transparent hover:border-gray-100"
                            >
                                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm mb-4">
                                    <img
                                        src={product.images[0] || 'https://images.unsplash.com/photo-1506929113670-07bf3b4ae5f1?auto=format&fit=crop&q=80'}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-secondary/60 font-bold text-[9px] uppercase tracking-widest mb-1 block">
                                        {product.mainCategory}
                                    </span>
                                    <h4 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2 italic h-10">
                                        {product.title}
                                    </h4>
                                    <div className="text-primary text-xs font-semibold mt-2">
                                        from <span className="font-bold">€{product.price || product.price_per_night || '---'}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* Placeholder slots if less than 9 products to maintain 3x3 structure if desired,
                            but standard grid will just show what's there. */}
                    </div>

                    {/* Side Column (1 column) */}
                    <div className="flex flex-col gap-8">
                        {/* Blog Box */}
                        <div className="bg-white rounded-lg p-5 flex flex-col border border-gray-100 shadow-sm">
                            <h4 className="text-lg font-bold text-[#1a5f5f] mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 bg-secondary rounded-full"></span>
                                Latest Blogs
                            </h4>
                            <div className="space-y-4">
                                {blogs.map((blog) => (
                                    <Link
                                        key={blog.id}
                                        href={`/blogs/${blog.slug}`}
                                        className="flex items-center gap-3 group cursor-pointer"
                                    >
                                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-50 shadow-xs">
                                            <img src={blog.mainImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h5 className="font-bold text-gray-800 text-xs leading-tight group-hover:text-secondary transition-colors line-clamp-2 italic">
                                                {blog.title}
                                            </h5>
                                        </div>
                                        <ArrowRight className="w-3 h-3 text-gray-100 group-hover:text-secondary translate-x-0 group-hover:translate-x-0.5 transition-all" />
                                    </Link>
                                ))}
                            </div>
                            <Link href="/blogs" className="mt-5 pt-4 border-t border-gray-50 text-[10px] font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors flex items-center gap-1 group">
                                View all stories <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        {/* Extra Space for Ads (Empty as requested) */}
                        <div className="flex-1 min-h-[200px]">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealsGrid;
