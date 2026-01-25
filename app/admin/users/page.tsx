'use client';

import { useState } from 'react';
import { icons } from '@/assets/icons';

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
        { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User', status: 'Active' },
        { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Moderator', status: 'Active' },
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">Users Management</h1>
                <p className="text-sm text-gray-500 mt-1">Manage all users in the system</p>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg flex-1 max-w-md">
                    <icons.Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm flex-1"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                    <icons.Plus className="w-4 h-4" />
                    Add User
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">ID</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Name</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Email</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Role</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Status</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-2 text-sm text-gray-600">{user.id}</td>
                                <td className="px-4 py-2 text-sm font-medium text-foreground">{user.name}</td>
                                <td className="px-4 py-2 text-sm text-gray-600">{user.email}</td>
                                <td className="px-4 py-2 text-sm text-gray-600">{user.role}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${user.status === 'Active'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                            <icons.Edit className="w-4 h-4 text-blue-600" />
                                        </button>
                                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                            <icons.Trash2 className="w-4 h-4 text-red-600" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
