'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, discountAmount, cartSubtotal, couponApplied, applyCoupon } = useCart();
  const [couponInput, setCouponInput] = React.useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-card-custom shadow-2xl border-l border-border-custom flex flex-col h-full"
          >
            {/* Header */}
            <div className="p-6 border-b border-border-custom flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-light tracking-wide text-text-custom">Shopping Cart</h2>
                <span className="text-xs bg-accent/10 text-accent font-medium px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-text-custom"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400"
                  >
                    <ShoppingBag className="w-12 h-12" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-medium text-text-custom">Your Cart is Empty</h3>
                    <p className="text-sm text-slate-400 mt-1 max-w-[240px]">
                      Add some luxury pieces to elevate your collection.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-4 px-6 py-2.5 bg-primary text-white dark:bg-slate-100 dark:text-slate-900 rounded-md text-sm font-medium tracking-wide shadow-md hover:scale-[1.02] transition-transform duration-250 active:scale-[0.98]"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {cartItems.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.size ?? ''}-${item.color ?? ''}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="flex gap-4 p-3 border border-border-custom rounded-lg bg-slate-50 dark:bg-slate-900/50 hover:shadow-md transition-shadow group relative overflow-hidden"
                      >
                        {/* Image wrapper */}
                        <div className="relative w-20 h-20 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-text-custom line-clamp-1">{item.name}</h4>
                            <div className="flex gap-2 text-[10px] text-slate-400 mt-1">
                              {item.size && (
                                <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-medium">
                                  Size: {item.size}
                                </span>
                              )}
                              {item.color && (
                                <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-medium">
                                  Color: {item.color}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-border-custom rounded bg-card-custom">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5 pointer-events-none" />
                              </button>
                              <span className="w-8 text-center text-xs font-medium font-mono">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5 pointer-events-none" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              {item.discountPrice ? (
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] text-slate-400 line-through font-mono">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </span>
                                  <span className="text-sm font-semibold text-amber-500 font-mono">
                                    ${(item.discountPrice * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-sm font-semibold text-text-custom font-mono">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          className="absolute top-2 right-2 p-1.5 bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 rounded-full border border-border-custom opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer Summary (Sticky at bottom) */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-border-custom bg-slate-50 dark:bg-slate-900/40 space-y-4">
                {/* Coupon Code input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon (LUXURY20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-card-custom border border-border-custom rounded text-xs focus:outline-none focus:ring-1 focus:ring-accent font-inter"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold rounded hover:opacity-90 active:scale-95 transition-transform"
                  >
                    Apply
                  </button>
                </form>

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-text-custom font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-500">
                      <span>Discount (20%)</span>
                      <span className="font-mono font-medium">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  {couponApplied === 'FREESHIP' && (
                    <div className="flex justify-between text-emerald-500">
                      <span>Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                  )}
                  {couponApplied !== 'FREESHIP' && (
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-mono text-text-custom font-medium">
                        {cartTotal > 150 ? 'Free' : `$15.00`}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-border-custom pt-3 mt-1 flex justify-between text-base font-semibold text-text-custom">
                    <span>Total</span>
                    <span className="font-mono text-amber-500">${cartSubtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold tracking-wider rounded-md shadow-lg shadow-violet-500/20 active:scale-[0.98] transition-transform duration-250"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={onClose}
                    className="w-full text-center text-xs text-slate-400 hover:text-text-custom font-medium underline py-1"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
