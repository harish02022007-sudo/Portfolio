import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-bg-void tech-grid flex items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="glass-panel-cyan p-10 rounded-3xl max-w-md w-full border border-cyan-accent/30 space-y-6 hud-border shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <span className="font-mono text-xs text-red-400 font-bold tracking-widest uppercase block mb-1">
            ERROR 404 / SIGNAL LOST
          </span>
          <h1 className="font-display text-3xl font-bold text-text-primary">
            PAGE NOT FOUND
          </h1>
          <p className="text-xs text-text-secondary mt-2 font-mono">
            The requested neural coordinate could not be located in this universe.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-accent text-bg-void font-mono font-bold text-xs hover:bg-cyan-accent/90 transition-all shadow-cyan-glow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO MISSION CONTROL</span>
        </Link>
      </div>
    </div>
  );
}
