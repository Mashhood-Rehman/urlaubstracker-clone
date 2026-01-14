import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        unternehmen: [
            { name: 'Über uns', href: '#' },
            { name: 'Kontakt', href: '#' },
            { name: 'Kooperation', href: '#' },
            { name: 'Presse', href: '#' },
            { name: 'Karriere', href: '#' },
        ],
        info: [
            { name: 'Übersicht Gutscheine', href: '#' },
            { name: 'Reisethemen', href: '#' },
            { name: 'Schlagworte', href: '#' },
            { name: 'FAQ', href: '#' },
        ],
        laender: [
            { name: 'urlaubstracker.de', href: '#', flag: '🇩🇪' },
            { name: 'urlaubstracker.at', href: '#', flag: '🇦🇹' },
            { name: 'urlaubstracker.ch', href: '#', flag: '🇨🇭' },
        ]
    };

    return (
        <footer className="bg-primary text-white pt-20 pb-10 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="relative w-48 h-12">
                            <Image
                                src="https://api.urlaubstracker.de/images/logo/logo-ut-orange.svg"
                                alt="Urlaubstracker Logo"
                                fill
                                className="object-contain brightness-0 invert"
                            />
                        </div>
                        <p className="text-blue-100/70 text-sm leading-relaxed max-w-xs">
                            Dein Spezialist für die besten Reiseangebote und Urlaubsschnäppchen. Wir finden für dich täglich die günstigsten Deals.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors group">
                                <Facebook size={18} className="text-white" />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors group">
                                <Instagram size={18} className="text-white" />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-secondary transition-colors group">
                                <Twitter size={18} className="text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Unternehmen */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Unternehmen</h4>
                        <ul className="space-y-4">
                            {footerLinks.unternehmen.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-blue-100/70 hover:text-secondary transition-colors flex items-center gap-2 group">
                                        <span className="h-0.5 w-0 bg-secondary transition-all group-hover:w-2"></span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Informationen</h4>
                        <ul className="space-y-4">
                            {footerLinks.info.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-blue-100/70 hover:text-secondary transition-colors flex items-center gap-2 group">
                                        <span className="h-0.5 w-0 bg-secondary transition-all group-hover:w-2"></span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Länder & Newsletter Placeholder */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Länder</h4>
                        <ul className="space-y-4 mb-8">
                            {footerLinks.laender.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-blue-100/70 hover:text-secondary transition-colors flex items-center gap-3">
                                        <span>{link.flag}</span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2 text-sm text-blue-100/50">
                            <a href="#" className="hover:text-secondary transition-colors">Cookies</a>
                            <a href="#" className="hover:text-secondary transition-colors">Datenschutz</a>
                            <a href="#" className="hover:text-secondary transition-colors">Impressum</a>
                            <a href="#" className="hover:text-secondary transition-colors">AGB</a>
                        </div>
                        <p className="text-sm text-blue-100/30 text-center md:text-right">
                            © 2013 - {currentYear} Urlaubstracker | Urlaubsschnäppchen & günstige Reiseangebote
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
