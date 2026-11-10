'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Lock, RefreshCw } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      title: 'Premium Quality',
      description: 'Crafted with top-grade materials, certified diamonds, and genuine full-grain leather.'
    },
    {
      icon: <Truck className="w-6 h-6 text-amber-500" />,
      title: 'White-Glove Delivery',
      description: 'Dispatched with premium couriers in signature secure luxury packaging.'
    },
    {
      icon: <Lock className="w-6 h-6 text-amber-500" />,
      title: 'Secured Transactions',
      description: 'Processed through high-encryption secure servers protecting client credentials.'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-amber-500" />,
      title: 'Concierge Returns',
      description: 'Enjoy 30 days of seamless complimentary pickup and replacement options.'
    }
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  } as const;

  return (
    <section className="py-24 bg-slate-950 text-white relative z-10 overflow-hidden font-poppins">
      
      {/* Background soft glowing blur */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-violet-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Narrative */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold">
            Uncompromising Excellence
          </span>
          
          <h2 className="text-3xl sm:text-4xl font-light tracking-wide leading-snug">
            Why Discerning Clients Choose <span className="font-normal text-amber-500">Maison Aurum</span>
          </h2>
          
          <p className="text-sm font-light text-slate-400 leading-relaxed font-inter">
            Since our founding, we have curated exclusive fashion items and high-end watches for collectors globally. We combine classical craft styles with modern secure checkout flows.
          </p>

          <div className="pt-4 border-t border-slate-900 grid grid-cols-2 gap-4">
            <div>
              <p className="text-3xl font-light text-white font-mono">100%</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Authentic Guarantee</p>
            </div>
            <div>
              <p className="text-3xl font-light text-white font-mono">12+ hr</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Average Response</p>
            </div>
          </div>
        </div>

        {/* Right Column: Grid points */}
        <div className="lg:col-span-7">
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {points.map((point, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className="p-6 border border-slate-900 bg-slate-900/30 rounded-xl relative group cursor-pointer hover:border-slate-800 transition-colors"
              >
                {/* Glowing glow circle back */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 transition-all duration-300 rounded-xl pointer-events-none" />

                <div className="flex items-start gap-4">
                  {/* Icon with slow rotation on hover */}
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg group-hover:rotate-[360deg] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]">
                    {point.icon}
                  </div>
                  <div className="text-left space-y-1">
                    <h3 className="text-sm font-semibold tracking-wide text-white">
                      {point.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-light leading-relaxed font-inter">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
