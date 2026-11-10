'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

export const BrandTrust: React.FC = () => {
  const cards = [
    {
      icon: <Truck className="w-8 h-8 text-amber-500" />,
      title: 'Free Worldwide Shipping',
      description: 'On all orders above $150. Curated courier packaging.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
      title: 'Secure Payments',
      description: 'Fully encrypted Stripe checkout processing security.',
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-amber-500" />,
      title: '30-Day Easy Returns',
      description: 'Hassle-free shipping back to any of our collections.',
    },
    {
      icon: <Headphones className="w-8 h-8 text-amber-500" />,
      title: '24/7 Dedicated Support',
      description: 'Direct line to our personal shopping assistants.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } },
  } as const;

  return (
    <section id="trust-section" className="py-20 bg-bg-custom text-text-custom border-b border-border-custom relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
              className="p-8 rounded-2xl border border-border-custom bg-card-custom transition-all duration-300 flex flex-col items-center text-center group cursor-pointer relative overflow-hidden"
            >
              {/* Subtle gold glow on top border on hover */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon Container with spin/bounce hover */}
              <div className="p-4 bg-amber-500/10 dark:bg-amber-500/5 rounded-full mb-6 group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-300">
                {card.icon}
              </div>

              <h3 className="text-base font-semibold tracking-wide text-text-custom mb-3 font-poppins">
                {card.title}
              </h3>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed font-inter">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
