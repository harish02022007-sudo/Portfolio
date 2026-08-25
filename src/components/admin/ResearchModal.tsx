'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Microscope } from 'lucide-react';

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  researchToEdit?: any | null;
}

export function ResearchModal({ isOpen, onClose, onSave, researchToEdit }: ResearchModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    question: '',
    description: '',
    approach: '',
    currentStatus: 'Active research & experimental prototyping',
    futureDirection: '',
    tags: [] as string[],
    status: 'PUBLISHED',
    orderIndex: 0,
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (researchToEdit) {
      setFormData({
        title: researchToEdit.title || '',
        question: researchToEdit.question || '',
        description: researchToEdit.description || '',
        approach: researchToEdit.approach || '',
        currentStatus: researchToEdit.currentStatus || 'Active research & experimental prototyping',
        futureDirection: researchToEdit.futureDirection || '',
        tags: researchToEdit.tags
          ? typeof researchToEdit.tags === 'string'
            ? JSON.parse(researchToEdit.tags)
            : researchToEdit.tags
          : [],
        status: researchToEdit.status || 'PUBLISHED',
        orderIndex: researchToEdit.orderIndex || 0,
      });
    } else {
      setFormData({
        title: '',
        question: '',
        description: '',
        approach: '',
        currentStatus: 'Active research & experimental prototyping',
        futureDirection: '',
        tags: ['Multimodal AI', 'Agentic AI'],
        status: 'PUBLISHED',
        orderIndex: 0,
      });
    }
  }, [researchToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (!formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
    }
    setTagInput('');
  };

  const handleRemoveTag = (t: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== t) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = researchToEdit ? `/api/admin/research/${researchToEdit.id}` : '/api/admin/research';
    const method = researchToEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save research');

      onSave();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-bg-card border border-violet-accent/40 rounded-3xl w-full max-w-2xl p-6 md:p-8 space-y-6 hud-border shadow-2xl">
        <div className="flex items-center justify-between border-b border-bg-border pb-3">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-text-primary">
            <Microscope className="w-5 h-5 text-violet-accent" />
            <span>{researchToEdit ? 'Edit Research Entry' : 'Create AI Research Topic'}</span>
          </div>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-primary rounded-xl cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="p-3 bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-text-secondary mb-1">RESEARCH TITLE *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
              placeholder="e.g. Multimodal Neural Ingestion & Agentic Reasoning"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-violet-accent mb-1">CORE RESEARCH QUESTION *</label>
            <textarea
              rows={2}
              required
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full bg-bg-dark border border-violet-accent/30 rounded-xl p-3 text-sm font-sans"
              placeholder="What core scientific/technical question are you investigating?"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-text-secondary mb-1">TECHNICAL APPROACH *</label>
            <textarea
              rows={3}
              required
              value={formData.approach}
              onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
              className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
              placeholder="Detailed methodology, backbones, and neural architectures used..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-text-secondary mb-1">CURRENT STATUS *</label>
              <input
                type="text"
                required
                value={formData.currentStatus}
                onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
                className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                placeholder="e.g. Active experimental prototyping"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-text-secondary mb-1">PUBLICATION STATUS</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
              >
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="DRAFT">DRAFT</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs text-green-highlight mb-1">FUTURE DIRECTION</label>
            <input
              type="text"
              value={formData.futureDirection}
              onChange={(e) => setFormData({ ...formData, futureDirection: e.target.value })}
              className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
              placeholder="Where is this research heading next?"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-mono text-xs text-text-secondary">RESEARCH TAGS</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Add tag and press Enter"
                className="flex-1 bg-bg-dark border border-bg-border rounded-xl p-2.5 text-xs font-mono"
              />
              <button type="button" onClick={handleAddTag} className="px-4 bg-bg-surface text-violet-accent rounded-xl text-xs font-mono">
                ADD TAG
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {formData.tags.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-violet-accent/15 border border-violet-accent/30 font-mono text-xs text-violet-accent flex items-center gap-1">
                  #{t}
                  <button type="button" onClick={() => handleRemoveTag(t)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-bg-border">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-bg-border font-mono text-xs cursor-pointer">
              CANCEL
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl bg-violet-accent text-bg-void font-mono font-bold text-xs cursor-pointer flex items-center gap-1.5 shadow-violet-glow">
              <Save className="w-4 h-4" />
              <span>{loading ? 'SAVING...' : 'SAVE RESEARCH ENTRY'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
