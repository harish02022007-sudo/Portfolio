'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Share2 } from 'lucide-react';

interface SocialLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  linkToEdit?: any | null;
}

export function SocialLinkModal({ isOpen, onClose, onSave, linkToEdit }: SocialLinkModalProps) {
  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    icon: 'Share2',
    isEnabled: true,
    orderIndex: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (linkToEdit) {
      setFormData({
        platform: linkToEdit.platform || '',
        url: linkToEdit.url || '',
        icon: linkToEdit.icon || 'Share2',
        isEnabled: linkToEdit.isEnabled ?? true,
        orderIndex: linkToEdit.orderIndex || 0,
      });
    } else {
      setFormData({
        platform: '',
        url: '',
        icon: 'Share2',
        isEnabled: true,
        orderIndex: 0,
      });
    }
  }, [linkToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = linkToEdit ? `/api/admin/social-links/${linkToEdit.id}` : '/api/admin/social-links';
    const method = linkToEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save link');

      onSave();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-bg-card border border-cyan-accent/40 rounded-3xl w-full max-w-lg p-6 space-y-6 hud-border shadow-2xl">
        <div className="flex items-center justify-between border-b border-bg-border pb-3">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-text-primary">
            <Share2 className="w-5 h-5 text-cyan-accent" />
            <span>{linkToEdit ? 'Edit Social Link' : 'Add New Social Channel'}</span>
          </div>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-primary rounded-xl cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="p-3 bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-text-secondary mb-1">PLATFORM NAME *</label>
            <input
              type="text"
              required
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
              placeholder="e.g. GitHub, LinkedIn, Kaggle, Twitter"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-text-secondary mb-1">PROFILE / CONTACT URL *</label>
            <input
              type="text"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
              placeholder="https://... or mailto:harish02022007@gmail.com"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isEnabled"
              checked={formData.isEnabled}
              onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
              className="w-4 h-4 rounded accent-cyan-accent cursor-pointer"
            />
            <label htmlFor="isEnabled" className="font-mono text-xs text-text-primary cursor-pointer">
              ENABLE & SHOW PUBLICLY ON PORTFOLIO
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-bg-border">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-bg-border font-mono text-xs cursor-pointer">
              CANCEL
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl bg-cyan-accent text-bg-void font-mono font-bold text-xs cursor-pointer flex items-center gap-1.5 shadow-cyan-glow">
              <Save className="w-4 h-4" />
              <span>{loading ? 'SAVING...' : 'SAVE SOCIAL LINK'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
