'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AnnouncementBar } from '@/components/home/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const success = await login(email, password);
      if (success) {
        router.push('/');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative font-poppins bg-bg-custom text-text-custom">
      
      {/* Top Announcements */}
      <AnnouncementBar />

      {/* Sticky Navigation */}
      <Navbar />

      <main className="flex-1 pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-md w-full px-6">
          
          {/* Glass Form Container */}
          <div className="p-8 border border-border-custom bg-card-custom rounded-3xl shadow-xl space-y-6 text-left relative overflow-hidden">
            {/* Top gold ribbon bar */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-amber-500 to-amber-600" />
            
            <div className="space-y-2 text-center">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold">Welcome Back</span>
              <h1 className="text-2xl font-light tracking-wide text-text-custom">Maison Sign In</h1>
              <div className="w-8 h-[1px] bg-amber-500 mx-auto" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 pt-2">
              
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Email Address</label>
                <div className="flex items-center border border-border-custom rounded-lg bg-bg-custom focus-within:border-amber-500 transition-colors">
                  <span className="px-4 text-slate-400"><Mail className="w-4 h-4" /></span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="concierge@aurum.com"
                    className="flex-1 py-3 bg-transparent text-sm focus:outline-none pr-4 font-inter text-text-custom"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Password</label>
                  <a href="#" className="text-[10px] tracking-wide font-medium text-slate-400 hover:text-text-custom underline font-inter">Forgot Password?</a>
                </div>
                
                <div className="flex items-center border border-border-custom rounded-lg bg-bg-custom focus-within:border-amber-500 transition-colors">
                  <span className="px-4 text-slate-400"><Lock className="w-4 h-4" /></span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="flex-1 py-3 bg-transparent text-sm focus:outline-none pr-2 font-inter text-text-custom"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-3 text-slate-400 hover:text-text-custom"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold tracking-wider rounded-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Access Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Split lines */}
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-x-0 h-[1px] bg-border-custom" />
              <span className="bg-card-custom px-3 text-[10px] text-slate-400 uppercase tracking-widest relative z-10 font-inter">Or Connect With</span>
            </div>

            {/* Social logins */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => alert('OAuth login via Google initialized...')}
                className="flex items-center justify-center gap-2 py-3 border border-border-custom hover:border-text-custom rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors text-text-custom bg-transparent font-inter active:scale-95"
              >
                Google
              </button>
              <button
                type="button"
                onClick={() => alert('OAuth login via Apple initialized...')}
                className="flex items-center justify-center gap-2 py-3 border border-border-custom hover:border-text-custom rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors text-text-custom bg-transparent font-inter active:scale-95"
              >
                Apple
              </button>
            </div>

            {/* Redirection to register */}
            <div className="border-t border-border-custom pt-6 text-center">
              <p className="text-xs text-slate-400 font-inter">
                New to Maison Aurum?{' '}
                <Link href="/register" className="font-semibold text-accent hover:underline flex items-center justify-center gap-1.5 mt-2">
                  <UserPlus className="w-3.5 h-3.5" /> Create Account
                </Link>
              </p>
            </div>

          </div>

        </div>
      </main>

      {/* Premium Footer */}
      <Footer />

    </div>
  );
}
