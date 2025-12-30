'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {

    const handleLogin = () => {
        signIn('google', { callbackUrl: '/' });
    };

    return (
        <main className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
            {/* Animated Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

            <div className="relative w-full max-w-md bg-surface/30 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                        <span className="font-bold text-white text-3xl">A</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-400 text-center">Sign in to access real-time token data</p>
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-white text-black hover:bg-gray-100 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl group"
                >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    <span>Sign in with Google</span>
                </button>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-xs text-gray-500">
                        By signing in, you agree to our <a href="#" className="underline hover:text-white">Terms of Service</a>
                    </p>
                </div>
            </div>
        </main>
    );
}
