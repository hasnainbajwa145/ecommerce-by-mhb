'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { ReactLenis } from 'lenis/react';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { PageLoader } from '@/components/ui/PageLoader';

import 'lenis/dist/lenis.css';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
              {/* Premium Background PageLoader */}
              <PageLoader />
              
              {/* Premium Cursor for Desktops */}
              <CustomCursor />
              
              {/* Toast Notifications Provider */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'var(--card-custom)',
                    color: 'var(--text-custom)',
                    border: '1px solid var(--border-custom)',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '14px',
                  },
                  success: {
                    iconTheme: {
                      primary: '#22C55E',
                      secondary: '#FFFFFF',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#EF4444',
                      secondary: '#FFFFFF',
                    },
                  },
                }}
              />
              
              {children}
            </ReactLenis>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
