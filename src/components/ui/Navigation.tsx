'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'identity', label: 'IDENTITY' },
    { id: 'journey', label: 'JOURNEY' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'research', label: 'RESEARCH' },
    { id: 'achievements', label: 'ACHIEVEMENTS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-dark/80 backdrop-blur-md border-b border-bg-border py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo & System Status */}
        <button
          onClick={() => onNavigate('intro')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-bg-surface border border-cyan-accent/40 flex items-center justify-center group-hover:border-cyan-accent transition-all shadow-cyan-glow">
            <Cpu className="w-4 h-4 text-cyan-accent group-hover:rotate-180 transition-transform duration-500" />
          </div>
          <div>
            <span className="font-display font-bold text-sm tracking-wider text-text-primary group-hover:text-cyan-accent transition-colors block">
              HARISH R
            </span>
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-green-highlight">
              <span className="w-1.5 h-1.5 rounded-full bg-green-highlight animate-pulse" />
              <span>SYSTEM ACTIVE</span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-bg-surface/60 p-1.5 rounded-2xl border border-bg-border backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-xl font-mono text-xs tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-accent/15 text-cyan-accent border border-cyan-accent/30 font-semibold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Admin Gateway Link */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/admin"
            className="font-mono text-xs px-3.5 py-2 rounded-xl border border-bg-border bg-bg-surface/50 text-text-secondary hover:text-cyan-accent hover:border-cyan-accent/40 transition-all"
          >
            [ ADMIN CMS ]
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-bg-surface border border-bg-border text-text-primary cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bg-dark/95 border-b border-bg-border px-6 py-6 space-y-3 backdrop-blur-xl animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left py-3 px-4 rounded-xl font-mono text-xs tracking-wider transition-all ${
                  isActive
                    ? 'bg-cyan-accent/20 text-cyan-accent font-bold border border-cyan-accent/40'
                    : 'text-text-secondary hover:text-text-primary bg-bg-surface/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <a
            href="/admin"
            className="block text-center w-full py-3 rounded-xl border border-cyan-accent/40 bg-cyan-accent/10 text-cyan-accent font-mono text-xs font-bold"
          >
            LOGIN TO ADMIN CMS ↗
          </a>
        </div>
      )}
    </header>
  );
}
