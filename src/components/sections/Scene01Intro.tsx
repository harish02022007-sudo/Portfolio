'use client';

import React from 'react';
import { MagneticButton } from '../ui/MagneticButton';
import { HUDLabel } from '../ui/HUDLabel';
import { ArrowRight, Terminal, Sparkles } from 'lucide-react';

interface Scene01IntroProps {
  profile?: any;
  onExploreClick: () => void;
  onConnectClick: () => void;
}

export function Scene01Intro({ profile, onExploreClick, onConnectClick }: Scene01IntroProps) {
  const profileImageSrc = '/api/public/profile-image';

  return (
    <section className="min-h-screen relative z-10 flex flex-col justify-center px-6 max-w-7xl mx-auto pt-24 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Hero Text & CTA */}
        <div className="lg:col-span-7 space-y-8">
          <HUDLabel number="01" label="SYSTEM INITIALIZED / IDENTITY PROTOCOL" status="ONLINE" />

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent font-mono text-xs shadow-cyan-glow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MACHINE LEARNING ENGINEER & AI RESEARCHER</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-tight">
              HARISH R
            </h1>

            <p className="font-mono text-sm sm:text-base text-cyan-accent max-w-2xl leading-relaxed">
              {profile?.tagline ||
                'Building next-generation Deep Learning, Computer Vision, LLM Agents & Autonomous AI Systems.'}
            </p>

            <p className="text-sm sm:text-base text-text-secondary max-w-xl leading-relaxed">
              {profile?.biography ||
                'B.Tech AI & ML Student (5th Sem, CGPA 7.8) at Sri Shakthi Institute Of Engineering And Technology, Coimbatore, Tamil Nadu, India.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <MagneticButton onClick={onExploreClick} variant="cyan">
              <span className="flex items-center gap-2">
                <span>EXPLORE AI PROJECTS</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </MagneticButton>

            <MagneticButton onClick={onConnectClick} variant="violet">
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-violet-accent" />
                <span>MISSION CONTROL CONTACT</span>
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* Right Standalone Profile Image (No Box, No Background) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-md space-y-4">
            {/* Standalone Cut-Out Transparent Image Container */}
            <div className="relative w-full h-[540px] flex items-center justify-center pointer-events-auto overflow-visible">
              {/* 🔍 ADJUST IMAGE ZOOM / SIZE HERE: 
                  - Change `max-h-[500px]` to larger values like `max-h-[580px]` or `max-h-[650px]`
                  - Or add Tailwind scale utility like `scale-110`, `scale-125`, `scale-150` */}
              <img
                src={profileImageSrc}
                alt="Harish R — Machine Learning Engineer"
                className="max-h-[580px] w-auto object-contain scale-100 hover:scale-[1.03] transition-all duration-500 filter drop-shadow-[0_20px_40px_rgba(98,230,255,0.25)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/harish-profile.png';
                }}
              />
            </div>

            {/* Bottom Info Bar matching User Screenshot */}
            <div className="px-5 py-3.5 bg-bg-card/80 rounded-2xl border border-bg-border flex items-center justify-between font-mono backdrop-blur-md shadow-xl">
              <div className="space-y-0.5">
                <span className="font-sans font-bold text-sm text-text-primary block tracking-wide">
                  HARISH R
                </span>
                <span className="text-[11px] text-text-muted tracking-wider block uppercase">
                  COIMBATORE, INDIA
                </span>
              </div>
              <span className="px-3.5 py-1.5 rounded-lg bg-cyan-accent/10 border border-cyan-accent/40 text-cyan-accent font-bold text-xs tracking-wider">
                B.TECH AI & ML
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
