'use client';

import React from 'react';
import { HUDLabel } from '../ui/HUDLabel';
import { Cpu, CheckCircle2 } from 'lucide-react';

interface Scene02IdentityProps {
  profile?: any;
}

export function Scene02Identity({ profile }: Scene02IdentityProps) {
  const profileImageSrc = '/api/public/profile-image';

  // Safely parse focusAreas regardless of whether it's an Array, JSON string, or undefined
  let focusAreas: string[] = [];
  if (profile?.focusAreas) {
    if (Array.isArray(profile.focusAreas)) {
      focusAreas = profile.focusAreas;
    } else if (typeof profile.focusAreas === 'string') {
      try {
        const parsed = JSON.parse(profile.focusAreas);
        if (Array.isArray(parsed)) focusAreas = parsed;
        else focusAreas = profile.focusAreas.split(',').map((s: string) => s.trim());
      } catch {
        focusAreas = profile.focusAreas.split(',').map((s: string) => s.trim());
      }
    }
  }

  if (!Array.isArray(focusAreas) || focusAreas.length === 0) {
    focusAreas = [
      'Deep Learning & Neural Networks',
      'Computer Vision & Object Detection',
      'NLP & Large Language Models (LLMs)',
      'Agentic AI & Autonomous Workflows',
      'Multimodal AI & Vector Embeddings',
    ];
  }

  return (
    <section className="min-h-screen relative z-10 flex flex-col justify-center py-24 px-6 max-w-7xl mx-auto">
      <div className="space-y-12">
        <HUDLabel number="02" label="IDENTITY & ACADEMIC CORE" status="VERIFIED" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Standalone Portrait Presentation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="glass-panel p-4 rounded-3xl border border-bg-border bg-bg-card/90 space-y-4 w-full max-w-md shadow-2xl">
              <div className="relative w-full h-[420px] rounded-2xl overflow-hidden bg-bg-dark border border-bg-border flex items-center justify-center p-2">
                {/* 🔍 ADJUST IMAGE ZOOM / SIZE HERE: 
                    - Change `max-h-full` or add `scale-110`, `scale-125`, `scale-150` */}
                <img
                  src={profileImageSrc}
                  alt="Harish R Profile Portrait"
                  className="max-h-full max-w-full object-contain scale-100 hover:scale-[1.03] transition-all duration-500 filter drop-shadow-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/harish-profile.png';
                  }}
                />
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center text-text-primary font-bold border-b border-bg-border pb-2">
                  <span>RESEARCHER NAME</span>
                  <span className="text-cyan-accent">HARISH R</span>
                </div>
                <div className="flex justify-between items-center text-text-muted">
                  <span>DEGREE PROGRAM</span>
                  <span className="text-text-secondary font-semibold">B.Tech AI & ML</span>
                </div>
                <div className="flex justify-between items-center text-text-muted">
                  <span>INSTITUTION</span>
                  <span className="text-text-secondary font-semibold">Sri Shakthi Inst. of Engg.</span>
                </div>
                <div className="flex justify-between items-center text-text-muted">
                  <span>ACADEMIC CGPA</span>
                  <span className="text-green-highlight font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/30">
                    7.8 / 10.0
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Core Focus Areas */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
                AI & Machine Learning Engineer
              </h2>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                Currently pursuing B.Tech in Artificial Intelligence & Machine Learning (5th Semester / 3rd Year) at
                Sri Shakthi Institute Of Engineering And Technology, Coimbatore. Passionate about researching state-of-the-art
                multimodal architectures, computer vision pipelines, and intelligent agent systems.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="glass-panel p-4 rounded-2xl border border-bg-border">
                <span className="font-mono text-[10px] text-text-muted uppercase">ACADEMIC CGPA</span>
                <div className="font-display text-2xl font-bold text-cyan-accent mt-1">7.8</div>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-bg-border">
                <span className="font-mono text-[10px] text-text-muted uppercase">CURRENT SEMESTER</span>
                <div className="font-display text-2xl font-bold text-violet-accent mt-1">5th Sem</div>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-bg-border col-span-2 sm:col-span-1">
                <span className="font-mono text-[10px] text-text-muted uppercase">LOCATION</span>
                <div className="font-display text-base font-bold text-green-highlight mt-1">Coimbatore, IN</div>
              </div>
            </div>

            {/* Primary Focus Areas List */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs text-cyan-accent uppercase tracking-widest flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                PRIMARY RESEARCH & ENGINEERING FOCUS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {focusAreas.map((area: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-bg-surface/80 border border-bg-border hover:border-cyan-accent/40 transition-all font-mono text-xs text-text-secondary"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
