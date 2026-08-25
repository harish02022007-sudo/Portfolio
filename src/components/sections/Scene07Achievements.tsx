'use client';

import React from 'react';
import { HUDLabel } from '../ui/HUDLabel';
import { Trophy, Award, ExternalLink, Calendar, Users, ShieldCheck, FileCheck } from 'lucide-react';

interface Scene07AchievementsProps {
  achievements: any[];
  hackathons: any[];
  certifications: any[];
}

export function Scene07Achievements({
  achievements = [],
  hackathons = [],
  certifications = [],
}: Scene07AchievementsProps) {
  return (
    <section className="min-h-screen relative z-10 flex flex-col justify-center py-24 px-6 max-w-7xl mx-auto">
      <div className="space-y-10">
        <HUDLabel number="07" label="ACHIEVEMENTS & CERTIFICATIONS WALL" status="VERIFIED" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hackathons & Competitions */}
          <div className="space-y-6">
            <h3 className="font-mono text-xs text-cyan-accent uppercase tracking-widest flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              HACKATHONS & INNOVATION CHALLENGES
            </h3>

            {hackathons.length === 0 ? (
              <div className="glass-panel p-6 rounded-2xl border border-bg-border text-center text-text-muted font-mono text-xs">
                No public hackathon records published yet.
              </div>
            ) : (
              <div className="space-y-4">
                {hackathons.map((h, idx) => (
                  <div key={h.id || idx} className="glass-panel p-5 rounded-2xl border border-bg-border space-y-2 hover:border-cyan-accent/40 transition-all">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-base text-text-primary">{h.title}</h4>
                      <span className="font-mono text-[10px] text-cyan-accent bg-cyan-accent/10 px-2.5 py-0.5 rounded border border-cyan-accent/30">
                        {h.result}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">{h.project}</p>
                    <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-text-muted pt-2 border-t border-bg-border/40">
                      <span>Team: {h.team} • Role: {h.role}</span>
                      <span>{h.date}</span>
                    </div>
                    {(h.imageUrl || h.certificateUrl) && (
                      <div className="pt-2">
                        <a
                          href={h.imageUrl || h.certificateUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-accent hover:underline"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>View Verification Document ↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Certifications & Badges */}
          <div className="space-y-6">
            <h3 className="font-mono text-xs text-violet-accent uppercase tracking-widest flex items-center gap-2">
              <Award className="w-4 h-4" />
              VERIFIED CERTIFICATIONS & CREDENTIALS
            </h3>

            {certifications.length === 0 ? (
              <div className="glass-panel p-6 rounded-2xl border border-bg-border text-center text-text-muted font-mono text-xs">
                No public certification records published yet.
              </div>
            ) : (
              <div className="space-y-4">
                {certifications.map((c, idx) => {
                  const certLink = c.imageUrl || c.credentialUrl || c.certificateUrl;

                  return (
                    <div key={c.id || idx} className="glass-panel p-5 rounded-2xl border border-bg-border space-y-2 hover:border-violet-accent/40 transition-all">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-base text-text-primary">{c.title}</h4>
                        <span className="font-mono text-[10px] text-violet-accent font-bold bg-violet-accent/10 px-2.5 py-0.5 rounded border border-violet-accent/30">
                          {c.issueDate || c.date}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary font-mono">Issuer: {c.issuer}</p>

                      {certLink && (
                        <div className="pt-2 border-t border-bg-border/40 flex items-center justify-between">
                          <a
                            href={certLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-accent hover:underline font-bold"
                          >
                            <FileCheck className="w-3.5 h-3.5 text-cyan-accent" />
                            <span>VIEW UPLOADED CERTIFICATE ↗</span>
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
