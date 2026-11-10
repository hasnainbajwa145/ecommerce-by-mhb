'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AnnouncementBar } from '@/components/home/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { mockProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Minus, 
  Plus, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Check,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const { cartItems, addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Find target product
  const product = useMemo(() => {
    return mockProducts.find(p => p.id === productId) || mockProducts[0];
  }, [productId]);

  // Gallery active index state
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  
  // Selection states
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  // Review states (Helpful count toggles)
  const [helpfulReviews, setHelpfulReviews] = useState<Record<number, boolean>>({});

  const favorited = isInWishlist(product.id);

  const cartItemQty = useMemo(() => {
    return cartItems
      .filter(item => item.id === product.id)
      .reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems, product.id]);

  // Filter related products
  const relatedProducts = useMemo(() => {
    return mockProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

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
  };

  const handleBuyNow = () => {
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
    router.push('/checkout');
  };

  const handleToggleHelpful = (idx: number) => {
    setHelpfulReviews(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Mock static reviews for this product
  const reviews = [
    {
      name: 'Charlotte Dubois',
      rating: 5,
      date: 'June 14, 2026',
      verified: true,
      comment: 'Absolutely spectacular. The build quality exceeds my expectations. Every seam is flawless, and it was wrapped like a museum artifact.',
      helpfulCount: 24
    },
    {
      name: 'Julian Reynolds',
      rating: 4,
      date: 'May 28, 2026',
      verified: true,
      comment: 'Outstanding style and fit. Highly comfortable and luxurious texture. Dropped one star because the courier delivery took 3 days instead of 2.',
      helpfulCount: 8
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative font-poppins">
      
      {/* Top Banner Line */}
      <AnnouncementBar />

      {/* Sticky Header */}
      <Navbar />

      <main className="flex-1 bg-bg-custom text-text-custom pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 font-inter mb-12 border-b border-border-custom pb-6">
            <Link href="/" className="hover:text-text-custom transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link href="/shop" className="hover:text-text-custom transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-[10px] text-slate-500 max-w-[200px] truncate">{product.category}</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-text-custom max-w-[200px] truncate font-semibold">{product.name}</span>
          </div>

          {/* Product Media & Detail grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            
            {/* Left Columns: Photo Galleries */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Main Photo frame */}
              <div className="relative aspect-square sm:aspect-[4/5] w-full rounded-2xl overflow-hidden border border-border-custom bg-card-custom shadow-inner">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[activeImgIndex]}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                  />
                )}
              </div>

              {/* Thumbnails row */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto py-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        activeImgIndex === idx ? 'border-amber-500 scale-95 shadow-md' : 'border-border-custom hover:border-text-custom'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} gallery ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* Right Columns: Accolades & Configurations */}
            <div className="lg:col-span-5 space-y-8 text-left">
              
              {/* Product title headers */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold">{product.category}</span>
                <h1 className="text-2xl sm:text-3xl font-light tracking-wide text-text-custom leading-snug">
                  {product.name}
                </h1>
                
                {/* Rating details */}
                <div className="flex items-center gap-2 pt-1 border-b border-border-custom pb-4">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-500' : ''}`} />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-semibold text-text-custom">{product.rating}</span>
                  <span className="text-xs text-slate-400 font-inter">({product.reviewCount} Client Reviews)</span>
                </div>
              </div>

              {/* Price details */}
              <div className="flex items-baseline gap-3">
                {product.discountPrice ? (
                  <>
                    <span className="text-3xl font-semibold text-amber-500 font-mono">
                      ${product.discountPrice.toFixed(2)}
                    </span>
                    <span className="text-base text-slate-400 line-through font-mono">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-semibold text-text-custom font-mono">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Narratives */}
              <p className="text-sm font-light text-slate-500 dark:text-slate-400 leading-relaxed font-inter">
                {product.description}
              </p>

              {/* Size & Color options */}
              <div className="space-y-6">
                
                {/* Colors list */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">
                      Selected Color: <span className="text-text-custom">{selectedColor}</span>
                    </span>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3.5 py-1.5 text-xs border rounded-lg transition-all font-medium ${
                            selectedColor === color 
                              ? 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-sm' 
                              : 'border-border-custom text-slate-400 hover:border-text-custom hover:text-text-custom'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes list */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">
                      Selected Size: <span className="text-text-custom">{selectedSize}</span>
                    </span>
                    <div className="flex gap-2.5">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-10 h-10 flex items-center justify-center text-xs border rounded-full transition-all font-mono font-semibold uppercase ${
                            selectedSize === size 
                              ? 'border-accent bg-accent/15 text-accent shadow-sm' 
                              : 'border-border-custom text-slate-400 hover:border-text-custom'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Quantity Controls & Action Buttons */}
              <div className="space-y-4 pt-6 border-t border-border-custom">
                
                <div className="flex flex-wrap gap-4 items-center">
                  
                  {/* Quantity minus/plus */}
                  <div className="flex items-center border border-border-custom rounded-lg bg-slate-50 dark:bg-slate-900/50 p-1">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-3 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <Minus className="w-4 h-4 text-slate-500 pointer-events-none" />
                    </button>
                    
                    {/* Animating Quantity count using framer-motion AnimatePresence for scale/bounce effect */}
                    <div className="overflow-hidden h-6 flex items-center justify-center font-mono font-semibold text-sm text-text-custom w-10">
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
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-3 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-30"
                    >
                      <Plus className="w-4 h-4 text-slate-500 pointer-events-none" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold tracking-wider rounded-lg text-sm shadow-lg shadow-violet-500/20 transition-all duration-250 active:scale-[0.98] disabled:scale-100 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {product.inStock 
                      ? `Add to Cart ${cartItemQty > 0 ? `(${cartItemQty} in Cart)` : ''}` 
                      : 'Out of Stock'}
                  </button>

                  {/* Favorite Toggle icon */}
                  <button
                    onClick={() => toggleWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      discountPrice: product.discountPrice,
                      image: product.image,
                      inStock: product.inStock
                    })}
                    className="p-4 bg-card-custom border border-border-custom hover:border-red-200 hover:text-red-500 rounded-lg transition-all shadow-sm active:scale-90 text-slate-400"
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${favorited ? 'fill-red-500 text-red-500 animate-heartbeat' : ''}`} />
                  </button>

                </div>

                {/* Buy Now Button */}
                {product.inStock && (
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold tracking-wider rounded-lg text-sm hover:scale-[1.01] transition-all duration-250 active:scale-[0.98]"
                  >
                    Buy It Now
                  </button>
                )}

              </div>

              {/* Highlight Bullet points: delivery, returns, security */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border-custom text-xs font-light text-slate-500 dark:text-slate-400 font-inter">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Secure Insured Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>30-Day Easy Exchanges</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>100% Genuine Pieces</span>
                </div>
              </div>

            </div>

          </div>

          {/* Client Reviews Section */}
          <div className="border-t border-border-custom pt-16 mb-20 space-y-12">
            
            <div className="text-left space-y-2">
              <h2 className="text-2xl font-light tracking-wide text-text-custom">Client Reviews</h2>
              <p className="text-xs text-slate-400 font-inter">Honest reviews shared by verified Aurum purchasers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.map((rev, idx) => (
                <div 
                  key={idx}
                  className="p-6 border border-border-custom rounded-2xl bg-card-custom shadow-sm flex flex-col justify-between text-left space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-semibold text-text-custom">{rev.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-500' : ''}`} />
                        ))}
                      </div>
                      {rev.verified && (
                        <span className="text-[9px] uppercase tracking-wider text-emerald-500 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded font-inter">
                          Verified Client
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm font-light text-slate-500 dark:text-slate-400 leading-relaxed font-inter pt-2">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Helpful Button voting */}
                  <div className="pt-4 border-t border-border-custom/50 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-inter">Was this review helpful?</span>
                    <button
                      onClick={() => handleToggleHelpful(idx)}
                      className={`px-3 py-1 border rounded text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                        helpfulReviews[idx] 
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' 
                          : 'border-border-custom text-slate-400 hover:text-text-custom'
                      }`}
                    >
                      {helpfulReviews[idx] ? '✓ Helpful' : `Helpful (${rev.helpfulCount})`}
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-border-custom pt-16 text-left space-y-12">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold">Complementary Style</span>
                <h2 className="text-2xl font-light tracking-wide text-text-custom">Related Products</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Premium Footer */}
      <Footer />

    </div>
  );
}
