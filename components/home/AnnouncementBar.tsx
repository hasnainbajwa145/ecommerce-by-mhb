'use client';

import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="w-full bg-slate-950 text-white py-2 border-b border-slate-900 overflow-hidden relative z-50 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-inter">
      <div className="flex w-max items-center animate-marquee whitespace-nowrap gap-12 select-none pr-12">
        <span>Free Worldwide Shipping on all orders over $150</span>
        <span className="text-amber-500">•</span>
        <span>Use discount code <span className="text-amber-400">LUXURY20</span> for 20% off apparel</span>
        <span className="text-amber-500">•</span>
        <span>Secure checkout with Stripe & PayPal</span>
        <span className="text-amber-500">•</span>
        <span>Complimentary 30-day returns & replacement guide</span>
        <span className="text-amber-500">•</span>

        {/* Second duplicate loop to ensure seamless marquee overlap */}
        <span>Free Worldwide Shipping on all orders over $150</span>
        <span className="text-amber-500">•</span>
        <span>Use discount code <span className="text-amber-400">LUXURY20</span> for 20% off apparel</span>
        <span className="text-amber-500">•</span>
        <span>Secure checkout with Stripe & PayPal</span>
        <span className="text-amber-500">•</span>
        <span>Complimentary 30-day returns & replacement guide</span>
        <span className="text-amber-500">•</span>
      </div>
    </div>
  );
};
