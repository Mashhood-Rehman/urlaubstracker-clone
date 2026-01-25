'use client';

import React, { useState, useEffect } from 'react';
import { icons } from '@/assets/icons';
import { images } from '@/assets/images';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    const isLandingPage = pathname === '/';
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                if (data.success) {
                    setCategories(data.data);
                }
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/session');
                const data = await res.json();
                setIsAuthenticated(data.isAuthenticated);
            } catch (err) {
                console.error('Session check failed:', err);
            }
        };
        checkAuth();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        const res = await fetch('/api/auth/logout', { method: 'POST' });
        if (res.ok) {
            window.location.href = '/';
        }
    };


    const navLinks = [
        { name: 'Travel Deals', href: '/travel-deals' },
        { name: 'Destinations', href: '/destinations' },
        { name: 'Vouchers', href: '#' },
        { name: 'Travel Planning', href: '#' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${!isLandingPage || isScrolled
                ? 'bg-(--white) shadow-md py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-(--secondary) rounded-lg flex items-center justify-center">
                        <span className="text-(--white) font-bold text-xl">UT</span>
                    </div>
                    <span
                        className={`font-bold text-xl hidden md:block ${(!isLandingPage || isScrolled) ? 'text-(--primary)' : 'text-(--white)'
                            }`}
                    >
                        Urlaubstracker
                    </span>

                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group">
                            {link.name === 'Vouchers' ? (
                                <>
                                    <button
                                        className={`font-medium hover:text-(--secondary) transition-colors flex items-center gap-1 ${(!isLandingPage || isScrolled) ? 'text-(--primary)' : 'text-(--white)'
                                            }`}
                                    >
                                        Vouchers
                                        <icons.ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                    </button>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                        <div className="bg-(--white) rounded-xl shadow-xl border border-(--gray-100) p-2 min-w-[200px]">
                                            <Link
                                                href="/vouchers"
                                                className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-(--gray-700) hover:bg-(--primary)/5 hover:text-(--primary) transition-colors"
                                            >
                                                <icons.Ticket className="w-4 h-4" />
                                                All Vouchers
                                            </Link>
                                            <div className="my-1 border-t border-(--gray-100)"></div>
                                            {categories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={`/vouchers?category=${cat.slug}`}
                                                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-(--gray-700) hover:bg-(--primary)/5 hover:text-(--primary) transition-colors"
                                                >
                                                    <span className="capitalize">{cat.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={link.href}
                                    className={`font-medium hover:text-(--secondary) transition-colors ${(!isLandingPage || isScrolled) ? 'text-(--primary)' : 'text-(--white)'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full border ${(!isLandingPage || isScrolled)
                        ? 'border-(--gray-200) text-(--primary)'
                        : 'border-(--white)/30 text-(--white)'}white'
                        }`}>
                        <icons.Search className="w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm placeholder:text-inherit"
                        />
                    </div>

                    <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? (
                            <icons.X className={(!isLandingPage || isScrolled) ? 'text-(--primary)' : 'text-(--white)'
                            } />
                        ) : (
                            <icons.Menu className={(!isLandingPage || isScrolled) ? 'text-(--primary)' : 'text-(--white)'} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-(--white) absolute top-full left-0 right-0 shadow-xl border-t animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col p-4 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-(--primary) font-medium border-b border-(--gray-100) pb-2"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/admin"
                                    className="text-primary font-medium border-b border-gray-100 pb-2 flex items-center gap-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <icons.LayoutDashboard className="w-4 h-4" />
                                    Admin Panel
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 font-bold pt-2 flex items-center gap-2 text-left"
                                >
                                    <icons.LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="text-secondary font-bold pt-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                        )}

                    </div>
                </div>
            )}
        </nav>
    );
};


export default Navbar;
