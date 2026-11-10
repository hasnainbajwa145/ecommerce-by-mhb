'use client';

import React from 'react';
import Link from 'next/link';
import { AnnouncementBar } from '@/components/home/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowLeft, Inbox } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen relative font-poppins bg-bg-custom text-text-custom">
      
      {/* Top Banner Line */}
      <AnnouncementBar />

      {/* Sticky Navigation */}
      <Navbar />

      <main className="flex-1 pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 w-full text-center space-y-8">
          
          {/* Animated illustration */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{ 
              opacity: { duration: 0.5 },
              y: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
            }}
            className="flex justify-center text-amber-500"
          >
            <div className="p-6 bg-amber-500/10 rounded-full">
              <Inbox className="w-16 h-16" />
            </div>
          </motion.div>

          {/* Heading */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-semibold text-amber-500 uppercase tracking-widest">Error 404</span>
            <h1 className="text-3xl font-light tracking-wide text-text-custom">Collection Not Found</h1>
            <div className="w-8 h-[1px] bg-amber-500 mx-auto" />
            <p className="text-sm font-light text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed font-inter pt-2">
              The premium piece or page you are seeking does not exist, has been sold out, or has been archived from our salons.
            </p>
          </div>

          {/* CTA return buttons */}
          <div className="pt-4 flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold tracking-wider rounded-lg shadow-lg shadow-violet-500/20 active:scale-[0.98] transition-transform duration-250"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Homepage
            </Link>
            
            <Link
              href="/shop"
              className="py-2 text-xs tracking-widest text-slate-400 hover:text-text-custom font-semibold uppercase underline"
            >
              View Full Boutique
            </Link>
          </div>

        </div>
      </main>

      {/* Premium Footer */}
      <Footer />

    </div>
  );
}
