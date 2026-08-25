'use client';

import React from 'react';
import { HUDLabel } from '../ui/HUDLabel';
import { Microscope, HelpCircle, Compass, Activity, ArrowUpRight } from 'lucide-react';

interface Scene06ResearchProps {
  research: any[];
}

export function Scene06Research({ research = [] }: Scene06ResearchProps) {
  return (
    <section className="min-h-screen relative z-10 flex flex-col justify-center py-24 px-6 max-w-7xl mx-auto">
      <div className="space-y-8">
        <HUDLabel number="06" label="AI RESEARCH LABORATORY" status="R&D ACTIVE" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {research.map((item, idx) => {
            const tags = item.tags
              ? typeof item.tags === 'string'
                ? JSON.parse(item.tags)
                : item.tags
              : [];

            return (
              <div
                key={item.id || idx}
                className="glass-panel p-8 rounded-3xl border border-violet-accent/30 hover:border-violet-accent transition-all space-y-6 hud-border relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-violet-accent tracking-widest uppercase">
                    RESEARCH / 00{idx + 1}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-violet-accent/15 border border-violet-accent/30 text-violet-accent font-mono text-[10px] uppercase">
                    {item.currentStatus || 'ACTIVE RESEARCH'}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-cyan-accent transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="bg-bg-dark/80 p-4 rounded-xl border border-bg-border space-y-1">
                    <span className="text-violet-accent font-bold uppercase tracking-wider block flex items-center gap-1.5 text-[10px]">
                      <HelpCircle className="w-3.5 h-3.5" />
                      CORE RESEARCH QUESTION
                    </span>
                    <p className="text-text-primary font-sans text-xs">{item.question}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-text-muted uppercase text-[10px] font-bold block">TECHNICAL APPROACH</span>
                    <p className="text-text-secondary font-sans text-xs leading-relaxed">{item.approach}</p>
                  </div>

                  {item.futureDirection && (
                    <div className="space-y-1 pt-2 border-t border-bg-border/60">
                      <span className="text-green-highlight uppercase text-[10px] font-bold block">FUTURE DIRECTION</span>
                      <p className="text-text-secondary font-sans text-xs">{item.futureDirection}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((tag: string, tidx: number) => (
                    <span
                      key={tidx}
                      className="px-2.5 py-0.5 rounded bg-bg-surface border border-bg-border font-mono text-[10px] text-text-muted"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
