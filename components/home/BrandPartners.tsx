'use client';

import React from 'react';

export const BrandPartners: React.FC = () => {
  const brands = [
    'MAISON DIOR',
    'ROLEX GENÈVE',
    'GUCCI',
    'CHANEL PARIS',
    'PRADA MILANO',
    'HERMÈS PARIS',
    'BALENCIAGA',
    'CARTIER',
  ];

  return (
    <section className="py-16 bg-slate-950 border-y border-slate-900 overflow-hidden relative z-10 font-poppins">
      <div className="max-w-7xl mx-auto px-6">
        <div className="w-full relative overflow-hidden flex items-center">
          
          {/* Fading left and right gradients */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

          {/* Marquee track */}
          <div className="flex w-max items-center animate-marquee whitespace-nowrap gap-16 select-none pr-16 text-slate-600 font-extralight text-lg sm:text-2xl tracking-[0.3em]">
            
            {brands.map((brand, i) => (
              <span 
                key={`b1-${i}`}
                className="hover:text-amber-500 hover:scale-105 cursor-pointer transition-all duration-300 font-poppins inline-block"
              >
                {brand}
              </span>
            ))}

            {/* Repeat to form seamless track */}
            {brands.map((brand, i) => (
              <span 
                key={`b2-${i}`}
                className="hover:text-amber-500 hover:scale-105 cursor-pointer transition-all duration-300 font-poppins inline-block"
              >
                {brand}
              </span>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};
