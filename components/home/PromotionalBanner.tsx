'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const PromotionalBanner: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 text-white relative z-10 overflow-hidden font-poppins">
      
      {/* Decorative gradient aurora */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/5 to-violet-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="border border-slate-800 rounded-3xl overflow-hidden bg-slate-900/40 relative z-10 grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Image with parallax offset */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop"
              alt="Maison Aurum Campaign"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Column: Promotional copy */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start space-y-6 text-left">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Campaign Offer</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-light tracking-wide leading-tight">
              Maison Aurum Signature Collection. <br />
              <span className="font-normal text-amber-500">20% off all apparel.</span>
            </h2>

            <p className="text-sm font-light text-slate-400 leading-relaxed max-w-xl font-inter">
              Elevate your formal wardrobe with unstructured blazers, Mongolian cashmere cardigans, and silk-lined items. Handcrafted fabrics made to last. Use code <span className="font-mono font-semibold text-white bg-slate-800 px-2 py-0.5 rounded">LUXURY20</span> during checkout to claim your premium discount.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                href="/shop?category=apparel"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold tracking-wider rounded-md text-sm shadow-xl shadow-amber-500/10 hover:scale-[1.03] transition-all duration-250 active:scale-[0.98] group"
              >
                Shop Apparel Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/collections"
                className="text-xs tracking-widest font-semibold uppercase hover:text-amber-500 transition-colors py-2"
              >
                View Campaign Details
              </Link>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
