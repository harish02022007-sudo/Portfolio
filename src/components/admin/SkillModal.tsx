'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Cpu } from 'lucide-react';

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  skillToEdit?: any | null;
}

export function SkillModal({ isOpen, onClose, onSave, skillToEdit }: SkillModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'AI & ML Core',
    level: 'Strong',
    icon: '',
    description: '',
    isFocusArea: false,
    orderIndex: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (skillToEdit) {
      setFormData({
        name: skillToEdit.name || '',
        category: skillToEdit.category || 'AI & ML Core',
        level: skillToEdit.level || 'Strong',
        icon: skillToEdit.icon || '',
        description: skillToEdit.description || '',
        isFocusArea: skillToEdit.isFocusArea ?? false,
        orderIndex: skillToEdit.orderIndex || 0,
      });
    } else {
      setFormData({
        name: '',
        category: 'AI & ML Core',
        level: 'Strong',
        icon: '',
        description: '',
        isFocusArea: false,
        orderIndex: 0,
      });
    }
  }, [skillToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = skillToEdit ? `/api/admin/skills/${skillToEdit.id}` : '/api/admin/skills';
    const method = skillToEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save skill');

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
            <Cpu className="w-5 h-5 text-cyan-accent" />
            <span>{skillToEdit ? 'Edit Skill Entry' : 'Add New Skill Node'}</span>
          </div>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-primary rounded-xl cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="p-3 bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-text-secondary mb-1">SKILL NAME *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
              placeholder="e.g. PyTorch, Computer Vision"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-text-secondary mb-1">CATEGORY *</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                placeholder="e.g. Neural Networks"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-text-secondary mb-1">PROFICIENCY LEVEL *</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
              >
                <option value="Strong">Strong</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Learning">Learning</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs text-text-secondary mb-1">SHORT DESCRIPTION</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
              placeholder="Brief summary of your expertise in this tool/domain..."
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="focusArea"
              checked={formData.isFocusArea}
              onChange={(e) => setFormData({ ...formData, isFocusArea: e.target.checked })}
              className="w-4 h-4 rounded accent-cyan-accent cursor-pointer"
            />
            <label htmlFor="focusArea" className="font-mono text-xs text-text-primary cursor-pointer">
              HIGHLIGHT AS PRIMARY RESEARCH FOCUS AREA
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-bg-border">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-bg-border font-mono text-xs cursor-pointer">
              CANCEL
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl bg-cyan-accent text-bg-void font-mono font-bold text-xs cursor-pointer flex items-center gap-1.5 shadow-cyan-glow">
              <Save className="w-4 h-4" />
              <span>{loading ? 'SAVING...' : 'SAVE SKILL'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
