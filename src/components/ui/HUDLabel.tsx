import React from 'react';

interface HUDLabelProps {
  number?: string;
  label: string;
  status?: string;
  className?: string;
}

export function HUDLabel({ number, label, status, className = '' }: HUDLabelProps) {
  return (
    <div className={`inline-flex items-center gap-3 font-mono text-[11px] tracking-widest text-text-secondary uppercase ${className}`}>
      {number && (
        <span className="text-cyan-accent font-bold bg-cyan-accent/10 px-2 py-0.5 rounded border border-cyan-accent/30">
          {number}
        </span>
      )}
      <span className="text-text-muted">/</span>
      <span className="text-text-primary font-semibold">{label}</span>
      {status && (
        <>
          <span className="text-text-muted">/</span>
          <span className="text-green-highlight flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-highlight animate-pulse" />
            {status}
          </span>
        </>
      )}
    </div>
  );
}
