'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  LogOut, 
  UserRound, 
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout, isAuthenticated } = useAuth();

  // Component UI States
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const [mounted, setMounted] = useState(false);

  // Search parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(['Gold Ring', 'Luxury Bag', 'Chronograph Watch']);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      // Background shift on scroll
      setIsScrolled(window.scrollY > 20);

      // Scroll progress percentage calculation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsProfileDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'About', href: '/about' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (!recentSearches.includes(searchQuery.trim())) {
        setRecentSearches(prev => [searchQuery.trim(), ...prev.slice(0, 4)]);
      }
      // Redirect to shop page with search query parameter (to be implemented)
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'top-0 glass-panel shadow-md py-4' 
            : 'top-9 md:top-10 bg-transparent py-6 border-b border-transparent'
        }`}
      >
        {/* Scroll Progress Bar */}
        <div 
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 via-violet-500 to-blue-500 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo with letter anim */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-2xl font-light tracking-[0.25em] text-text-custom font-poppins drop-shadow-sm">
              <span className="text-amber-500 font-medium">A</span>URUM
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-widest font-light transition-colors relative py-1 hover:text-text-custom ${
                    isActive ? 'text-text-custom font-medium' : 'text-slate-400'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-amber-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4">
            
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-text-custom"
              aria-label="Search"
            >
              <Search className="w-5 h-5 font-light" />
            </button>



            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-text-custom relative group"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistItems.length > 0 ? 'fill-red-500 text-red-500 animate-pulse' : ''}`} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-text-custom relative group"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-115 transition-transform" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-accent text-white text-[10px] font-semibold font-mono w-4 h-4 rounded-full flex items-center justify-center border border-card-custom"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Profile Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-text-custom flex items-center"
                aria-label="Profile"
              >
                <User className="w-5 h-5" />
              </button>
              
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setIsProfileDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-card-custom border border-border-custom rounded-lg shadow-xl py-2 z-40"
                    >
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-2 border-b border-border-custom">
                            <p className="text-xs text-slate-400">Signed in as</p>
                            <p className="text-sm font-semibold truncate text-text-custom">{user?.name}</p>
                          </div>
                          <Link
                            href="/profile"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <UserRound className="w-4 h-4" />
                            My Profile
                          </Link>
                          <button
                            onClick={() => {
                              logout();
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/login"
                            className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors font-medium"
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/register"
                            className="block px-4 py-2 text-sm text-accent hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors font-medium"
                          >
                            Create Account
                          </Link>
                        </>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-text-custom md:hidden"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </header>

      {/* Slide-out Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 z-30 w-full max-w-xs bg-card-custom border-l border-border-custom p-8 flex flex-col md:hidden"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-text-custom"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-6 text-lg font-light tracking-widest">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-amber-500 py-1 transition-colors border-b border-slate-100 dark:border-slate-800 pb-2 text-text-custom"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto space-y-4 pt-6 border-t border-border-custom">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2 text-center text-sm text-red-500 border border-red-500/20 hover:bg-red-50 dark:hover:bg-red-950/10 rounded"
                  >
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full py-2 text-center text-sm font-medium border border-border-custom hover:bg-slate-50 rounded text-text-custom"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full py-2 text-center text-sm font-medium bg-primary text-white dark:bg-slate-100 dark:text-slate-900 rounded"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Premium Full-screen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col justify-start"
          >
            <div className="max-w-3xl mx-auto w-full px-6 pt-24 pb-8 flex flex-col h-full justify-between">
              
              <div>
                {/* Search close */}
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-xl font-light tracking-[0.2em] text-amber-500">SEARCH</h2>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Input form */}
                <form onSubmit={handleSearchSubmit} className="relative mb-8">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search gold rings, leather bags, watch pieces..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-2xl font-light tracking-wide bg-transparent border-b border-slate-700 py-4 pr-12 focus:outline-none focus:border-amber-500 text-white placeholder-slate-500 transition-colors font-poppins"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <Search className="w-6 h-6" />
                  </button>
                </form>

                {/* Search Metadata/Hints */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                  
                  {/* Recent Searches */}
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" /> Recent Searches
                    </h3>
                    <ul className="space-y-2.5">
                      {recentSearches.map((term, i) => (
                        <li key={i}>
                          <button
                            onClick={() => {
                              setSearchQuery(term);
                            }}
                            className="text-sm font-light text-slate-300 hover:text-amber-500 transition-colors text-left"
                          >
                            {term}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trending Queries */}
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5" /> Trending Now
                    </h3>
                    <ul className="space-y-2.5">
                      {['Minimalist Diamond Ring', 'Italian Leather Boots', 'Luxury Chronograph Chronos', 'Amber Velvet Blouse'].map((term, i) => (
                        <li key={i}>
                          <button
                            onClick={() => setSearchQuery(term)}
                            className="text-sm font-light text-slate-300 hover:text-amber-500 transition-colors flex items-center gap-2"
                          >
                            <span className="text-amber-500/60 font-mono text-xs">0{i+1}</span>
                            {term}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* Quick instructions / Help */}
              <div className="border-t border-slate-800 pt-6 mt-12 flex justify-between items-center text-xs text-slate-500">
                <span>Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono">ESC</kbd> to exit search</span>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  View All Products <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Shopping Cart Sidebar Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
