'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product/ProductCard';
import { mockProducts } from '@/data/products';
import { Sparkles } from 'lucide-react';

export const NewArrivals: React.FC = () => {
  const newProducts = mockProducts.filter(p => p.isNew);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  } as const;

  return (
    <section className="py-24 bg-bg-custom text-text-custom border-b border-border-custom relative z-10 font-poppins">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="p-3 bg-violet-500/10 dark:bg-violet-500/5 text-violet-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-violet-500 font-semibold">
            Fresh Arrivals
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-text-custom">
            New Season Collection
          </h2>
          <div className="w-12 h-[1px] bg-violet-500 mx-auto" />
        </div>

        {/* Product Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {newProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants} className="flex">
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
