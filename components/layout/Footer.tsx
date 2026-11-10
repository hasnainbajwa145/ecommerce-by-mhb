'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Mail, Check, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Youtube } from '@/components/ui/SocialIcons';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setLoading(true);
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }
  };

  const footerLinks = [
    {
      title: 'Collections',
      links: [
        { label: 'New Arrivals', href: '/shop?sort=newest' },
        { label: 'Bestsellers', href: '/shop?sort=bestsellers' },
        { label: 'Summer Edition', href: '/collections/summer' },
        { label: 'Luxury Accessories', href: '/shop?category=accessories' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Store Locator', href: '/stores' },
        { label: 'Sustainability', href: '/sustainability' },
      ],
    },
    {
      title: 'Customer Care',
      links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'Shipping & Returns', href: '/shipping' },
        { label: 'Size Guide', href: '/sizes' },
        { label: 'FAQs', href: '/faqs' },
      ],
    },
  ];

  return (
    <footer className="relative bg-slate-950 text-slate-400 pt-24 pb-12 overflow-hidden border-t border-slate-900 font-inter">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(circle_at_bottom,rgba(139,92,246,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Top Newsletter & Logo Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16 border-b border-slate-900">

          {/* Brand Info */}
          <div className="space-y-6">
            <span className="text-3xl font-light tracking-[0.25em] text-white font-poppins">
              AURUM
            </span>
            <p className="text-sm font-light leading-relaxed max-w-sm text-slate-400">
              Experience the pinnacle of luxury, curation, and craftsmanship. Our collections embody the synergy of modern aesthetics and classic sophistication.
            </p>

            {/* Social Icons with Float Effects */}
            <div className="flex gap-4">
              {[
                { icon: <Instagram className="w-4 h-4" />, href: 'https://instagram.com' },
                { icon: <Facebook className="w-4 h-4" />, href: 'https://facebook.com' },
                { icon: <Twitter className="w-4 h-4" />, href: 'https://twitter.com' },
                { icon: <Youtube className="w-4 h-4" />, href: 'https://youtube.com' },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-slate-800 rounded-full hover:border-amber-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] bg-slate-950"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-light tracking-wide text-white">Join the Inner Circle</h3>
              <p className="text-xs font-light text-slate-400 mt-1">
                Receive exclusive previews, collections launches, and premium styling newsletters.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="relative group max-w-md">
              <div className="flex overflow-hidden rounded-md border border-slate-800 focus-within:border-amber-500 transition-colors bg-slate-900/40">
                <div className="flex items-center px-4 text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  disabled={subscribed || loading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 py-3.5 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none pr-4 font-light"
                />
                <button
                  type="submit"
                  disabled={subscribed || loading}
                  className="px-6 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 transition-all duration-250 active:scale-95 disabled:bg-none disabled:bg-emerald-500 disabled:text-white"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : subscribed ? (
                    <>
                      <Check className="w-4 h-4" />
                      Joined
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Success state tick indicator animation */}
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-emerald-400 mt-2 font-medium"
                >
                  Success! You have subscribed to our mailing list.
                </motion.p>
              )}
            </form>
          </div>

        </div>

        {/* Middle Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-slate-400 hover:text-white hover:pl-1 transition-all duration-200 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              Contact
            </h4>
            <address className="not-italic text-sm font-light space-y-2.5">
              <p>Maison Aurum Headquarters</p>
              <p>12 Avenue Montaigne, 75008 Paris</p>
              <p className="pt-2">
                Email:{' '}
                <a href="mailto:concierge@aurum.com" className="hover:text-white underline">
                  concierge@aurum.com
                </a>
              </p>
              <p>
                Phone:{' '}
                <a href="tel:+331804245" className="hover:text-white underline">
                  +33 (0) 1 80 42 45
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom copyright block */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-light gap-4">
          <p>© {new Date().getFullYear()} AURUM. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Use</Link>
            <Link href="/accessibility" className="hover:text-white">Accessibility</Link>
          </div>

          <div>

          </div>

        </div>
      </div>
    </footer>
  );
};

