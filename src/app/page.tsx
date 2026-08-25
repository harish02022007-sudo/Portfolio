'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navigation } from '@/components/ui/Navigation';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { PerformanceToggle } from '@/components/ui/PerformanceToggle';
import { Scene01Intro } from '@/components/sections/Scene01Intro';
import { Scene02Identity } from '@/components/sections/Scene02Identity';
import { Scene03Journey } from '@/components/sections/Scene03Journey';
import { Scene04Skills } from '@/components/sections/Scene04Skills';
import { Scene05Projects } from '@/components/sections/Scene05Projects';
import { Scene06Research } from '@/components/sections/Scene06Research';
import { Scene07Achievements } from '@/components/sections/Scene07Achievements';
import { Scene08Contact } from '@/components/sections/Scene08Contact';

// Dynamically import heavy 3D Scene Canvas without SSR
const SceneCanvas = dynamic(
  () => import('@/components/3d/SceneCanvas').then((mod) => mod.SceneCanvas),
  { ssr: false }
);

export default function PortfolioHomePage() {
  const [currentScene, setCurrentScene] = useState(1);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [activeNavSection, setActiveNavSection] = useState('intro');

  // Dynamic Portfolio Data loaded from API
  const [profile, setProfile] = useState<any>(null);
  const [education, setEducation] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [research, setResearch] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const [
          profRes,
          eduRes,
          timeRes,
          skillRes,
          projRes,
          resRes,
          achRes,
          hackRes,
          certRes,
          socRes,
        ] = await Promise.all([
          fetch('/api/public/profile'),
          fetch('/api/public/education'),
          fetch('/api/public/timeline'),
          fetch('/api/public/skills'),
          fetch('/api/public/projects'),
          fetch('/api/public/research'),
          fetch('/api/public/achievements'),
          fetch('/api/public/hackathons'),
          fetch('/api/public/certifications'),
          fetch('/api/public/social-links'),
        ]);

        if (profRes.ok) setProfile(await profRes.json());
        if (eduRes.ok) setEducation(await eduRes.json());
        if (timeRes.ok) setTimeline(await timeRes.json());
        if (skillRes.ok) setSkills(await skillRes.json());
        if (projRes.ok) setProjects(await projRes.json());
        if (resRes.ok) setResearch(await resRes.json());
        if (achRes.ok) setAchievements(await achRes.json());
        if (hackRes.ok) setHackathons(await hackRes.json());
        if (certRes.ok) setCertifications(await certRes.json());
        if (socRes.ok) setSocialLinks(await socRes.json());
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      }
    }

    loadPortfolioData();
  }, []);

  // IntersectionObserver to accurately track which section is currently visible in viewport
  useEffect(() => {
    const sectionIds = ['intro', 'identity', 'journey', 'skills', 'projects', 'research', 'achievements', 'contact'];
    const sceneIndexMap: Record<string, number> = {
      intro: 1,
      identity: 2,
      journey: 3,
      skills: 4,
      projects: 5,
      research: 6,
      achievements: 7,
      contact: 8,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveNavSection(id);
            if (sceneIndexMap[id]) {
              setCurrentScene(sceneIndexMap[id]);
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sceneIndexToId: Record<number, string> = {
    1: 'intro',
    2: 'identity',
    3: 'journey',
    4: 'skills',
    5: 'projects',
    6: 'research',
    7: 'achievements',
    8: 'contact',
  };

  return (
    <div className="relative min-h-screen bg-bg-void text-text-primary tech-grid selection:bg-cyan-accent/30 selection:text-cyan-accent">
      <CustomCursor />

      {/* R3F 3D Canvas Background Environment */}
      <SceneCanvas
        currentScene={currentScene}
        performanceMode={performanceMode}
        onNodeClick={(nodeId) => handleNavigateSection(nodeId)}
      />

      {/* Floating HUD Controls */}
      <Navigation
        activeSection={activeNavSection}
        onNavigate={handleNavigateSection}
      />

      <ScrollIndicator
        currentScene={currentScene}
        totalScenes={8}
        onSelectScene={(sceneIdx) => {
          const targetId = sceneIndexToId[sceneIdx];
          if (targetId) handleNavigateSection(targetId);
        }}
      />

      <PerformanceToggle
        performanceMode={performanceMode}
        onToggle={() => setPerformanceMode(!performanceMode)}
      />

      {/* 8 Public Portfolio Storytelling Scenes */}
      <main className="relative z-10 space-y-12">
        <div id="intro">
          <Scene01Intro
            profile={profile}
            onExploreClick={() => handleNavigateSection('projects')}
            onConnectClick={() => handleNavigateSection('contact')}
          />
        </div>

        <div id="identity">
          <Scene02Identity profile={profile} />
        </div>

        <div id="journey">
          <Scene03Journey timeline={timeline} education={education} />
        </div>

        <div id="skills">
          <Scene04Skills skills={skills} />
        </div>

        <div id="projects">
          <Scene05Projects projects={projects} />
        </div>

        <div id="research">
          <Scene06Research research={research} />
        </div>

        <div id="achievements">
          <Scene07Achievements
            achievements={achievements}
            hackathons={hackathons}
            certifications={certifications}
          />
        </div>

        <div id="contact">
          <Scene08Contact socialLinks={socialLinks} />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-bg-border py-8 px-6 text-center font-mono text-xs text-text-muted bg-bg-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 HARISH R — MACHINE LEARNING ENGINEER</span>
          <span className="text-cyan-accent">POWERED BY NEXT.JS 14 & THREE.JS R3F</span>
        </div>
      </footer>
    </div>
  );
}
