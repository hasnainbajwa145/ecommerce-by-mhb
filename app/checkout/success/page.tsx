'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnnouncementBar } from '@/components/home/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CheckCircle2, ShoppingBag, ArrowRight, Truck, Calendar } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'AUR-842918';

  useEffect(() => {
    // Elegant dual confetti burst
    const end = Date.now() + 1.5 * 1000;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F59E0B', '#8B5CF6', '#3B82F6']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F59E0B', '#8B5CF6', '#3B82F6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative font-poppins bg-bg-custom text-text-custom">
      
      {/* Top Banner Line */}
      <AnnouncementBar />

      {/* Sticky Header */}
      <Navbar />

      <main className="flex-1 pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 w-full text-center space-y-8">
          
          {/* Animated Success Circle and Checkmark */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="flex justify-center text-emerald-500"
          >
            <div className="p-4 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full">
              <CheckCircle2 className="w-16 h-16 drop-shadow-[0_0_15px_rgba(34,197,94,0.2)]" />
            </div>
          </motion.div>

          {/* Success Messaging */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-emerald-500 font-semibold">
              Order Completed Successfully
            </span>
            <h1 className="text-2xl sm:text-3xl font-light tracking-wide text-text-custom">
              Thank You for Your Order
            </h1>
            <p className="text-sm font-light text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed font-inter">
              Your transaction has been securely processed. A digital invoice and tracking code has been dispatched to your email address.
            </p>
          </div>

          {/* Order Summary specs card */}
          <div className="p-6 border border-border-custom bg-card-custom rounded-2xl shadow-sm text-left grid grid-cols-1 gap-4 font-inter text-sm">
            <div className="flex justify-between items-center border-b border-border-custom pb-3">
              <span className="text-xs text-slate-400 font-semibold font-poppins uppercase tracking-wider">Order Number</span>
              <span className="font-mono font-semibold text-text-custom">{orderId}</span>
            </div>
            
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-text-custom">White-Glove Shipping</p>
                <p className="text-xs text-slate-500 leading-relaxed">Dispatched in secure Aurum signature boxes.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-border-custom pt-3">
              <Calendar className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-text-custom">Estimated Delivery</p>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">3 - 5 Business Days</p>
              </div>
            </div>
          </div>

          {/* Bottom Action buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold tracking-wider rounded-lg shadow-lg shadow-violet-500/20 active:scale-[0.98] transition-transform duration-250"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              href="/"
              className="py-3 text-xs tracking-widest text-slate-400 hover:text-text-custom font-semibold uppercase underline"
            >
              Return to Homepage
            </Link>
          </div>

        </div>
      </main>

      {/* Premium Footer */}
      <Footer />

    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white gap-4">
        <span className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] tracking-[0.25em] text-slate-500 uppercase font-mono">Verifying Order...</span>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
