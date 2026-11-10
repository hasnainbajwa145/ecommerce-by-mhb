'use client';

import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { AnnouncementBar } from '@/components/home/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      discountPrice: item.discountPrice,
      image: item.image,
      quantity: 1
    });
    removeFromWishlist(item.id);
  };

  return (
    <div className="flex flex-col min-h-screen relative font-poppins">
      
      {/* Announcement Line */}
      <AnnouncementBar />

      {/* Sticky Header */}
      <Navbar />

      <main className="flex-1 bg-bg-custom text-text-custom pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Page Header */}
          <div className="border-b border-border-custom pb-8 mb-12 flex justify-between items-end">
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 font-inter">
                <Link href="/" className="hover:text-text-custom transition-colors">Home</Link>
                <span>/</span>
                <span className="text-text-custom">Wishlist</span>
              </div>
              <h1 className="text-3xl font-light tracking-wide text-text-custom">My Wishlist</h1>
            </div>
            
            <p className="text-xs text-slate-400 font-inter uppercase font-medium">
              {wishlistItems.length} Saved Pieces
            </p>
          </div>

          {/* Items Display */}
          <AnimatePresence mode="wait">
            {wishlistItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="py-20 flex flex-col items-center justify-center text-center space-y-6 border border-border-custom border-dashed rounded-2xl bg-card-custom"
              >
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400">
                  <Heart className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-text-custom">Your Wishlist is Empty</h3>
                  <p className="text-sm text-slate-400 mt-1 max-w-[280px] mx-auto leading-relaxed">
                    Tap the heart icon on any product to save it to your wishlist.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold uppercase tracking-wider rounded transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {wishlistItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    exit={{ opacity: 0, x: -30 }}
                    className="flex flex-col sm:flex-row items-center justify-between p-4 border border-border-custom rounded-xl bg-card-custom gap-6 group hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    {/* Details row: image + descriptions */}
                    <div className="flex flex-row items-center gap-4 w-full sm:w-auto text-left">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-text-custom line-clamp-1">{item.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded font-inter ${
                            item.inStock 
                              ? 'bg-emerald-500/10 text-emerald-500' 
                              : 'bg-red-500/10 text-red-500'
                          }`}>
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons + prices */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-border-custom pt-4 sm:pt-0">
                      
                      {/* Price */}
                      <div className="text-left sm:text-right">
                        {item.discountPrice ? (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs text-slate-400 line-through font-mono">
                              ${item.price.toFixed(2)}
                            </span>
                            <span className="text-sm font-semibold text-amber-500 font-mono">
                              ${item.discountPrice.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm font-semibold text-text-custom font-mono">
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Action Triggers */}
                      <div className="flex gap-2">
                        {item.inStock && (
                          <button
                            onClick={() => handleMoveToCart(item)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-accent hover:border-accent text-white hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors active:scale-95"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        )}
                        
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-2 border border-border-custom hover:border-red-200 hover:text-red-500 rounded-lg text-slate-400 transition-colors active:scale-90"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      {/* Premium Footer */}
      <Footer />

    </div>
  );
}
