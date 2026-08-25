'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Trophy, Award, Upload, Sparkles, CheckCircle2, FileText, Image as ImageIcon } from 'lucide-react';

interface CredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  type: 'hackathon' | 'achievement' | 'certification';
  itemToEdit?: any | null;
}

export function CredentialModal({ isOpen, onClose, onSave, type, itemToEdit }: CredentialModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAutoFilled(false);
    if (itemToEdit) {
      setFormData({ ...itemToEdit });
    } else {
      if (type === 'hackathon') {
        setFormData({
          title: '',
          date: '2025',
          team: 'AI Visionaries',
          role: 'ML Engineer',
          project: '',
          result: 'Winner / Top 3',
          technologies: ['Python', 'OpenCV'],
          imageUrl: '',
          certificateUrl: '',
          status: 'PUBLISHED',
        });
      } else if (type === 'certification') {
        setFormData({
          title: '',
          issuer: 'Coursera / DeepLearning.AI',
          issueDate: '2025',
          credentialId: '',
          credentialUrl: '',
          imageUrl: '',
          status: 'PUBLISHED',
        });
      } else {
        setFormData({
          title: '',
          description: '',
          date: '2025',
          organization: '',
          imageUrl: '',
          certificateUrl: '',
          status: 'PUBLISHED',
        });
      }
    }
  }, [itemToEdit, isOpen, type]);

  if (!isOpen) return null;

  const handleCertificateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    const bodyData = new FormData();
    bodyData.append('file', file);

    try {
      const res = await fetch('/api/admin/parse-certificate', {
        method: 'POST',
        body: bodyData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      // Auto-fill extracted details into form
      setFormData((prev: any) => ({
        ...prev,
        title: prev.title || data.detected.title,
        issuer: prev.issuer || data.detected.issuer,
        issueDate: prev.issueDate || data.detected.issueDate,
        date: prev.date || data.detected.date,
        imageUrl: data.fileUrl,
        credentialUrl: prev.credentialUrl || data.fileUrl,
        certificateUrl: data.fileUrl,
      }));

      setAutoFilled(true);
    } catch (err: any) {
      setError(err.message || 'Failed to upload certificate');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const plural = type === 'hackathon' ? 'hackathons' : type === 'certification' ? 'certifications' : 'achievements';
    const url = itemToEdit ? `/api/admin/${plural}/${itemToEdit.id}` : `/api/admin/${plural}`;
    const method = itemToEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');

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
      <div className="bg-bg-card border border-cyan-accent/40 rounded-3xl w-full max-w-lg p-6 space-y-6 hud-border shadow-2xl">
        <div className="flex items-center justify-between border-b border-bg-border pb-3">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-text-primary capitalize">
            {type === 'hackathon' ? <Trophy className="w-5 h-5 text-cyan-accent" /> : <Award className="w-5 h-5 text-violet-accent" />}
            <span>{itemToEdit ? `Edit ${type}` : `Add New ${type}`}</span>
          </div>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-primary rounded-xl cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Upload & AI Auto-fill dropzone */}
        <div className="bg-bg-dark/80 p-5 rounded-2xl border-2 border-dashed border-cyan-accent/40 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-cyan-accent font-mono text-xs font-bold">
            <Upload className="w-4 h-4" />
            <span>UPLOAD CERTIFICATE FILE (PDF / IMAGE)</span>
          </div>
          <p className="text-[11px] text-text-muted">
            Upload your certificate to auto-detect and fill Title, Issuer, Issue Date & Year!
          </p>

          {autoFilled && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-highlight font-mono text-xs animate-bounce">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CERTIFICATE AUTO-DETECTED & FILLED!</span>
            </div>
          )}

          <div>
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-accent/15 border border-cyan-accent/40 text-cyan-accent font-mono font-bold text-xs hover:bg-cyan-accent/25 cursor-pointer">
              <span>{uploading ? 'PARSING WITH AI...' : 'CHOOSE CERTIFICATE FILE'}</span>
              <input
                type="file"
                onChange={handleCertificateUpload}
                disabled={uploading}
                className="hidden"
                accept="image/*,application/pdf"
              />
            </label>
          </div>

          {formData.imageUrl && (
            <div className="pt-2 text-left font-mono text-[11px] text-cyan-accent flex items-center justify-between border-t border-bg-border">
              <span className="truncate max-w-[250px]">Attached: {formData.imageUrl}</span>
              <a href={formData.imageUrl} target="_blank" rel="noreferrer" className="hover:underline text-text-primary">
                Preview File ↗
              </a>
            </div>
          )}
        </div>

        {error && <div className="p-3 bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-text-secondary mb-1">CERTIFICATE / RECORD TITLE *</label>
            <input
              type="text"
              required
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
              placeholder="e.g. Deep Learning Specialization"
            />
          </div>

          {type === 'certification' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-text-secondary mb-1">ISSUER *</label>
                <input
                  type="text"
                  required
                  value={formData.issuer || ''}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                  placeholder="e.g. Coursera / DeepLearning.AI"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-text-secondary mb-1">ISSUE DATE *</label>
                <input
                  type="text"
                  required
                  value={formData.issueDate || ''}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
                  placeholder="e.g. August 2025"
                />
              </div>
            </div>
          )}

          {type === 'hackathon' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-text-secondary mb-1">PROJECT NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.project || ''}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-text-secondary mb-1">RESULT / POSITION *</label>
                  <input
                    type="text"
                    required
                    value={formData.result || ''}
                    onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                    className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-text-secondary mb-1">TEAM NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.team || ''}
                    onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                    className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-text-secondary mb-1">YOUR ROLE *</label>
                  <input
                    type="text"
                    required
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                  />
                </div>
              </div>
            </>
          )}

          {type === 'achievement' && (
            <>
              <div>
                <label className="block font-mono text-xs text-text-secondary mb-1">ORGANIZATION *</label>
                <input
                  type="text"
                  required
                  value={formData.organization || ''}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
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

          <div>
            <label className="block font-mono text-xs text-text-secondary mb-1">DATE / YEAR</label>
            <input
              type="text"
              value={formData.date || formData.issueDate || ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value, issueDate: e.target.value })}
              className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
            />
          </div>

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
