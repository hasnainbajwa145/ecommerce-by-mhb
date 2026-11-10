'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string, size?: string, color?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  cartSubtotal: number;
  applyCoupon: (code: string) => boolean;
  couponApplied: string | null;
  discountAmount: number;
  shippingFee: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponApplied, setCouponApplied] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('luxury_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart data', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('luxury_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const quantityToAdd = item.quantity ?? 1;
    const existingItem = cartItems.find(
      (i) => i.id === item.id && i.size === item.size && i.color === item.color
    );

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((i) =>
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + quantityToAdd }
            : i
        )
      );
      toast.success(`Updated ${item.name} quantity to ${existingItem.quantity + quantityToAdd} in cart.`);
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: quantityToAdd }]);
      toast.success(`${item.name} added to cart.`);
    }
  };

  const removeFromCart = (id: string, size?: string, color?: string) => {
    const itemToRemove = cartItems.find((i) => i.id === id && i.size === size && i.color === color);
    if (itemToRemove) {
      setCartItems((prevItems) =>
        prevItems.filter((i) => !(i.id === id && i.size === size && i.color === color))
      );
      toast.error(`${itemToRemove.name} removed from cart.`);
    }
  };

  const updateQuantity = (id: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponApplied(null);
    setDiscountAmount(0);
    toast.success('Cart cleared.');
  };

  const applyCoupon = (code: string): boolean => {
    const sanitizedCode = code.trim().toUpperCase();
    if (sanitizedCode === 'LUXURY20') {
      setCouponApplied('LUXURY20');
      toast.success('Coupon LUXURY20 applied! 20% discount code activated.');
      return true;
    } else if (sanitizedCode === 'FREESHIP') {
      setCouponApplied('FREESHIP');
      toast.success('Coupon FREESHIP applied! Free shipping activated.');
      return true;
    } else {
      toast.error('Invalid coupon code.');
      return false;
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.discountPrice ?? item.price;
    return total + price * item.quantity;
  }, 0);

  // Apply coupons calculations
  const shippingFee = couponApplied === 'FREESHIP' || cartTotal > 150 ? 0 : 15;
  
  useEffect(() => {
    if (couponApplied === 'LUXURY20') {
      setDiscountAmount(cartTotal * 0.2);
    } else {
      setDiscountAmount(0);
    }
  }, [couponApplied, cartTotal]);

  const cartSubtotal = cartTotal - discountAmount + shippingFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        cartSubtotal,
        applyCoupon,
        couponApplied,
        discountAmount,
        shippingFee,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
