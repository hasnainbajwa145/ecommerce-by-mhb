'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/product/ProductCard';
import { mockProducts } from '@/data/products';

export const TrendingProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'jewellery' | 'watches' | 'bags' | 'apparel'>('all');

  const tabs = [
    { id: 'all', label: 'All Pieces' },
    { id: 'jewellery', label: 'Jewellery' },
    { id: 'watches', label: 'Watches' },
    { id: 'bags', label: 'Bags' },
    { id: 'apparel', label: 'Apparel' },
  ];

  // Filter products based on isTrending and active category
  const filteredProducts = mockProducts.filter((product) => {
    const isTrending = product.isTrending;
    if (!isTrending) return false;

    if (activeTab === 'all') return true;
    if (activeTab === 'apparel') {
      return product.category === 'men' || product.category === 'women';
    }
    return product.category === activeTab;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold">
            Highly Coveted
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-text-custom">
            Trending Products
          </h2>
          <div className="w-12 h-[1px] bg-amber-500 mx-auto" />
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-12 border-b border-border-custom pb-4 max-w-2xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 relative ${
                activeTab === tab.id 
                  ? 'text-amber-500 font-semibold' 
                  : 'text-slate-400 hover:text-text-custom'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="trendingTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="flex"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
