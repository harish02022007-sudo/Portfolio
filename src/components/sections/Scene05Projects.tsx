'use client';

import React, { useState } from 'react';
import { HUDLabel } from '../ui/HUDLabel';
import { MagneticButton } from '../ui/MagneticButton';
import { FolderGit2, ExternalLink, Github, ArrowRight, Cpu, Layers, CheckCircle, Play } from 'lucide-react';

interface Scene05ProjectsProps {
  projects: any[];
}

export function Scene05Projects({ projects = [] }: Scene05ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const featured = projects.find((p) => p.isFeatured) || projects[0];

  // Pipeline parsing
  const pipelineSteps = featured?.pipeline
    ? typeof featured.pipeline === 'string'
      ? JSON.parse(featured.pipeline)
      : featured.pipeline
    : [
        { step: 'VIDEO', desc: 'Raw video stream ingestion' },
        { step: 'FRAME EXTRACTION', desc: 'Adaptive keyframe sampling via OpenCV' },
        { step: 'VISION MODEL', desc: 'Feature embedding extraction' },
        { step: 'OCR', desc: 'On-screen text recognition' },
        { step: 'SPEECH PROCESSING', desc: 'Audio track transcription' },
        { step: 'LLM', desc: 'Multimodal context synthesis' },
        { step: 'SEMANTIC SEARCH', desc: 'Vector database similarity indexing' },
      ];

  const featuresList = featured?.features
    ? typeof featured.features === 'string'
      ? JSON.parse(featured.features)
      : featured.features
    : [];

  const techList = featured?.technology
    ? typeof featured.technology === 'string'
      ? JSON.parse(featured.technology)
      : featured.technology
    : [];

  return (
    <section className="min-h-screen relative z-10 flex flex-col justify-center py-24 px-6 max-w-7xl mx-auto">
      <div className="space-y-10">
        <HUDLabel number="05" label="FEATURED AI CASE STUDIES" status="PIPELINE LIVE" />

        {/* Featured Case Study Card */}
        {featured && (
          <div className="glass-panel-cyan p-8 md:p-10 rounded-3xl hud-border space-y-8 relative overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-cyan-accent uppercase tracking-widest block mb-1">
                  FEATURED RESEARCH PROJECT / 001
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold text-text-primary">
                  {featured.title}
                </h2>
                <p className="text-sm text-text-secondary mt-1 max-w-2xl font-mono">
                  {featured.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {featured.githubUrl && (
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="p-3 rounded-xl bg-bg-surface border border-bg-border hover:border-cyan-accent text-text-primary hover:text-cyan-accent transition-all cursor-pointer"
                    title="View GitHub Repository"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {featured.liveDemoUrl && (
                  <a
                    href={featured.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="flex items-center gap-2 py-3 px-5 rounded-xl bg-cyan-accent text-bg-void font-mono font-bold text-xs hover:bg-cyan-accent/90 transition-all cursor-pointer shadow-cyan-glow"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* PROBLEM vs SOLUTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-bg-border">
              <div className="bg-bg-dark/80 p-5 rounded-2xl border border-red-500/30 space-y-2">
                <span className="font-mono text-[10px] text-red-400 font-bold uppercase tracking-widest block">
                  PROBLEM STATEMENT
                </span>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">{featured.problem}</p>
              </div>
              <div className="bg-bg-dark/80 p-5 rounded-2xl border border-green-500/30 space-y-2">
                <span className="font-mono text-[10px] text-green-highlight font-bold uppercase tracking-widest block">
                  AI SOLUTION & APPROACH
                </span>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">{featured.solution}</p>
              </div>
            </div>

            {/* ANIMATED MULTIMODAL PIPELINE DIAGRAM */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-accent uppercase tracking-widest flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  MULTIMODAL AI INGESTION & SEARCH PIPELINE
                </span>
                <span className="font-mono text-[11px] text-text-muted">7 STAGE ARCHITECTURE</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {pipelineSteps.map((stepItem: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-bg-dark/90 p-3 rounded-xl border border-cyan-accent/30 flex flex-col justify-between hover:border-cyan-accent transition-all group relative"
                  >
                    <span className="font-mono text-[9px] text-cyan-accent font-bold block mb-1">
                      STAGE 0{idx + 1}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-text-primary group-hover:text-cyan-accent transition-colors">
                      {stepItem.step}
                    </span>
                    <span className="font-mono text-[9px] text-text-muted mt-2 line-clamp-2">
                      {stepItem.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RESULTS & TECH TAGS */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-bg-border font-mono text-xs">
              <div className="flex flex-wrap gap-2">
                {techList.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-bg-surface border border-bg-border text-text-secondary font-mono text-[11px]"
                  >
                    #{tech}
                  </span>
                ))}
              </div>

              {featured.results && (
                <div className="flex items-center gap-2 text-green-highlight font-bold">
                  <CheckCircle className="w-4 h-4" />
                  <span>{featured.results}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
