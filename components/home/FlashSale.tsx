'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flame, ArrowRight, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { mockProducts } from '@/data/products';

export const FlashSale: React.FC = () => {
  const { addToCart } = useCart();
  
  // Find a product that has a discount price for the flash sale
  const saleProduct = mockProducts.find(p => p.id === 'prod-3') || mockProducts[0];

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    // Basic countdown decrement interval
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (num: number) => String(num).padStart(2, '0');

  return (
    <section className="py-24 bg-slate-900 text-white relative z-10 overflow-hidden font-poppins">
      
      {/* Decorative Blur Aurora */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Countdown & Offer Callouts */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            <div className="space-y-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-500 text-xs font-semibold uppercase tracking-wider"
              >
                <Flame className="w-3.5 h-3.5 fill-red-500" />
                <span>Limited Time Flash Offer</span>
              </motion.div>

              <h2 className="text-3xl sm:text-5xl font-light tracking-wide leading-tight">
                Luxury Deals ending soon. <br />
                <span className="font-normal text-amber-500">Act Decisively.</span>
              </h2>
            </div>

            {/* Countdown Display Card */}
            <div className="flex gap-4 items-center">
              {[
                { label: 'HOURS', value: formatNum(timeLeft.hours) },
                { label: 'MINUTES', value: formatNum(timeLeft.minutes) },
                { label: 'SECONDS', value: formatNum(timeLeft.seconds) },
              ].map((timeUnit, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center font-mono text-2xl sm:text-3xl font-light text-amber-500 shadow-xl relative overflow-hidden">
                      {/* Subtle reflection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={timeUnit.value}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="block"
                        >
                          {timeUnit.value}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500 mt-2 font-inter font-medium">
                      {timeUnit.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <span className="text-xl sm:text-2xl font-light text-slate-700 mx-2 sm:mx-3 mb-6">:</span>
                  )}
                </div>
              ))}
            </div>

            {/* Stock Progress Bar */}
            <div className="max-w-md space-y-2.5">
              <div className="flex justify-between text-xs font-light text-slate-400 font-inter">
                <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-amber-500" /> Only <span className="font-semibold text-white">5 pieces</span> left in stock!</span>
                <span>84% Claimed</span>
              </div>
              <div className="h-2 w-full bg-slate-950 border border-slate-800 rounded-full overflow-hidden p-[1px]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '84%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                />
              </div>
            </div>

            <Link
              href={`/shop?id=${saleProduct.id}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 font-semibold tracking-wider rounded-md text-sm transition-all duration-250 active:scale-95 group shadow-lg shadow-white/5"
            >
              Shop the Sale
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>

          {/* Right Column: Featured Item */}
          <div className="lg:col-span-6 flex justify-center">
            
            <motion.div
              whileHover={{ y: -8 }}
              className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl group flex flex-col"
            >
              {/* Product Image Frame */}
              <div className="relative w-full aspect-square bg-slate-900 overflow-hidden">
                <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-red-600 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                  Save 26%
                </div>
                <Image
                  src={saleProduct.image}
                  alt={saleProduct.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </div>

              {/* Product Info Block */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-inter">
                    {saleProduct.category}
                  </span>
                  <h3 className="text-lg font-medium tracking-wide mt-1 text-white line-clamp-1">
                    {saleProduct.name}
                  </h3>
                </div>

                <div className="flex items-end justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold font-mono text-amber-500">
                      ${saleProduct.discountPrice?.toFixed(2)}
                    </span>
                    <span className="text-sm text-slate-500 line-through font-mono">
                      ${saleProduct.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart({
                      id: saleProduct.id,
                      name: saleProduct.name,
                      price: saleProduct.price,
                      discountPrice: saleProduct.discountPrice,
                      image: saleProduct.image
                    })}
                    className="p-3 bg-slate-900 border border-slate-800 text-white rounded-full hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 transition-all duration-300 active:scale-90"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </motion.div>

          </div>

        </div>
      </div>

    </section>
  );
};
