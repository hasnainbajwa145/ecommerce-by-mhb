'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export interface User {
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('luxury_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    // Mock network call
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Simplistic mock check
    if (email && password.length >= 6) {
      const mockUser = {
        name: email.split('@')[0].toUpperCase(),
        email: email,
      };
      setUser(mockUser);
      localStorage.setItem('luxury_user', JSON.stringify(mockUser));
      toast.success(`Welcome back, ${mockUser.name}!`);
      setLoading(false);
      return true;
    } else {
      toast.error('Invalid credentials. Password must be at least 6 characters.');
      setLoading(false);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    setLoading(true);
    // Mock network call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (name && email && password.length >= 6) {
      const mockUser = {
        name,
        email,
        phone,
      };
      setUser(mockUser);
      localStorage.setItem('luxury_user', JSON.stringify(mockUser));
      toast.success(`Welcome to Luxury Store, ${name}! Account created successfully.`);
      setLoading(false);
      return true;
    } else {
      toast.error('Please fill in all required fields properly.');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('luxury_user');
    toast.success('Logged out successfully.');
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
