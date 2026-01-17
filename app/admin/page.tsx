import { Users, Package, TrendingUp, DollarSign, Plane, Car } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500' },
        { label: 'Hotels', value: '56', icon: Package, color: 'bg-green-500' },
        { label: 'Flights', value: '124', icon: Plane, color: 'bg-blue-600' },
        { label: 'Rentals', value: '23', icon: Car, color: 'bg-purple-500' },
    ];

    const actions = [
        { label: 'Manage Hotels', href: '/admin/products', icon: Package, color: 'bg-green-500' },
        { label: 'Manage Flights', href: '/admin/flights', icon: Plane, color: 'bg-blue-600' },
        { label: 'Manage Rentals', href: '/admin/rentals', icon: Car, color: 'bg-purple-500' },
        { label: 'Manage Users', href: '/admin/users', icon: Users, color: 'bg-blue-500' },
    ];

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Welcome to the admin panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-foreground mb-4">Quick Navigation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {actions.map((action) => {
                        const Icon = action.icon;
                        return (
                            <Link
                                key={action.label}
                                href={action.href}
                                className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all group"
                            >
                                <div className={`${action.color} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{action.label}</p>
                                    <p className="text-xs text-gray-500">Go to management</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
