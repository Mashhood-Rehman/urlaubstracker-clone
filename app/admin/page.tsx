import { Users, Package, TrendingUp, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500' },
        { label: 'Total Products', value: '567', icon: Package, color: 'bg-green-500' },
        { label: 'Revenue', value: '$45,678', icon: DollarSign, color: 'bg-purple-500' },
        { label: 'Growth', value: '+12.5%', icon: TrendingUp, color: 'bg-orange-500' },
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
            <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-foreground mb-3">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                        Add New User
                    </button>
                    <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                        Add New Product
                    </button>
                    <button className="px-4 py-2 bg-accent text-secondary rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                        View Reports
                    </button>
                </div>
            </div>
        </div>
    );
}
