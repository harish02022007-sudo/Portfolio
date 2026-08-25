'use client';

import React, { useState } from 'react';
import { HUDLabel } from '../ui/HUDLabel';
import { MagneticButton } from '../ui/MagneticButton';
import { Radio, Mail, Linkedin, Github, Code, Send, CheckCircle2, Copy } from 'lucide-react';

interface Scene08ContactProps {
  socialLinks: any[];
}

export function Scene08Contact({ socialLinks = [] }: Scene08ContactProps) {
  const [connecting, setConnecting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [connected, setConnected] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleInitiateContact = () => {
    setConnecting(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setConnecting(false);
        setConnected(true);
      }
    }, 200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('harish02022007@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmitTransmission = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  const defaultLinks = [
    { platform: 'Email', url: 'mailto:harish02022007@gmail.com', icon: Mail },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/harish-r-1a4089307', icon: Linkedin },
    { platform: 'GitHub', url: 'https://github.com/harish02022007-sudo', icon: Github },
    { platform: 'LeetCode', url: 'https://leetcode.com/u/R_Harish_2007/', icon: Code },
  ];

  return (
    <section className="min-h-screen relative z-10 flex flex-col justify-center py-24 px-6 max-w-7xl mx-auto">
      <div className="space-y-10">
        <HUDLabel number="08" label="MISSION CONTROL TRANSMISSION" status="READY" />

        <div className="glass-panel-cyan p-8 md:p-12 rounded-3xl hud-border max-w-4xl mx-auto space-y-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-accent/15 border border-cyan-accent/40 flex items-center justify-center mx-auto shadow-cyan-glow">
            <Radio className="w-8 h-8 text-cyan-accent animate-pulse" />
          </div>

          <div>
            <span className="font-mono text-xs text-cyan-accent uppercase tracking-widest block mb-1">
              MISSION CONTROL TERMINAL
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-text-primary">
              READY TO BUILD SOMETHING IMPRESSIVE?
            </h2>
            <p className="font-mono text-xs text-text-secondary mt-2 max-w-xl mx-auto">
              TRANSMISSION STATUS: READY TO INITIATE COMMUNICATION WITH HARISH R
            </p>
          </div>

          {!connected && !connecting && (
            <div className="pt-4">
              <MagneticButton onClick={handleInitiateContact} variant="cyan" data-cursor="hover">
                <span>[ INITIATE CONTACT TRANSMISSION ] ↗</span>
              </MagneticButton>
            </div>
          )}

          {connecting && (
            <div className="space-y-3 max-w-md mx-auto py-4 font-mono text-xs text-cyan-accent">
              <div className="flex justify-between">
                <span>ESTABLISHING SECURE CONNECTION...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-bg-dark rounded-full overflow-hidden border border-cyan-accent/30">
                <div
                  className="h-full bg-cyan-accent transition-all duration-200 shadow-cyan-glow"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {connected && (
            <div className="space-y-8 animate-fadeIn text-left pt-4">
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/40 text-green-highlight font-mono text-xs text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>CONNECTION ESTABLISHED — MISSION CONTROL CHANNELS OPEN</span>
              </div>

              {/* Contact Channels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <a
                  href="mailto:harish02022007@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="glass-panel p-4 rounded-2xl border border-bg-border hover:border-cyan-accent flex flex-col items-center justify-center text-center gap-2 group transition-all"
                >
                  <Mail className="w-6 h-6 text-cyan-accent group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-xs">Email</span>
                  <span className="font-mono text-[10px] text-text-muted truncate max-w-full">
                    harish02022007@gmail.com
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/in/harish-r-1a4089307"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="glass-panel p-4 rounded-2xl border border-bg-border hover:border-cyan-accent flex flex-col items-center justify-center text-center gap-2 group transition-all"
                >
                  <Linkedin className="w-6 h-6 text-cyan-accent group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-xs">LinkedIn</span>
                  <span className="font-mono text-[10px] text-text-muted">harish-r-1a4089307</span>
                </a>

                <a
                  href="https://github.com/harish02022007-sudo"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="glass-panel p-4 rounded-2xl border border-bg-border hover:border-cyan-accent flex flex-col items-center justify-center text-center gap-2 group transition-all"
                >
                  <Github className="w-6 h-6 text-cyan-accent group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-xs">GitHub</span>
                  <span className="font-mono text-[10px] text-text-muted">harish02022007-sudo</span>
                </a>

                <a
                  href="https://leetcode.com/u/R_Harish_2007/"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="glass-panel p-4 rounded-2xl border border-bg-border hover:border-cyan-accent flex flex-col items-center justify-center text-center gap-2 group transition-all"
                >
                  <Code className="w-6 h-6 text-cyan-accent group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-xs">LeetCode</span>
                  <span className="font-mono text-[10px] text-text-muted">R_Harish_2007</span>
                </a>
              </div>

              {/* Directly Copy Email Action */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-cyan-accent bg-bg-surface px-4 py-2 rounded-xl border border-bg-border cursor-pointer transition-all"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'EMAIL COPIED TO CLIPBOARD!' : 'COPY EMAIL ADDRESS'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
