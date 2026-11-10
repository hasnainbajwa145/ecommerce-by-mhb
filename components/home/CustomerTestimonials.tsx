'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  image: string;
  text: string;
}

export const CustomerTestimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Victoria Vance',
      role: 'Fashion Consultant',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      text: 'Maison Aurum has completely elevated my curated wardrobe. The virgin wool blazers fit with precision tailors. The packaging feels like opening an event in Paris.',
    },
    {
      name: 'Maximilian Cole',
      role: 'Timepiece Collector',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      text: 'The Saffiano leather texture is pristine, and the Chronograph Watch functions flawlessly. Customer care concierge service is fast and extremely professional.',
    },
    {
      name: 'Elena Rostova',
      role: 'Interior Designer',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      text: 'I ordered the diamond solitaire ring for an anniversary gift. Outstanding craftsmanship and direct certification paperwork was attached. Aurum is my favorite luxury outlet.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-bg-custom text-text-custom border-b border-border-custom relative z-10 font-poppins">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-text-custom">
            Client Experiences
          </h2>
          <div className="w-12 h-[1px] bg-amber-500 mx-auto" />
        </div>

        {/* Carousel Slide Card wrapper */}
        <div className="relative min-h-[320px] sm:min-h-[250px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="p-8 rounded-2xl border border-border-custom bg-card-custom shadow-md max-w-2xl relative space-y-6"
            >
              {/* Quote marks */}
              <Quote className="w-10 h-10 text-amber-500/10 absolute top-4 left-4" />

              {/* Rating stars */}
              <div className="flex justify-center gap-1 text-amber-500">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm sm:text-base font-light leading-relaxed italic text-slate-500 dark:text-slate-400 font-inter">
                "{testimonials[activeIndex].text}"
              </p>

              {/* User profile */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border-custom">
                  <Image
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-text-custom">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Nav Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-border-custom bg-card-custom hover:bg-slate-50 text-slate-400 hover:text-text-custom transition-colors shadow-md hidden sm:flex"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-border-custom bg-card-custom hover:bg-slate-50 text-slate-400 hover:text-text-custom transition-colors shadow-md hidden sm:flex"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Indicator dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'bg-amber-500 w-6' : 'bg-slate-300 dark:bg-slate-700'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
