'use client';

import React from 'react';
import { HUDLabel } from '../ui/HUDLabel';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';

interface Scene03JourneyProps {
  timeline: any[];
  education: any[];
}

export function Scene03Journey({ timeline = [], education = [] }: Scene03JourneyProps) {
  const defaultEdu = education[0] || {
    institution: 'Sri Shakthi Institute Of Engineering And Technology',
    degree: 'B.Tech AI & ML',
    semester: '5th Semester / 3rd Year',
    cgpa: 7.8,
  };

  return (
    <section className="min-h-screen relative z-10 flex flex-col justify-center py-24 px-6 max-w-7xl mx-auto">
      <div className="space-y-10">
        <HUDLabel number="03" label="ACADEMIC & LEARNING JOURNEY" status="TIMELINE ACTIVE" />

        {/* Education Hero Banner */}
        <div className="glass-panel p-8 rounded-3xl border border-cyan-accent/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-accent/15 border border-cyan-accent/40 flex items-center justify-center shrink-0 shadow-cyan-glow">
              <GraduationCap className="w-7 h-7 text-cyan-accent" />
            </div>
            <div>
              <span className="font-mono text-xs text-cyan-accent uppercase tracking-widest block">
                BACHELOR OF TECHNOLOGY
              </span>
              <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary">
                {defaultEdu.institution}
              </h3>
              <p className="text-xs text-text-secondary mt-1 font-mono">
                {defaultEdu.degree} — {defaultEdu.semester}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-bg-border pt-4 md:pt-0 md:pl-6">
            <div>
              <span className="font-mono text-[10px] text-text-muted block">ACADEMIC CGPA</span>
              <span className="font-display text-2xl font-extrabold text-cyan-accent">{defaultEdu.cgpa} / 10</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-text-muted block">TIMELINE</span>
              <span className="font-mono text-xs text-text-primary">2022 — 2026</span>
            </div>
          </div>
        </div>

        {/* Cinematic Learning Timeline */}
        <div className="space-y-6">
          <h4 className="font-mono text-xs text-text-muted uppercase tracking-widest">
            CINEMATIC DEVELOPMENT TIMELINE
          </h4>

          <div className="relative border-l-2 border-cyan-accent/30 pl-6 md:pl-10 space-y-8 ml-3">
            {timeline.map((item, idx) => (
              <div key={item.id || idx} className="relative group">
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-bg-void border-2 border-cyan-accent group-hover:scale-125 group-hover:bg-cyan-accent transition-all shadow-cyan-glow" />

                <div className="glass-panel p-6 rounded-2xl border border-bg-border group-hover:border-cyan-accent/40 transition-all space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-accent bg-cyan-accent/10 px-3 py-1 rounded-lg border border-cyan-accent/30">
                      {item.year}
                    </span>
                    <span className="font-mono text-xs text-text-muted">{item.subtitle}</span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-text-primary pt-1">
                    {item.title}
                  </h4>

                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
