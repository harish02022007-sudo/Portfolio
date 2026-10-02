'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ShieldAlert, Cpu, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Force session logout whenever login page is accessed so user MUST log in every time
  React.useEffect(() => {
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-void tech-grid flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-accent/10 rounded-full blur-[120px] pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[500px] h-[500px] bg-violet-accent/10 rounded-full blur-[120px] pointer-events-none -bottom-20 -right-20" />

      <div className="w-full max-w-md glass-panel-cyan p-8 rounded-2xl border border-cyan-accent/30 shadow-2xl relative z-10 hud-border">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 rounded-xl bg-bg-surface border border-cyan-accent/40 flex items-center justify-center mb-4 shadow-cyan-glow">
            <Cpu className="w-8 h-8 text-cyan-accent animate-pulse" />
          </div>
          <span className="font-mono text-xs text-cyan-accent tracking-widest uppercase mb-1">
            [ SECURE GATEWAY / SYSTEM ACCESS ]
          </span>
          <h1 className="font-display text-2xl font-bold text-text-primary">
            Harish R — Personal CMS
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Authorized Administrator Access Only
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-sm flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Access Denied</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-mono text-xs text-text-secondary mb-2 uppercase tracking-wider">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-bg-dark border border-bg-border rounded-xl py-3 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs text-text-secondary mb-2 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-bg-dark border border-bg-border rounded-xl py-3 pl-10 pr-10 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-accent/90 to-violet-accent/90 text-bg-void font-bold font-mono tracking-wider hover:opacity-95 focus:outline-none transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-cyan-glow cursor-pointer mt-6"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-bg-void border-t-transparent rounded-full animate-spin" />
                AUTHENTICATING...
              </span>
            ) : (
              <span>AUTHENTICATE & LOG IN ↗</span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-bg-border text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-green-highlight">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ENCRYPTED JWT & BCRYPT SESSION ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
