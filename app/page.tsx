import React from 'react';
import { AnnouncementBar } from '@/components/home/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { BrandTrust } from '@/components/home/BrandTrust';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { FlashSale } from '@/components/home/FlashSale';
import { TrendingProducts } from '@/components/home/TrendingProducts';
import { PromotionalBanner } from '@/components/home/PromotionalBanner';
import { BestSellers } from '@/components/home/BestSellers';
import { NewArrivals } from '@/components/home/NewArrivals';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CustomerTestimonials } from '@/components/home/CustomerTestimonials';
import { BrandPartners } from '@/components/home/BrandPartners';
import { InstagramGallery } from '@/components/home/InstagramGallery';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      
      {/* Dynamic Announcement Line */}
      <AnnouncementBar />

      {/* Global Luxury Sticky Header */}
      <Navbar />

      {/* Main Home Sections */}
      <main className="flex-1">
        
        {/* Cinematic Hero */}
        <Hero />

        {/* Support Points Grid */}
        <BrandTrust />

        {/* Product categories */}
        <FeaturedCategories />

        {/* Flash Sale Countdown Banner */}
        <FlashSale />

        {/* Tab-filtered Trending Products */}
        <TrendingProducts />

        {/* Campaign Banner Details */}
        <PromotionalBanner />

        {/* Bestseller Grid */}
        <BestSellers />

        {/* Unique Selling Props */}
        <WhyChooseUs />

        {/* New arrivals line */}
        <NewArrivals />

        {/* Client quotes */}
        <CustomerTestimonials />

        {/* Brand logos marquee */}
        <BrandPartners />

        {/* Social Instagram grid */}
        <InstagramGallery />

      </main>

      {/* Premium Footer */}
      <Footer />
      
    </div>
  );
}
