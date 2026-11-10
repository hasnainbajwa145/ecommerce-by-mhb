'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnnouncementBar } from '@/components/home/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { mockProducts, Product } from '@/data/products';
import { 
  Filter, 
  X, 
  ChevronDown, 
  SlidersHorizontal, 
  RotateCcw,
  LayoutGrid,
  Grid3X3,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ShopContent() {
  const searchParams = useSearchParams();
  
  // Extract initial search / category from URL
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number>(1500);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  
  // UI Grid layout controls
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync state if URL changes
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  // Unique lists from mock data
  const categories = useMemo(() => ['all', ...Array.from(new Set(mockProducts.map(p => p.category)))], []);
  
  const colors = useMemo(() => {
    const allColors = mockProducts.flatMap(p => p.colors || []);
    return ['all', ...Array.from(new Set(allColors))];
  }, []);

  const sizes = useMemo(() => {
    const allSizes = mockProducts.flatMap(p => p.sizes || []);
    return ['all', ...Array.from(new Set(allSizes))];
  }, []);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter((product) => {
        // Search text filter
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchCategory = product.category.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchCategory) return false;
        }

        // Category filter
        if (selectedCategory !== 'all') {
          // Special handle for clothing
          if (selectedCategory === 'apparel') {
            if (product.category !== 'men' && product.category !== 'women') return false;
          } else if (product.category !== selectedCategory) {
            return false;
          }
        }

        // Price range filter
        const price = product.discountPrice ?? product.price;
        if (price > selectedPriceRange) return false;

        // Rating filter
        if (selectedRating && product.rating < selectedRating) return false;

        // Color filter
        if (selectedColor !== 'all' && (!product.colors || !product.colors.includes(selectedColor))) return false;

        // Size filter
        if (selectedSize !== 'all' && (!product.sizes || !product.sizes.includes(selectedSize))) return false;

        // Stock status filter
        if (inStockOnly && !product.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        // Sorting dropdown calculations
        const priceA = a.discountPrice ?? a.price;
        const priceB = b.discountPrice ?? b.price;

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (sortBy === 'bestseller') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
        return 0; // Default featured order
      });
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedRating, selectedColor, selectedSize, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPriceRange(1500);
    setSelectedRating(null);
    setSelectedColor('all');
    setSelectedSize('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="flex flex-col min-h-screen relative font-poppins">
      
      {/* Top Banner Line */}
      <AnnouncementBar />

      {/* Luxury Sticky Navbar */}
      <Navbar />

      {/* Shop Content area */}
      <main className="flex-1 bg-bg-custom text-text-custom pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Page Header / Breadcrumbs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-custom pb-8 mb-12 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 font-inter">
                <a href="/" className="hover:text-text-custom transition-colors">Home</a>
                <span>/</span>
                <span className="text-text-custom">Shop</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-text-custom">
                Maison Boutique Collection
              </h1>
            </div>

            {/* Display products count */}
            <p className="text-xs tracking-widest text-slate-400 font-inter font-medium uppercase">
              Showing {filteredProducts.length} of {mockProducts.length} Premium Pieces
            </p>
          </div>

          {/* Quick Filters Toolbar & sorting controls */}
          <div className="flex items-center justify-between border border-border-custom rounded-xl p-4 bg-card-custom shadow-sm mb-8 gap-4 flex-wrap">
            
            {/* Filter Toggle Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="flex items-center gap-2 px-4 py-2 border border-border-custom hover:border-amber-500 rounded text-xs font-semibold uppercase tracking-wider transition-colors bg-bg-custom hover:bg-amber-500/5 text-text-custom"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
              </button>

              <button
                onClick={handleResetFilters}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-text-custom"
                title="Reset Filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Sort & Grid settings */}
            <div className="flex items-center gap-4">
              
              {/* Grid Column Toggles */}
              <div className="hidden sm:flex items-center border border-border-custom rounded bg-bg-custom overflow-hidden p-[2px]">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 rounded transition-all duration-200 ${
                    gridCols === 3 ? 'bg-card-custom shadow-sm text-amber-500' : 'text-slate-400 hover:text-text-custom'
                  }`}
                  title="3 Column Grid"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 rounded transition-all duration-200 ${
                    gridCols === 4 ? 'bg-card-custom shadow-sm text-amber-500' : 'text-slate-400 hover:text-text-custom'
                  }`}
                  title="4 Column Grid"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>

              {/* Sorting dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-inter font-semibold hidden md:inline">Sort By:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-card-custom border border-border-custom rounded px-4 py-2 pr-8 text-xs font-semibold uppercase tracking-wider focus:outline-none focus:border-amber-500 text-text-custom"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest Season</option>
                    <option value="bestseller">Bestseller</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                </div>
              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar filter options - Desktop only */}
            <aside className="hidden lg:block space-y-8 p-6 border border-border-custom rounded-2xl bg-card-custom shadow-sm h-fit">
              
              {/* Category Options */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-custom border-b border-border-custom pb-2">Category</h3>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs uppercase tracking-wider text-left transition-colors font-medium ${
                        selectedCategory === cat ? 'text-amber-500 font-semibold pl-1.5 border-l-2 border-amber-500' : 'text-slate-400 hover:text-text-custom'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border-custom pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-custom">Max Price</h3>
                  <span className="text-xs font-mono font-semibold text-amber-500">${selectedPriceRange}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1500"
                  step="50"
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>

              {/* Star Rating list */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-custom border-b border-border-custom pb-2">Minimum Rating</h3>
                <div className="flex flex-col gap-2">
                  {[5, 4.8, 4.7, 4.6].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSelectedRating(selectedRating === rate ? null : rate)}
                      className={`text-xs text-left transition-all duration-200 font-mono font-medium ${
                        selectedRating === rate ? 'text-amber-500 font-semibold' : 'text-slate-400 hover:text-text-custom'
                      }`}
                    >
                      ★ {rate} and above
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors selection */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-custom border-b border-border-custom pb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-2.5 py-1 text-[10px] border uppercase rounded transition-colors font-medium font-inter ${
                        selectedColor === color 
                          ? 'border-amber-500 bg-amber-500/10 text-amber-500' 
                          : 'border-border-custom text-slate-400 hover:border-text-custom hover:text-text-custom'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes selection */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-custom border-b border-border-custom pb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-9 h-9 flex items-center justify-center text-[10px] border rounded-full transition-colors font-mono font-semibold uppercase ${
                        selectedSize === size 
                          ? 'border-accent bg-accent/15 text-accent' 
                          : 'border-border-custom text-slate-400 hover:border-text-custom hover:text-text-custom'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock switch */}
              <div className="flex items-center justify-between border-t border-border-custom pt-4">
                <span className="text-xs font-bold uppercase tracking-widest text-text-custom">In Stock Only</span>
                <button
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                    inStockOnly ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <motion.div
                    layout
                    className="bg-white w-4 h-4 rounded-full shadow-md"
                    animate={{ x: inStockOnly ? 16 : 0 }}
                  />
                </button>
              </div>

            </aside>

            {/* Product Grid display */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4 border border-border-custom border-dashed rounded-2xl bg-card-custom">
                  <Search className="w-12 h-12 text-slate-300 animate-bounce" />
                  <div>
                    <h3 className="text-lg font-medium text-text-custom">No Products Found</h3>
                    <p className="text-sm text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                      Try relaxing your filter parameters or search queries to find what you want.
                    </p>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 bg-primary text-white dark:bg-slate-100 dark:text-slate-900 rounded font-medium text-xs tracking-wider uppercase transition-transform active:scale-95"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <motion.div
                  layout
                  className={`grid grid-cols-1 sm:grid-cols-2 ${
                    gridCols === 4 ? 'xl:grid-cols-3' : ''
                  } gap-6`}
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="flex"
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

          </div>

        </div>
      </main>

      {/* Mobile Filter Drawer Overlay */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Sidebar drawer content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-full max-w-xs bg-card-custom border-r border-border-custom p-6 overflow-y-auto flex flex-col h-full lg:hidden"
            >
              
              <div className="flex items-center justify-between border-b border-border-custom pb-4 mb-6">
                <h2 className="text-lg font-light tracking-wide text-text-custom">Filter Collection</h2>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-text-custom"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 space-y-8 overflow-y-auto pr-2">
                
                {/* Category Options */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-custom border-b border-border-custom pb-2">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 text-xs rounded uppercase tracking-wider font-medium border ${
                          selectedCategory === cat 
                            ? 'border-amber-500 bg-amber-500/10 text-amber-500' 
                            : 'border-border-custom text-slate-400 hover:border-text-custom'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-border-custom pb-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-text-custom">Max Price</h3>
                    <span className="text-xs font-mono font-semibold text-amber-500">${selectedPriceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1500"
                    step="50"
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                {/* Star rating */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-custom border-b border-border-custom pb-2">Min Rating</h3>
                  <div className="flex gap-2 flex-wrap">
                    {[5, 4.8, 4.7, 4.6].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => setSelectedRating(selectedRating === rate ? null : rate)}
                        className={`px-3 py-1.5 text-xs border rounded transition-colors font-mono font-medium ${
                          selectedRating === rate 
                            ? 'border-amber-500 bg-amber-500/10 text-amber-500' 
                            : 'border-border-custom text-slate-400 hover:border-text-custom'
                        }`}
                      >
                        ★ {rate}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-custom border-b border-border-custom pb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-2.5 py-1 text-[10px] border uppercase rounded transition-colors font-medium ${
                          selectedColor === color 
                            ? 'border-amber-500 bg-amber-500/10 text-amber-500' 
                            : 'border-border-custom text-slate-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-custom border-b border-border-custom pb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-9 h-9 flex items-center justify-center text-[10px] border rounded-full transition-colors font-mono font-semibold uppercase ${
                          selectedSize === size 
                            ? 'border-accent bg-accent/15 text-accent' 
                            : 'border-border-custom text-slate-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock switches */}
                <div className="flex items-center justify-between border-t border-border-custom pt-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-text-custom">In Stock Only</span>
                  <button
                    onClick={() => setInStockOnly(!inStockOnly)}
                    className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                      inStockOnly ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <motion.div
                      layout
                      className="bg-white w-4 h-4 rounded-full shadow-md"
                      animate={{ x: inStockOnly ? 16 : 0 }}
                    />
                  </button>
                </div>

              </div>

              {/* Draw bottom action triggers */}
              <div className="pt-6 mt-6 border-t border-border-custom flex gap-3">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-3 border border-border-custom text-slate-600 dark:text-slate-300 rounded font-semibold text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="flex-1 py-3 bg-primary text-white dark:bg-slate-100 dark:text-slate-900 rounded font-semibold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Apply
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Premium Footer */}
      <Footer />

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-custom text-text-custom gap-4 font-poppins">
        <span className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] tracking-[0.25em] text-slate-500 uppercase font-mono">Loading Maison Boutique...</span>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
