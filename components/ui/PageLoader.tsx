'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PageLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = '';
          }, 400); // Small delay for visual completion
          return 100;
        }
        // Random incremental steps for custom feel
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -50,
            filter: 'blur(20px)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950 text-white"
        >
          {/* Shimmering Aurora background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(139,92,246,0.15),transparent_60%)] animate-pulse-slow pointer-events-none" />
          
          {/* Loading Container */}
          <div className="relative flex flex-col items-center max-w-xs text-center px-4">
            
            {/* Animated Logo */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-extralight tracking-[0.4em] text-amber-500 font-poppins mb-2 drop-shadow-[0_0_15px_rgba(245,158,11,0.25)]"
            >
              A U R U M
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-inter mb-12"
            >
              Haute Couture & Luxury Living
            </motion.p>

            {/* Premium Progress Circle / Line */}
            <div className="relative w-48 h-[1px] bg-slate-800 overflow-hidden mb-4">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-violet-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Counter */}
            <motion.span 
              className="text-xs font-light tracking-widest text-amber-500 font-mono"
            >
              {progress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
