'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, MessageCircle } from 'lucide-react';
import { Instagram } from '@/components/ui/SocialIcons';
import { motion } from 'framer-motion';

interface InstaPost {
  image: string;
  likes: string;
  comments: string;
}

export const InstagramGallery: React.FC = () => {
  const posts: InstaPost[] = [
    {
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop',
      likes: '1.4k',
      comments: '64',
    },
    {
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400&auto=format&fit=crop',
      likes: '942',
      comments: '38',
    },
    {
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&auto=format&fit=crop',
      likes: '2.1k',
      comments: '112',
    },
    {
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop',
      likes: '1.8k',
      comments: '95',
    },
    {
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop',
      likes: '1.2k',
      comments: '44',
    },
    {
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop',
      likes: '3.4k',
      comments: '210',
    },
  ];

  return (
    <section className="py-24 bg-bg-custom text-text-custom border-b border-border-custom relative z-10 font-poppins">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="p-3 bg-amber-500/10 dark:bg-amber-500/5 text-amber-500 rounded-full flex items-center justify-center w-max mx-auto">
            <Instagram className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold">
            Social Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-text-custom">
            Shop the Look on Instagram
          </h2>
          <p className="text-xs text-slate-400 font-inter">
            Tag <span className="font-semibold text-text-custom">@MaisonAurum</span> for a chance to be featured in our monthly lookbook.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, idx) => (
            <motion.a
              key={idx}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="relative aspect-square rounded-xl overflow-hidden border border-border-custom shadow-sm group cursor-pointer"
            >
              {/* Photo */}
              <Image
                src={post.image}
                alt="Instagram Outfit"
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 text-white text-xs z-10">
                <Instagram className="w-5 h-5 text-amber-500 mb-1" />
                <div className="flex items-center gap-4 font-mono font-medium">
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 fill-white text-white" /> {post.comments}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};
