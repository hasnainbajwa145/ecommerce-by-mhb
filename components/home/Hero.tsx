'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play, Star, ShieldCheck, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring motion
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax shifts for background blobs & floating items
  const bgShiftX = useTransform(smoothX, [-300, 300], [-30, 30]);
  const bgShiftY = useTransform(smoothY, [-300, 300], [-30, 30]);
  const imgShiftX = useTransform(smoothX, [-300, 300], [-15, 15]);
  const imgShiftY = useTransform(smoothY, [-300, 300], [-15, 15]);

  // Statistics counters
  const [stats, setStats] = useState({ clients: 0, orders: 0, rating: 0 });

  useEffect(() => {
    // Scroll progress / counters start
    const duration = 2.5; // in seconds
    const endClients = 500; // in thousands (500K)
    const endOrders = 20; // in thousands (20K)
    const endRating = 99; // percent

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      setStats({
        clients: Math.floor(progress * endClients),
        orders: Math.floor(progress * endOrders),
        rating: Math.floor(progress * endRating),
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);

    // Mouse movement callback for parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Calculate coordinates relative to center of viewport
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const headline = "Redefining Luxury & Modern Style";
  const words = headline.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-24 pb-16"
    >
      {/* Background Aurora Mesh Gradients */}
      <motion.div 
        style={{ x: bgShiftX, y: bgShiftY }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-violet-900/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-900/10 blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[45%] w-80 h-80 rounded-full bg-amber-900/5 blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </motion.div>

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* Left Column: Headline and Descriptions */}
        <div className="lg:col-span-7 space-y-8 flex flex-col items-start text-left">
          
          {/* Promotional Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Summer Collection 2026 • Up to 50% Off</span>
          </motion.div>

          {/* Headline Word-by-Word Slide Up */}
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight leading-[1.1] font-poppins text-white max-w-2xl">
            {words.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden mr-3">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: idx * 0.08 + 0.3 
                  }}
                  className={`inline-block ${
                    word === 'Luxury' || word === 'Style' 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 font-normal drop-shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
                      : ''
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-slate-400 font-light text-base sm:text-lg leading-relaxed max-w-xl font-inter"
          >
            Indulge in carefully curated pieces from international ateliers. Experience design, fabrics, and fit tailored for the connoisseur of modern fashion.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap gap-4 items-center"
          >
            {/* Magnetic/Glow Button 1 */}
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold tracking-wider rounded-md text-sm shadow-xl shadow-amber-500/10 hover:scale-[1.03] transition-all duration-250 active:scale-[0.98] group"
            >
              Shop Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Watch Runway Button 2 */}
            <button
              onClick={() => {
                alert('Runway video player modal coming soon!');
              }}
              className="inline-flex items-center gap-2 px-6 py-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-white font-semibold tracking-wider rounded-md text-sm hover:scale-[1.03] transition-all duration-250 active:scale-[0.98]"
            >
              <Play className="w-4 h-4 text-amber-500 fill-amber-500" />
              Watch Runway
            </button>
          </motion.div>

          {/* Statistics Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="grid grid-cols-3 gap-6 sm:gap-12 border-t border-slate-900 pt-8 w-full max-w-lg"
          >
            <div>
              <p className="text-2xl sm:text-3xl font-light font-mono text-white">
                {stats.clients}K+
              </p>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Happy Clients</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-light font-mono text-white">
                {stats.orders}K+
              </p>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Premium Orders</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-light font-mono text-amber-500">
                {stats.rating}%
              </p>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Satisfaction</p>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Hero Image with Floating Cards */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          {/* Main Hero Image Container */}
          <motion.div
            style={{ x: imgShiftX, y: imgShiftY }}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="relative w-full max-w-[380px] aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group cursor-pointer"
          >
            {/* Soft Reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 via-transparent to-white/5 z-10 pointer-events-none" />
            
            {/* Image zoom on hover */}
            <Image
              src="/images/luxury_hero.png"
              alt="Luxury Fashion Model"
              fill
              priority
              className="object-cover group-hover:scale-[1.04] transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
          </motion.div>

          {/* Floating Card 1: Star Rating */}
          <motion.div
            style={{ y: useTransform(smoothY, [-300, 300], [-25, 25]) }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="absolute top-10 -left-10 glass-panel p-3.5 rounded-xl border border-white/10 shadow-lg flex items-center gap-3 backdrop-blur-md max-w-[170px]"
          >
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white">4.9 Rating</p>
              <p className="text-[9px] text-slate-400 font-light">12k+ Global Reviews</p>
            </div>
          </motion.div>

          {/* Floating Card 2: Quality Shield */}
          <motion.div
            style={{ y: useTransform(smoothY, [-300, 300], [25, -25]) }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="absolute bottom-16 -right-8 glass-panel p-3.5 rounded-xl border border-white/10 shadow-lg flex items-center gap-3 backdrop-blur-md max-w-[170px]"
          >
            <div className="p-2 bg-violet-500/10 text-violet-400 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-violet-400" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white">Premium Quality</p>
              <p className="text-[9px] text-slate-400 font-light">100% Fine Fabrics</p>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: [0, 8, 0] }}
        transition={{ 
          opacity: { duration: 0.5, delay: 2 },
          y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' }
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-slate-500 font-light font-inter">Scroll Down</span>
        <div className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-amber-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};
