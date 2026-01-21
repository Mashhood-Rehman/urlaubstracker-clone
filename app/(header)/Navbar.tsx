'use client';

import React, { useState, useEffect } from 'react';
import { icons } from '@/assets/icons';
import { images } from '@/assets/images';
import Link from 'next/link';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    const isLandingPage = pathname === '/';
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
        { name: 'Travel Deals', href: '#' },
        { name: 'Destinations', href: '#' },
        { name: 'Vouchers', href: '#' },
        { name: 'Travel Planning', href: '#' },
        { name: 'Credit Cards', href: '#' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${!isLandingPage || isScrolled
                ? 'bg-white shadow-md py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">UT</span>
                    </div>
                    <span
                        className={`font-bold text-xl hidden md:block ${(!isLandingPage || isScrolled) ? 'text-primary' : 'text-white'
                            }`}
                    >
                        Urlaubstracker
                    </span>

                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`font-medium hover:text-secondary transition-colors ${(!isLandingPage || isScrolled) ? 'text-primary' : 'text-white'
                                }`}
                        >
                            {link.name}
                            <icons.ChevronDown className="inline-block ml-1 w-4 h-4" />
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full border ${(!isLandingPage || isScrolled)
                        ? 'border-gray-200 text-primary'
                        : 'border-white/30 text-white'}white'
                        }`}>
                        <icons.Search className="w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm placeholder:text-inherit"
                        />
                    </div>

                    {isAuthenticated ? (
                        <div className="relative">
                            <button
                                onMouseEnter={() => setIsUserMenuOpen(true)}
                                onMouseLeave={() => setIsUserMenuOpen(false)}
                                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${(!isLandingPage || isScrolled)
                                    ? 'border-gray-200 text-primary'
                                    : 'border-white/30 text-white'}white hover:bg-white/10'
                                    }`}
                            >
                                <User className="w-5 h-5" />
                            </button>

                            {/* User Tooltip Menu */}
                            <div
                                onMouseEnter={() => setIsUserMenuOpen(true)}
                                onMouseLeave={() => setIsUserMenuOpen(false)}
                                className={`absolute right-0 top-full pt-2 transition-all duration-200 ${isUserMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                    }`}
                            >
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[200px]">
                                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 text-left">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin Account</p>
                                        <p className="text-sm font-medium text-primary truncate">admin@gmail.com</p>
                                    </div>
                                    <div className="p-1">
                                        <Link
                                            href="/admin"
                                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer"
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                            Admin Panel
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link
                            href="/auth/login"
                            className={`hidden md:block px-6 py-2 rounded-full font-medium transition-all ${(!isLandingPage || isScrolled)
                                ? 'bg-primary text-white hover:bg-primary/90'
                                : 'bg-white text-primary hover:bg-white/90'
                                }`}
                        >
                            Login
                        </Link>
                    )}


                    <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? (
                            <icons.X className={(!isLandingPage || isScrolled) ? 'text-primary' : 'text-white'
                            } />
                        ) : (
                            <icons.Menu className={(!isLandingPage || isScrolled) ? 'text-primary' : 'text-white'} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white absolute top-full left-0 right-0 shadow-xl border-t animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col p-4 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-primary font-medium border-b border-gray-100 pb-2"
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
                                    <LayoutDashboard className="w-4 h-4" />
                                    Admin Panel
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 font-bold pt-2 flex items-center gap-2 text-left"
                                >
                                    <LogOut className="w-4 h-4" />
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
