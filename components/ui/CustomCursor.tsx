'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on desktop/pointer devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);
    document.body.classList.add('use-custom-cursor');

    const onMouseMove = (e: MouseEvent) => {
      // Instantly position the inner dot
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out',
        });
      }

      // Smoothly animate the outer ring
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is interactive
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') || 
        target.tagName === 'INPUT' || 
        target.tagName === 'SELECT' || 
        target.tagName === 'TEXTAREA' || 
        target.getAttribute('role') === 'button';

      if (isInteractive) {
        setIsHovered(true);
        if (ringRef.current && dotRef.current) {
          gsap.to(ringRef.current, {
            scale: 1.8,
            backgroundColor: 'rgba(139, 92, 246, 0.15)', // light purple glow
            borderColor: 'transparent',
            duration: 0.2,
          });
          gsap.to(dotRef.current, {
            scale: 0.5,
            duration: 0.2,
          });
        }
      } else {
        setIsHovered(false);
        if (ringRef.current && dotRef.current) {
          gsap.to(ringRef.current, {
            scale: 1,
            backgroundColor: 'transparent',
            borderColor: '#8B5CF6', // accent color
            duration: 0.2,
          });
          gsap.to(dotRef.current, {
            scale: 1,
            duration: 0.2,
          });
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.body.classList.remove('use-custom-cursor');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="custom-cursor hidden lg:block"
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot hidden lg:block"
        style={{ left: 0, top: 0 }}
      />
    </>
  );
};
