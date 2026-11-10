'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star, X, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cartItems, addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  const favorited = isInWishlist(product.id);
  
  const cartItemQty = cartItems
    .filter((item) => item.id === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.image,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      quantity: quantity
    });
    setIsQuickViewOpen(false);
    setQuantity(1);
  };

  const handleQuickViewAddToCart = () => {
    handleAddToCart();
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group relative flex flex-col justify-between border border-border-custom rounded-2xl bg-card-custom overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 w-full"
      >
        {/* Badges / Top utilities */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
          {product.isNew && (
            <span className="px-2 py-0.5 bg-accent text-white text-[9px] font-semibold tracking-wider rounded uppercase">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-semibold tracking-wider rounded uppercase">
              Bestseller
            </span>
          )}
          {product.discountPrice && (
            <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-semibold tracking-wider rounded uppercase">
              Sale
            </span>
          )}
          {cartItemQty > 0 && (
            <span className="px-2 py-0.5 bg-slate-900/80 dark:bg-white/80 text-white dark:text-slate-900 text-[9px] font-semibold tracking-wider rounded uppercase backdrop-blur-sm border border-slate-800/10 dark:border-slate-200/10 animate-fade-in font-inter">
              In Cart ({cartItemQty})
            </span>
          )}
        </div>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={() => toggleWishlist({
            id: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            image: product.image,
            inStock: product.inStock
          })}
          className="absolute top-4 right-4 z-20 p-2.5 bg-card-custom hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full border border-border-custom shadow-md transition-colors text-slate-400 hover:text-red-500 active:scale-90"
        >
          <Heart className={`w-4 h-4 transition-transform duration-300 hover:scale-115 ${favorited ? 'fill-red-500 text-red-500 animate-heartbeat' : ''}`} />
        </button>

        <div className="relative w-full aspect-[4/5] bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
          
          {/* Zoom Image */}
          <Link href={`/product/${product.id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            />
          </Link>

          {/* Quick Actions Hover overlay - Hidden on mobile to avoid touch layout issues */}
          <div className="absolute inset-0 bg-slate-950/20 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-3 pointer-events-none md:pointer-events-auto">
            {/* Quick View */}
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="p-3 bg-white text-slate-900 hover:bg-amber-500 hover:text-slate-950 rounded-full shadow-lg transition-colors duration-250 hover:scale-110 active:scale-95 pointer-events-auto animate-fade-in"
              title="Quick View"
            >
              <Eye className="w-5 h-5" />
            </button>
            {/* Add directly to cart */}
            {product.inStock && (
              <button
                onClick={handleAddToCart}
                className="p-3 bg-white text-slate-900 hover:bg-accent hover:text-white rounded-full shadow-lg transition-colors duration-250 hover:scale-110 active:scale-95 pointer-events-auto relative animate-fade-in"
                title="Add to Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemQty > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono border border-white dark:border-slate-950 animate-pulse">
                    {cartItemQty}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Product Info Block */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
          
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-inter">
              {product.category}
            </span>
            <Link href={`/product/${product.id}`}>
              <h3 className="text-sm font-medium tracking-wide text-card-text group-hover:text-amber-500 transition-colors line-clamp-1 cursor-pointer">
                {product.name}
              </h3>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            {/* Price section */}
            <div className="flex items-center gap-2">
              {product.discountPrice ? (
                <>
                  <span className="text-base font-semibold font-mono text-amber-500">
                    ${product.discountPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-400 line-through font-mono">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-base font-semibold font-mono text-card-text">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Star Rating summary */}
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-xs font-semibold text-card-text font-mono">
                {product.rating}
              </span>
            </div>
          </div>

          {/* Quantity Selector & Add to Cart Container - Statically displayed on all resolutions */}
          {product.inStock ? (
            <div className="space-y-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              {/* Quantity Controls */}
              <div className="flex items-center justify-between border border-border-custom rounded-lg bg-slate-50 dark:bg-slate-900/50 p-1">
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuantity(q => Math.max(1, q - 1));
                  }}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all text-slate-500 disabled:opacity-30 disabled:hover:bg-transparent hover:scale-105 active:scale-95 hover:shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                
                {/* Animating Quantity count using framer-motion AnimatePresence for scale/bounce effect */}
                <div className="overflow-hidden h-5 flex items-center justify-center font-mono font-semibold text-xs text-text-custom w-8">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={quantity}
                      initial={{ y: 10, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -10, opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="inline-block"
                    >
                      {quantity}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  disabled={quantity >= product.stockCount}
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuantity(q => q + 1);
                  }}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all text-slate-500 disabled:opacity-30 hover:scale-105 active:scale-95 hover:shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-amber-500 hover:text-slate-950 dark:hover:bg-amber-500 dark:hover:text-slate-950 rounded-lg text-xs font-semibold uppercase tracking-wider active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-slate-800 dark:border-slate-200"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Add to Cart {cartItemQty > 0 ? `(${cartItemQty})` : ''}
              </button>
            </div>
          ) : (
            <div className="w-full py-2.5 mt-3 bg-slate-100 dark:bg-slate-900 text-slate-400 rounded-lg text-xs font-semibold uppercase tracking-wider text-center border border-slate-200 dark:border-slate-800">
              Out of Stock
            </div>
          )}

        </div>
      </motion.div>

      {/* Premium Quick View Modal */}
      <AnimatePresence>
        {isQuickViewOpen && (
          <>
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuickViewOpen(false)}
              className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-y-auto z-[101] bg-card-custom border border-border-custom rounded-2xl shadow-2xl p-6 sm:p-8 font-poppins grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsQuickViewOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-text-custom z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Media Gallery */}
              <div className="relative aspect-square md:aspect-[4/5] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right Column: Descriptions & Controls */}
              <div className="flex flex-col justify-between space-y-6">
                
                {/* Headers */}
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-inter">
                    {product.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-light tracking-wide text-text-custom leading-snug">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-500' : ''}`} />
                      ))}
                    </div>
                    <span className="text-xs font-light text-slate-400 font-inter">
                      ({product.reviewCount} verified reviews)
                    </span>
                  </div>
                </div>

                {/* Pricing info */}
                <div className="flex items-baseline gap-3">
                  {product.discountPrice ? (
                    <>
                      <span className="text-2xl font-semibold text-amber-500 font-mono">
                        ${product.discountPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-slate-400 line-through font-mono">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-semibold text-text-custom font-mono">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm font-light text-slate-500 leading-relaxed font-inter">
                  {product.description}
                </p>

                {/* Configuration: Sizes & Colors */}
                <div className="space-y-4">
                  
                  {/* Colors */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Color: <span className="text-text-custom">{selectedColor}</span></span>
                      <div className="flex gap-2">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-1 text-xs border rounded transition-all duration-200 font-medium ${
                              selectedColor === color 
                                ? 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-sm' 
                                : 'border-border-custom bg-transparent text-slate-400 hover:border-text-custom hover:text-text-custom'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sizes */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Size: <span className="text-text-custom">{selectedSize}</span></span>
                      <div className="flex gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-9 h-9 flex items-center justify-center text-xs border rounded-full transition-all duration-200 font-mono ${
                              selectedSize === size 
                                ? 'border-accent bg-accent/15 text-accent shadow-sm' 
                                : 'border-border-custom bg-transparent text-slate-400 hover:border-text-custom hover:text-text-custom'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Quantity Controls & Add Button */}
                <div className="flex gap-4 pt-4 border-t border-border-custom items-center">
                  
                  <div className="flex items-center border border-border-custom rounded-lg bg-slate-50 dark:bg-slate-900/50">
                    <button
                      type="button"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-3.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l-lg transition-colors"
                    >
                      <Minus className="w-4 h-4 text-slate-500 pointer-events-none" />
                    </button>
                    <span className="w-12 text-center text-sm font-semibold font-mono text-text-custom">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-3.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r-lg transition-colors"
                    >
                      <Plus className="w-4 h-4 text-slate-500 pointer-events-none" />
                    </button>
                  </div>

                  <button
                    onClick={handleQuickViewAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold tracking-wider rounded-lg text-sm shadow-lg shadow-violet-500/20 transition-all duration-250 active:scale-[0.98] disabled:scale-100"
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>

                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
