'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  inStock: boolean;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  removeFromWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('luxury_wishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Failed to parse wishlist data', e);
      }
    }
  }, []);

  // Save wishlist on change
  useEffect(() => {
    localStorage.setItem('luxury_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (item: WishlistItem) => {
    const exists = wishlistItems.some((i) => i.id === item.id);
    if (exists) {
      setWishlistItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
      toast.error(`${item.name} removed from wishlist.`);
    } else {
      setWishlistItems((prevItems) => [...prevItems, item]);
      toast.success(`${item.name} added to wishlist!`);
    }
  };

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item.id === id);
  };

  const removeFromWishlist = (id: string) => {
    const item = wishlistItems.find((i) => i.id === id);
    if (item) {
      setWishlistItems((prevItems) => prevItems.filter((i) => i.id !== id));
      toast.error(`${item.name} removed from wishlist.`);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
