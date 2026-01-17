'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // No validation - frontend only
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">UT</span>
                        </div>
                        <span className="font-bold text-2xl text-primary">Urlaubstracker</span>
                    </div>
                    <h1 className="text-xl font-bold text-foreground mt-4">Welcome Back</h1>
                    <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
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
                            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium mt-2"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/auth/signup" className="text-primary font-medium hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
