'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Package, LogOut } from 'lucide-react';

const AdminSidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Products', href: '/admin/products', icon: Package },
    ];

    return (
        <aside className="w-56 bg-secondary min-h-screen fixed left-0 top-0 flex flex-col">
            {/* Logo */}
            <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">UT</span>
                    </div>
                    <span className="text-white font-semibold text-sm">Admin Panel</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                            ? 'bg-primary text-white'
                                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-white/10">
                <Link
                    href="/auth/login"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                </Link>
            </div>
        </aside>
    );
};

export default AdminSidebar;
