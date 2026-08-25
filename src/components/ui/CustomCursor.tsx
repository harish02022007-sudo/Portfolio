'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'view' | 'explore'>('default');
  const [cursorLabel, setCursorLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check touch devices or reduced motion
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (touch || reducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hoverType = target.getAttribute('data-cursor');
      if (hoverType === 'view') {
        setCursorState('view');
        setCursorLabel('VIEW');
      } else if (hoverType === 'explore') {
        setCursorState('explore');
        setCursorLabel('EXPLORE');
      } else if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setCursorState('hover');
        setCursorLabel('');
      } else {
        setCursorState('default');
        setCursorLabel('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Central luminous dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-cyan-accent rounded-full pointer-events-none z-50 shadow-cyan-glow"
        animate={{
          x: pos.x - 5,
          y: pos.y - 5,
          scale: cursorState === 'default' ? 1 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50, mass: 0.1 }}
      />

      {/* Trailing outer ring */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-40 rounded-full border border-cyan-accent/50 flex items-center justify-center font-mono text-[9px] font-bold text-cyan-accent backdrop-blur-[2px] ${
          cursorState === 'view' || cursorState === 'explore'
            ? 'bg-cyan-accent/20 border-cyan-accent'
            : cursorState === 'hover'
            ? 'bg-cyan-accent/10 border-cyan-accent/80'
            : 'bg-transparent'
        }`}
        animate={{
          x: pos.x - (cursorState === 'default' ? 16 : 28),
          y: pos.y - (cursorState === 'default' ? 16 : 28),
          width: cursorState === 'default' ? 32 : 56,
          height: cursorState === 'default' ? 32 : 56,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.2 }}
      >
        {cursorLabel}
      </motion.div>
    </>
  );
}
