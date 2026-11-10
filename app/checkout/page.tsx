'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { AnnouncementBar } from '@/components/home/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  CreditCard, 
  Truck, 
  Check, 
  ChevronRight, 
  MapPin, 
  ShoppingBag, 
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, discountAmount, cartSubtotal, shippingFee, clearCart } = useCart();

  // Step state
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [shippingForm, setShippingForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    shippingMethod: 'standard'
  });

  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    method: 'card' // card, paypal, apple
  });

  const [loading, setLoading] = useState(false);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!shippingForm.name || !shippingForm.email || !shippingForm.address || !shippingForm.city || !shippingForm.zip) {
        alert('Please complete all required fields.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (paymentForm.method === 'card') {
        if (!paymentForm.cardName || !paymentForm.cardNumber || !paymentForm.expiry || !paymentForm.cvv) {
          alert('Please enter your card payment details.');
          return;
        }
      }
      setStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    // Mock network lag
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    
    // Clear global cart items
    clearCart();
    
    // Redirect to success page
    const randomOrderId = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    router.push(`/checkout/success?orderId=${randomOrderId}`);
  };

  return (
    <div className="flex flex-col min-h-screen relative font-poppins bg-bg-custom text-text-custom">
      
      {/* Announcement bar */}
      <AnnouncementBar />

      {/* Sticky Header */}
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Checkout Steps Progress indicators */}
          <div className="flex justify-center items-center gap-2 mb-12 flex-wrap">
            {[
              { num: 1, label: 'Shipping' },
              { num: 2, label: 'Payment' },
              { num: 3, label: 'Confirmation' }
            ].map((s) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold font-mono border-2 transition-all ${
                    step >= s.num 
                      ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-500/10' 
                      : 'border-border-custom bg-transparent text-slate-400'
                  }`}>
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`text-xs uppercase tracking-wider font-semibold ${
                    step >= s.num ? 'text-text-custom' : 'text-slate-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {s.num < 3 && (
                  <ChevronRight className="w-4 h-4 text-slate-300 mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Columns: Inputs forms based on active step */}
            <div className="lg:col-span-8 p-6 sm:p-8 border border-border-custom bg-card-custom rounded-2xl shadow-sm text-left space-y-8">
              
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 border-b border-border-custom pb-3 mb-6">
                      <MapPin className="w-5 h-5 text-amber-500" />
                      <h2 className="text-xl font-light tracking-wide text-text-custom">Shipping Address</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={shippingForm.name}
                          onChange={handleShippingChange}
                          placeholder="e.g. Johnathan Vance"
                          className="px-4 py-3 border border-border-custom rounded-lg bg-bg-custom text-sm focus:outline-none focus:border-amber-500 font-inter"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={shippingForm.email}
                          onChange={handleShippingChange}
                          placeholder="e.g. concierge@aurum.com"
                          className="px-4 py-3 border border-border-custom rounded-lg bg-bg-custom text-sm focus:outline-none focus:border-amber-500 font-inter"
                        />
                      </div>
                      <div className="flex flex-col gap-2 sm:col-span-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Street Address *</label>
                        <input
                          type="text"
                          name="address"
                          required
                          value={shippingForm.address}
                          onChange={handleShippingChange}
                          placeholder="e.g. 12 Avenue Montaigne"
                          className="px-4 py-3 border border-border-custom rounded-lg bg-bg-custom text-sm focus:outline-none focus:border-amber-500 font-inter"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">City *</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={shippingForm.city}
                          onChange={handleShippingChange}
                          placeholder="e.g. Paris"
                          className="px-4 py-3 border border-border-custom rounded-lg bg-bg-custom text-sm focus:outline-none focus:border-amber-500 font-inter"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">ZIP / Postal Code *</label>
                        <input
                          type="text"
                          name="zip"
                          required
                          value={shippingForm.zip}
                          onChange={handleShippingChange}
                          placeholder="e.g. 75008"
                          className="px-4 py-3 border border-border-custom rounded-lg bg-bg-custom text-sm focus:outline-none focus:border-amber-500 font-inter font-mono"
                        />
                      </div>
                      <div className="flex flex-col gap-2 sm:col-span-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={shippingForm.phone}
                          onChange={handleShippingChange}
                          placeholder="e.g. +33 1 80 42 45"
                          className="px-4 py-3 border border-border-custom rounded-lg bg-bg-custom text-sm focus:outline-none focus:border-amber-500 font-inter font-mono"
                        />
                      </div>
                    </div>

                    {/* Next action trigger */}
                    <div className="pt-6 border-t border-border-custom flex justify-end">
                      <button
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-lg active:scale-95 transition-transform"
                      >
                        Continue to Payment
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 border-b border-border-custom pb-3 mb-6">
                      <CreditCard className="w-5 h-5 text-amber-500" />
                      <h2 className="text-xl font-light tracking-wide text-text-custom">Payment Details</h2>
                    </div>

                    {/* Method Selector */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { id: 'card', name: 'Credit Card' },
                        { id: 'paypal', name: 'PayPal' },
                        { id: 'apple', name: 'Apple Pay' }
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setPaymentForm(prev => ({ ...prev, method: m.id }))}
                          className={`py-3.5 border rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                            paymentForm.method === m.id 
                              ? 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-sm' 
                              : 'border-border-custom bg-transparent text-slate-400 hover:border-text-custom hover:text-text-custom'
                          }`}
                        >
                          {m.name}
                        </button>
                      ))}
                    </div>

                    {paymentForm.method === 'card' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Real-time styled card mockup */}
                        <div className="sm:col-span-2 relative w-full h-44 rounded-xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 text-white p-6 shadow-xl flex flex-col justify-between overflow-hidden border border-slate-700">
                          {/* Reflective glow overlay */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_50%)]" />
                          <div className="flex justify-between items-start z-10">
                            <span className="text-xs font-light tracking-[0.2em]">AURUM BANK</span>
                            <span className="text-xs font-semibold font-mono text-amber-500">GOLD ACCESS</span>
                          </div>
                          
                          <div className="z-10">
                            <p className="text-sm font-semibold font-mono tracking-widest">
                              {paymentForm.cardNumber || '•••• •••• •••• ••••'}
                            </p>
                          </div>
                          
                          <div className="flex justify-between items-end z-10">
                            <div>
                              <p className="text-[8px] uppercase tracking-widest text-slate-500">Cardholder</p>
                              <p className="text-xs font-medium uppercase truncate max-w-[180px]">
                                {paymentForm.cardName || 'MEMBER SINCE 2026'}
                              </p>
                            </div>
                            <div>
                              <p className="text-[8px] uppercase tracking-widest text-slate-500">Expiry</p>
                              <p className="text-xs font-medium font-mono">
                                {paymentForm.expiry || 'MM/YY'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Input Fields */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Cardholder Name *</label>
                          <input
                            type="text"
                            name="cardName"
                            required
                            value={paymentForm.cardName}
                            onChange={handlePaymentChange}
                            placeholder="e.g. Johnathan Vance"
                            className="px-4 py-3 border border-border-custom rounded-lg bg-bg-custom text-sm focus:outline-none focus:border-amber-500 font-inter"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Card Number *</label>
                          <input
                            type="text"
                            name="cardNumber"
                            required
                            maxLength={19}
                            value={paymentForm.cardNumber}
                            onChange={handlePaymentChange}
                            placeholder="e.g. 4000 1234 5678 9010"
                            className="px-4 py-3 border border-border-custom rounded-lg bg-bg-custom text-sm focus:outline-none focus:border-amber-500 font-inter font-mono"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Expiry Date *</label>
                          <input
                            type="text"
                            name="expiry"
                            required
                            maxLength={5}
                            value={paymentForm.expiry}
                            onChange={handlePaymentChange}
                            placeholder="e.g. MM/YY"
                            className="px-4 py-3 border border-border-custom rounded-lg bg-bg-custom text-sm focus:outline-none focus:border-amber-500 font-inter font-mono"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-inter">Security Code (CVV) *</label>
                          <input
                            type="password"
                            name="cvv"
                            required
                            maxLength={4}
                            value={paymentForm.cvv}
                            onChange={handlePaymentChange}
                            placeholder="e.g. 123"
                            className="px-4 py-3 border border-border-custom rounded-lg bg-bg-custom text-sm focus:outline-none focus:border-amber-500 font-inter font-mono"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 bg-bg-custom border border-border-custom rounded-lg p-6">
                        <Lock className="w-10 h-10 text-amber-500" />
                        <h3 className="text-sm font-semibold text-text-custom">Instant Integration Enabled</h3>
                        <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-inter">
                          You will be secure redirected to {paymentForm.method.toUpperCase()} portal details to finalize payments after confirmation review.
                        </p>
                      </div>
                    )}

                    {/* Back / Next action buttons */}
                    <div className="pt-6 border-t border-border-custom flex justify-between">
                      <button
                        onClick={() => setStep(1)}
                        className="px-6 py-3 border border-border-custom text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-lg active:scale-95 transition-transform"
                      >
                        Review Order
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 border-b border-border-custom pb-3 mb-6">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <h2 className="text-xl font-light tracking-wide text-text-custom">Final Confirmation</h2>
                    </div>

                    {/* Display shipping & payment details summaries */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border border-border-custom rounded-xl p-6 bg-bg-custom text-sm font-inter">
                      <div className="space-y-2 text-left">
                        <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold font-poppins">Shipping details</h4>
                        <p className="font-semibold text-text-custom">{shippingForm.name}</p>
                        <p className="text-slate-500">{shippingForm.address}, {shippingForm.city}</p>
                        <p className="text-slate-500">ZIP {shippingForm.zip} • {shippingForm.phone}</p>
                      </div>
                      
                      <div className="space-y-2 text-left sm:border-l border-border-custom sm:pl-6">
                        <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold font-poppins">Payment method</h4>
                        {paymentForm.method === 'card' ? (
                          <>
                            <p className="font-semibold text-text-custom">Card ending in •••• {paymentForm.cardNumber.slice(-4)}</p>
                            <p className="text-slate-500">Owner: {paymentForm.cardName}</p>
                          </>
                        ) : (
                          <p className="font-semibold text-text-custom">{paymentForm.method.toUpperCase()} secure gateway</p>
                        )}
                      </div>
                    </div>

                    {/* Items review block inside Step 3 (very visible for mobile layout check) */}
                    <div className="border border-border-custom rounded-xl p-6 bg-bg-custom text-left space-y-4">
                      <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold font-poppins">Items to Purchase</h4>
                      <div className="divide-y divide-border-custom">
                        {cartItems.map((item) => (
                          <div key={`${item.id}-${item.size ?? ''}-${item.color ?? ''}`} className="py-3 flex justify-between items-center text-sm font-inter">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-12 rounded overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-semibold text-text-custom leading-tight">{item.name}</p>
                                <p className="text-xs text-slate-400 mt-1">
                                  Quantity: <span className="font-semibold text-text-custom font-mono">{item.quantity}</span>
                                  {item.size && ` • Size: ${item.size}`}
                                  {item.color && ` • Color: ${item.color}`}
                                </p>
                              </div>
                            </div>
                            <span className="font-mono text-amber-500 font-semibold">
                              ${((item.discountPrice ?? item.price) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="py-4 text-xs font-light text-slate-500 leading-relaxed font-inter">
                      By placing this order, you authorize Maison Aurum to dispatch couriers to your address under standard shipping protocols. Fully refundable under our 30-day policy.
                    </div>

                    {/* Back / Place Order action triggers */}
                    <div className="pt-6 border-t border-border-custom flex justify-between">
                      <button
                        onClick={() => setStep(2)}
                        className="px-6 py-3 border border-border-custom text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold uppercase tracking-wider rounded-lg shadow-lg active:scale-95 transition-transform disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Place Premium Order
                            <Check className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Right Columns: Summary checkout cart sidebar */}
            <div className="lg:col-span-4 p-6 border border-border-custom bg-card-custom rounded-2xl shadow-sm text-left space-y-6">
              
              <div className="flex items-center gap-2 border-b border-border-custom pb-3">
                <ShoppingBag className="w-4.5 h-4.5 text-accent" />
                <h3 className="text-sm font-semibold tracking-wide text-text-custom uppercase font-poppins">Order Summary</h3>
              </div>

              {/* Items List inside summary */}
              <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size ?? ''}-${item.color ?? ''}`} className="flex gap-3 text-xs">
                    <div className="relative w-12 h-16 rounded overflow-hidden bg-slate-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-text-custom line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-slate-400 mt-1 font-inter">
                          Quantity: <span className="font-semibold text-text-custom font-mono">{item.quantity}</span>
                          {item.size && ` • Size: ${item.size}`}
                          {item.color && ` • Color: ${item.color}`}
                        </p>
                      </div>
                      <span className="font-mono text-amber-500 font-semibold">
                        ${((item.discountPrice ?? item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal blocks */}
              <div className="border-t border-border-custom pt-4 space-y-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-text-custom font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-medium">
                    <span>Discount (20%)</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono text-text-custom font-medium">
                    {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-border-custom pt-3 mt-1 flex justify-between text-base font-semibold text-text-custom">
                  <span>Total</span>
                  <span className="font-mono text-amber-500">${cartSubtotal.toFixed(2)}</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Premium Footer */}
      <Footer />

    </div>
  );
}
