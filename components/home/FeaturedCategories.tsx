'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface Category {
  name: string;
  image: string;
  itemCount: string;
  href: string;
  gridClass: string;
}

export const FeaturedCategories: React.FC = () => {
  const categories: Category[] = [
    {
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
      itemCount: '124 Items',
      href: '/shop?category=women',
      gridClass: 'col-span-1 md:col-span-2 row-span-2 h-[450px] md:h-[600px]',
    },
    {
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=800&auto=format&fit=crop',
      itemCount: '98 Items',
      href: '/shop?category=men',
      gridClass: 'col-span-1 md:col-span-2 row-span-2 h-[450px] md:h-[600px]',
    },
    {
      name: 'Luxury Watches',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
      itemCount: '45 Items',
      href: '/shop?category=watches',
      gridClass: 'col-span-1 md:col-span-1 h-[280px]',
    },
    {
      name: 'Designer Bags',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
      itemCount: '32 Items',
      href: '/shop?category=bags',
      gridClass: 'col-span-1 md:col-span-1 h-[280px]',
    },
    {
      name: 'Fine Jewellery',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
      itemCount: '18 Items',
      href: '/shop?category=jewellery',
      gridClass: 'col-span-1 md:col-span-1 h-[280px]',
    },
    {
      name: 'Premium Glasses',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',
      itemCount: '27 Items',
      href: '/shop?category=glasses',
      gridClass: 'col-span-1 md:col-span-1 h-[280px]',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  } as const;

  return (
    <section className="py-24 bg-bg-custom text-text-custom border-b border-border-custom relative z-10 font-poppins">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold">
              Curated Collections
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide text-text-custom">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold tracking-wider text-text-custom hover:text-amber-500 transition-colors pb-1 border-b border-text-custom hover:border-amber-500"
          >
            Explore All Departments
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Asymmetrical Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className={`relative rounded-2xl overflow-hidden group border border-border-custom shadow-sm ${category.gridClass}`}
            >
              {/* Dark ambient reflection */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10 pointer-events-none group-hover:from-slate-950/90 transition-all duration-300" />
              
              {/* Zooming Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />

              {/* Title & Item counts */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col justify-end">
                <span className="text-[10px] tracking-widest text-slate-300 font-inter mb-1">
                  {category.itemCount}
                </span>
                
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-light tracking-wide text-white">
                    {category.name}
                  </h3>
                  
                  {/* Floating Circle Button */}
                  <Link
                    href={category.href}
                    className="w-10 h-10 bg-white/10 group-hover:bg-amber-500 rounded-full flex items-center justify-center text-white group-hover:text-slate-950 backdrop-blur-md border border-white/20 group-hover:border-amber-500 transition-all duration-300"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
