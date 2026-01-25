'use client';

import { icons } from '@/assets/icons';
import Image from 'next/image';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        unternehmen: [
            { name: 'About Us', href: '#' },
            { name: 'Contact', href: '#' },
            { name: 'Cooperation', href: '#' },
            { name: 'Press', href: '#' },
            { name: 'Careers', href: '#' },
        ],
        info: [
            { name: 'Voucher Overview', href: '#' },
            { name: 'Travel Topics', href: '#' },
            { name: 'Tags', href: '#' },
            { name: 'FAQ', href: '#' },
        ],
        laender: [
            { name: 'urlaubstracker.de', href: '#', flag: '🇩🇪' },
            { name: 'urlaubstracker.at', href: '#', flag: '🇦🇹' },
            { name: 'urlaubstracker.ch', href: '#', flag: '🇨🇭' },
        ]
    };

    return (
        <footer className="relative bg-(--gray-800) text-(--white) pt-12 md:pt-16 pb-8 md:pb-12 px-4 overflow-hidden">

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Newsletter Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center p-3 md:p-6 bg-(--white)/5 rounded-xl border border-(--white)/10 backdrop-blur-sm">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Never miss a <span className="text-(--brand-emerald)">travel deal</span> again!
                        </h3>
                        <p className="text-(--white)/60 text-lg">
                            Sign up for our newsletter and get the best deals directly in your inbox.
                        </p>
                    </div>
                    <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="relative flex-grow">
                            <icons.Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-(--white)/40" size={20} />
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-(--white)/5 border border-(--white)/10 rounded-md py-2 pl-12 pr-2 focus:outline-none focus:border-(--primary) transition-colors"
                            />
                        </div>
                        <button className="bg-(--brand-emerald) hover:opacity-90 text-(--gray-900) btn border-none">
                            Sign up now
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <div className="relative w-48 h-12">
                            <Image
                                src="https://api.urlaubstracker.de/images/logo/logo-ut-orange.svg"
                                alt="Urlaubstracker Logo"
                                fill
                                className="object-contain brightness-0 invert"
                            />
                        </div>
                        <p className="text-(--white)/60 text-sm leading-relaxed">
                            Your specialist for the best travel offers and holiday bargains. We find the cheapest deals worldwide for you every day.
                        </p>
                        <div className="flex gap-4">
                            {[icons.Facebook, icons.Instagram, icons.Twitter, icons.Youtube].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 flex items-center justify-center bg-(--white)/5 rounded-xl hover:bg-(--primary) transition-all hover:-translate-y-1 group">
                                    <Icon size={20} className="text-(--white)/70 group-hover:text-(--white) transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links - Company */}
                    <div>
                        <h4 className="text-(--primary) font-bold text-sm uppercase tracking-widest mb-8">Company</h4>
                        <ul className="space-y-4">
                            {footerLinks.unternehmen.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-(--white)/60 hover:text-(--white) transition-colors text-sm flex items-center group">
                                        <span className="w-0 group-hover:w-2 h-[1px] bg-(--brand-emerald) mr-0 group-hover:mr-2 transition-all opacity-0 group-hover:opacity-100"></span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links - Information */}
                    <div>
                        <h4 className="text-(--primary) font-bold text-sm uppercase tracking-widest mb-8">Information</h4>
                        <ul className="space-y-4">
                            {footerLinks.info.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-(--white)/60 hover:text-(--white) transition-colors text-sm flex items-center group">
                                        <span className="w-0 group-hover:w-2 h-[1px] bg-(--brand-emerald) mr-0 group-hover:mr-2 transition-all opacity-0 group-hover:opacity-100"></span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links - Countries */}
                    <div>
                        <h4 className="text-(--primary) font-bold text-sm uppercase tracking-widest mb-8">Countries</h4>
                        <div className="grid grid-cols-1 gap-4">
                            {footerLinks.laender.map((link) => (
                                <a key={link.name} href={link.href} className="flex items-center gap-3 p-3 bg-(--white)/5 rounded-2xl hover:bg-(--white)/10 transition-colors group">
                                    <span className="text-2xl">{link.flag}</span>
                                    <span className="text-sm font-medium text-(--white)/80 group-hover:text-(--white)">{link.name}</span>
                                    <icons.ExternalLink size={14} className="ml-auto text-(--white)/20 group-hover:text-(--white)/40" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-(--white)/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium tracking-wide">
                    <div className="flex flex-wrap justify-center gap-8 text-(--white)/40">
                        {['Cookies', 'Privacy Policy', 'Imprint', 'T&C'].map(item => (
                            <a key={item} href="#" className="hover:text-(--white) transition-colors">{item}</a>
                        ))}
                    </div>
                    <p className="text-(--white)/30">
                        © 2013 - {currentYear} Urlaubstracker. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
