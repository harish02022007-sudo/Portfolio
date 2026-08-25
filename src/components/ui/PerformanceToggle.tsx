'use client';

import React from 'react';
import { Sliders, Zap } from 'lucide-react';

interface PerformanceToggleProps {
  performanceMode: boolean;
  onToggle: () => void;
}

export function PerformanceToggle({ performanceMode, onToggle }: PerformanceToggleProps) {
  return (
    <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
      <button
        onClick={onToggle}
        data-cursor="hover"
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-[11px] font-semibold border transition-all cursor-pointer shadow-lg backdrop-blur-md ${
          performanceMode
            ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-amber-500/10'
            : 'glass-panel text-cyan-accent border-cyan-accent/30 hover:border-cyan-accent'
        }`}
      >
        {performanceMode ? (
          <>
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>PERFORMANCE MODE (FAST)</span>
          </>
        ) : (
          <>
            <Sliders className="w-3.5 h-3.5 text-cyan-accent" />
            <span>VISUAL MODE (ULTRA 3D)</span>
          </>
        )}
      </button>
    </div>
  );
}
