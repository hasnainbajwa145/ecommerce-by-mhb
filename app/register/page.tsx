'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AnnouncementBar } from '@/components/home/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (name && email && password) {
      const success = await register(name, email, password, phone);
      if (success) {
        router.push('/');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative font-poppins bg-bg-custom text-text-custom">
      
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Header */}
      <Navbar />

      <main className="flex-1 pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-md w-full px-6">
          
          {/* Glass Form Container */}
          <div className="p-8 border border-border-custom bg-card-custom rounded-3xl shadow-xl space-y-6 text-left relative overflow-hidden">
            {/* Top gold ribbon bar */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-amber-500 to-amber-600" />
            
            <div className="space-y-2 text-center">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold">Join Us</span>
              <h1 className="text-2xl font-light tracking-wide text-text-custom">Create Account</h1>
              <div className="w-8 h-[1px] bg-amber-500 mx-auto" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 pt-2">
              
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Full Name *</label>
                <div className="flex items-center border border-border-custom rounded-lg bg-bg-custom focus-within:border-amber-500 transition-colors">
                  <span className="px-4 text-slate-400"><User className="w-4 h-4" /></span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Johnathan Vance"
                    className="flex-1 py-3 bg-transparent text-sm focus:outline-none pr-4 font-inter text-text-custom"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Email Address *</label>
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
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Password *</label>
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

              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Confirm Password *</label>
                <div className="flex items-center border border-border-custom rounded-lg bg-bg-custom focus-within:border-amber-500 transition-colors">
                  <span className="px-4 text-slate-400"><Lock className="w-4 h-4" /></span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="flex-1 py-3 bg-transparent text-sm focus:outline-none pr-2 font-inter text-text-custom"
                  />
                </div>
              </div>

              {/* Agree terms Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 border border-border-custom rounded accent-accent"
                />
                <label htmlFor="agreeTerms" className="text-[11px] text-slate-500 leading-relaxed font-inter select-none">
                  I certify that I accept the{' '}
                  <a href="#" className="font-semibold text-text-custom hover:underline">Terms of Service</a> and{' '}
                  <a href="#" className="font-semibold text-text-custom hover:underline">Privacy Policy</a> governing Maison Aurum transactions.
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold tracking-wider rounded-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Register Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Back to login redirection */}
            <div className="border-t border-border-custom pt-6 text-center">
              <p className="text-xs text-slate-400 font-inter">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-accent hover:underline flex items-center justify-center gap-1.5 mt-2">
                  <UserCheck className="w-3.5 h-3.5" /> Sign In Here
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
