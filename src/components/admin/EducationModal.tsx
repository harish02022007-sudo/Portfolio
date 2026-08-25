'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, GraduationCap, Calendar } from 'lucide-react';

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  mode: 'education' | 'timeline';
  itemToEdit?: any | null;
}

export function EducationModal({ isOpen, onClose, onSave, mode, itemToEdit }: EducationModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (itemToEdit) {
      setFormData({ ...itemToEdit });
    } else {
      if (mode === 'education') {
        setFormData({
          institution: '',
          degree: 'B.Tech',
          field: 'Artificial Intelligence & Machine Learning',
          semester: '5th Semester / 3rd Year',
          startYear: 2022,
          endYear: 2026,
          cgpa: 7.8,
          description: '',
        });
      } else {
        setFormData({
          year: '2025',
          title: '',
          subtitle: '',
          description: '',
        });
      }
    }
  }, [itemToEdit, isOpen, mode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = mode === 'education' ? 'education' : 'timeline';
    const url = itemToEdit ? `/api/admin/${endpoint}/${itemToEdit.id}` : `/api/admin/${endpoint}`;
    const method = itemToEdit ? 'PUT' : 'POST';

    try {
      const payload = mode === 'education' ? {
        ...formData,
        startYear: Number(formData.startYear),
        endYear: formData.endYear ? Number(formData.endYear) : null,
        cgpa: Number(formData.cgpa),
      } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');

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
            {mode === 'education' ? <GraduationCap className="w-5 h-5 text-cyan-accent" /> : <Calendar className="w-5 h-5 text-violet-accent" />}
            <span>{itemToEdit ? `Edit ${mode === 'education' ? 'Education' : 'Timeline Entry'}` : `Add ${mode === 'education' ? 'Education' : 'Timeline Entry'}`}</span>
          </div>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-primary rounded-xl cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="p-3 bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'education' ? (
            <>
              <div>
                <label className="block font-mono text-xs text-text-secondary mb-1">INSTITUTION *</label>
                <input
                  type="text"
                  required
                  value={formData.institution || ''}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                  placeholder="e.g. Sri Shakthi Institute Of Engineering And Technology"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-text-secondary mb-1">DEGREE *</label>
                  <input
                    type="text"
                    required
                    value={formData.degree || ''}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                    placeholder="e.g. B.Tech"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-text-secondary mb-1">FIELD OF STUDY *</label>
                  <input
                    type="text"
                    required
                    value={formData.field || ''}
                    onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                    className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                    placeholder="e.g. AI & ML"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono text-xs text-text-secondary mb-1">START YEAR *</label>
                  <input
                    type="number"
                    required
                    value={formData.startYear || 2022}
                    onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                    className="w-full bg-bg-dark border border-bg-border rounded-xl p-2.5 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-text-secondary mb-1">END YEAR</label>
                  <input
                    type="number"
                    value={formData.endYear || 2026}
                    onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                    className="w-full bg-bg-dark border border-bg-border rounded-xl p-2.5 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-cyan-accent mb-1">CGPA *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.cgpa || 7.8}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    className="w-full bg-bg-dark border border-cyan-accent/40 rounded-xl p-2.5 text-sm font-mono text-cyan-accent font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-text-secondary mb-1">SEMESTER / YEAR DETAILS *</label>
                <input
                  type="text"
                  required
                  value={formData.semester || ''}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
                  placeholder="e.g. 5th Semester / 3rd Year"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-text-secondary mb-1">DESCRIPTION *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                  placeholder="Coursework, research areas, and specializations..."
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block font-mono text-xs text-text-secondary mb-1">YEAR / PERIOD *</label>
                <input
                  type="text"
                  required
                  value={formData.year || ''}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
                  placeholder="e.g. 2025 - Present"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-text-secondary mb-1">TITLE *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                  placeholder="e.g. LLMs & Agentic AI Research"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-text-secondary mb-1">SUBTITLE *</label>
                <input
                  type="text"
                  required
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                  placeholder="e.g. State of the Art AI Systems"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-text-secondary mb-1">DESCRIPTION *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-bg-border">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-bg-border font-mono text-xs cursor-pointer">
              CANCEL
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl bg-cyan-accent text-bg-void font-mono font-bold text-xs cursor-pointer flex items-center gap-1.5 shadow-cyan-glow">
              <Save className="w-4 h-4" />
              <span>{loading ? 'SAVING...' : 'SAVE RECORD'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
