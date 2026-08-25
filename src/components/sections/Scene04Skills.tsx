'use client';

import React, { useState } from 'react';
import { HUDLabel } from '../ui/HUDLabel';
import { Cpu, CheckCircle2, Sparkles, Filter } from 'lucide-react';

interface Scene04SkillsProps {
  skills: any[];
  onSelectSkill?: (skillName: string) => void;
}

export function Scene04Skills({ skills = [], onSelectSkill }: Scene04SkillsProps) {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'Strong' | 'Intermediate' | 'Learning'>('ALL');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = skills.filter((s) => (activeFilter === 'ALL' ? true : s.level === activeFilter));

  const strongSkills = skills.filter((s) => s.level === 'Strong');
  const intermediateSkills = skills.filter((s) => s.level === 'Intermediate');
  const learningSkills = skills.filter((s) => s.level === 'Learning');

  return (
    <section className="min-h-screen relative z-10 flex flex-col justify-center py-24 px-6 max-w-7xl mx-auto">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <HUDLabel number="04" label="NEURAL SKILLS CONSTELLATION" status="MATRIX ACTIVE" />

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-bg-surface p-1 rounded-xl border border-bg-border self-start">
            {(['ALL', 'Strong', 'Intermediate', 'Learning'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-cyan-accent text-bg-void font-bold shadow-cyan-glow'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Clusters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Strong Skills */}
          <div className="glass-panel p-6 rounded-3xl border border-cyan-accent/40 space-y-4 hud-border">
            <div className="flex items-center justify-between border-b border-bg-border pb-3">
              <span className="font-mono text-xs font-bold text-cyan-accent tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-accent animate-ping" />
                STRONG PROFICIENCY
              </span>
              <span className="font-mono text-xs text-text-muted">{strongSkills.length} SKILLS</span>
            </div>

            <div className="space-y-3">
              {strongSkills.map((skill) => (
                <div
                  key={skill.id}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => onSelectSkill && onSelectSkill(skill.name)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    hoveredSkill === skill.name
                      ? 'bg-cyan-accent/20 border-cyan-accent shadow-cyan-glow scale-[1.02]'
                      : 'bg-bg-surface/70 border-bg-border hover:border-cyan-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-text-primary">{skill.name}</span>
                    <span className="font-mono text-[10px] text-cyan-accent bg-cyan-accent/10 px-2 py-0.5 rounded border border-cyan-accent/30">
                      STRONG
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Intermediate Skills */}
          <div className="glass-panel p-6 rounded-3xl border border-violet-accent/40 space-y-4">
            <div className="flex items-center justify-between border-b border-bg-border pb-3">
              <span className="font-mono text-xs font-bold text-violet-accent tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-accent" />
                INTERMEDIATE
              </span>
              <span className="font-mono text-xs text-text-muted">{intermediateSkills.length} SKILLS</span>
            </div>

            <div className="space-y-3">
              {intermediateSkills.map((skill) => (
                <div
                  key={skill.id}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => onSelectSkill && onSelectSkill(skill.name)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    hoveredSkill === skill.name
                      ? 'bg-violet-accent/20 border-violet-accent shadow-violet-glow scale-[1.02]'
                      : 'bg-bg-surface/70 border-bg-border hover:border-violet-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-text-primary">{skill.name}</span>
                    <span className="font-mono text-[10px] text-violet-accent bg-violet-accent/10 px-2 py-0.5 rounded border border-violet-accent/30">
                      INTERMEDIATE
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Skills */}
          <div className="glass-panel p-6 rounded-3xl border border-green-highlight/40 space-y-4">
            <div className="flex items-center justify-between border-b border-bg-border pb-3">
              <span className="font-mono text-xs font-bold text-green-highlight tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-highlight animate-pulse" />
                ACTIVE LEARNING & R&D
              </span>
              <span className="font-mono text-xs text-text-muted">{learningSkills.length} SKILLS</span>
            </div>

            <div className="space-y-3">
              {learningSkills.map((skill) => (
                <div
                  key={skill.id}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => onSelectSkill && onSelectSkill(skill.name)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    hoveredSkill === skill.name
                      ? 'bg-green-500/20 border-green-highlight shadow-lg scale-[1.02]'
                      : 'bg-bg-surface/70 border-bg-border hover:border-green-highlight/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-text-primary">{skill.name}</span>
                    <span className="font-mono text-[10px] text-green-highlight bg-green-500/10 px-2 py-0.5 rounded border border-green-500/30">
                      LEARNING
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
