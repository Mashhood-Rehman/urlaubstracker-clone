'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                window.location.href = '/admin';
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative">
            {/* Back Button */}
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors group"
            >
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-primary">
                    <ArrowLeft className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Back to site</span>
            </Link>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">UT</span>
                        </div>
                        <span className="font-bold text-2xl text-primary">Urlaubstracker</span>
                    </div>
                    <h1 className="text-xl font-bold text-foreground mt-4">Welcome Admin</h1>
                    <p className="text-sm text-gray-500 mt-1">Sign in to manage your platform</p>
                </div>


                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg focus-within:border-primary transition-colors">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 bg-transparent border-none outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg focus-within:border-primary transition-colors">
                                <Lock className="w-4 h-4 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="flex-1 bg-transparent border-none outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium mt-2 disabled:opacity-50"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}
