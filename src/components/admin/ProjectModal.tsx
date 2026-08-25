'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Cpu, Layers, Image as ImageIcon } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  projectToEdit?: any | null;
}

export function ProjectModal({ isOpen, onClose, onSave, projectToEdit }: ProjectModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    problem: '',
    solution: '',
    features: [] as string[],
    technology: [] as string[],
    architecture: '',
    results: '',
    githubUrl: '',
    liveDemoUrl: '',
    images: [] as string[],
    videos: [] as string[],
    pipeline: [] as { step: string; desc: string }[],
    tags: [] as string[],
    status: 'PUBLISHED',
    isFeatured: false,
    orderIndex: 0,
    date: '',
  });

  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        title: projectToEdit.title || '',
        subtitle: projectToEdit.subtitle || '',
        description: projectToEdit.description || '',
        problem: projectToEdit.problem || '',
        solution: projectToEdit.solution || '',
        features: projectToEdit.features
          ? typeof projectToEdit.features === 'string'
            ? JSON.parse(projectToEdit.features)
            : projectToEdit.features
          : [],
        technology: projectToEdit.technology
          ? typeof projectToEdit.technology === 'string'
            ? JSON.parse(projectToEdit.technology)
            : projectToEdit.technology
          : [],
        architecture: projectToEdit.architecture || '',
        results: projectToEdit.results || '',
        githubUrl: projectToEdit.githubUrl || '',
        liveDemoUrl: projectToEdit.liveDemoUrl || '',
        images: projectToEdit.images
          ? typeof projectToEdit.images === 'string'
            ? JSON.parse(projectToEdit.images)
            : projectToEdit.images
          : [],
        videos: projectToEdit.videos
          ? typeof projectToEdit.videos === 'string'
            ? JSON.parse(projectToEdit.videos)
            : projectToEdit.videos
          : [],
        pipeline: projectToEdit.pipeline
          ? typeof projectToEdit.pipeline === 'string'
            ? JSON.parse(projectToEdit.pipeline)
            : projectToEdit.pipeline
          : [],
        tags: projectToEdit.tags
          ? typeof projectToEdit.tags === 'string'
            ? JSON.parse(projectToEdit.tags)
            : projectToEdit.tags
          : [],
        status: projectToEdit.status || 'PUBLISHED',
        isFeatured: projectToEdit.isFeatured ?? false,
        orderIndex: projectToEdit.orderIndex || 0,
        date: projectToEdit.date || '',
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        problem: '',
        solution: '',
        features: [],
        technology: ['Python', 'PyTorch', 'OpenCV'],
        architecture: '',
        results: '',
        githubUrl: '',
        liveDemoUrl: '',
        images: [],
        videos: [],
        pipeline: [
          { step: 'INPUT', desc: 'Data ingestion step' },
          { step: 'PROCESSING', desc: 'Neural feature extraction' },
          { step: 'MODEL', desc: 'Inference and predictions' },
          { step: 'OUTPUT', desc: 'Real-time response & indexing' },
        ],
        tags: ['AI', 'Machine Learning'],
        status: 'PUBLISHED',
        isFeatured: false,
        orderIndex: 0,
        date: '2026',
      });
    }
    setError(null);
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    if (!formData.technology.includes(techInput.trim())) {
      setFormData({ ...formData, technology: [...formData.technology, techInput.trim()] });
    }
    setTechInput('');
  };

  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      technology: formData.technology.filter((t) => t !== tech),
    });
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== idx),
    });
  };

  const handleAddPipelineStep = () => {
    setFormData({
      ...formData,
      pipeline: [...formData.pipeline, { step: 'NEW STAGE', desc: 'Stage description' }],
    });
  };

  const handleUpdatePipelineStep = (index: number, field: 'step' | 'desc', val: string) => {
    const updated = [...formData.pipeline];
    updated[index][field] = val;
    setFormData({ ...formData, pipeline: updated });
  };

  const handleRemovePipelineStep = (index: number) => {
    setFormData({
      ...formData,
      pipeline: formData.pipeline.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = projectToEdit ? `/api/admin/projects/${projectToEdit.id}` : '/api/admin/projects';
    const method = projectToEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save project');
      }

      onSave();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-bg-card border border-cyan-accent/40 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto hud-border shadow-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-bg-border pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-accent/15 border border-cyan-accent/40 flex items-center justify-center text-cyan-accent">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-text-primary">
                {projectToEdit ? 'Edit Case Study' : 'Create New Project Case Study'}
              </h2>
              <span className="font-mono text-xs text-cyan-accent">MULTIMODAL PROJECT MANAGER</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-bg-surface rounded-xl text-text-muted hover:text-text-primary cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-text-secondary mb-1">PROJECT TITLE *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                placeholder="e.g. VideoSense AI"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-text-secondary mb-1">SUBTITLE *</label>
              <input
                type="text"
                required
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
                placeholder="e.g. Multimodal Video Intelligence Pipeline"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs text-text-secondary mb-1">FULL DESCRIPTION *</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-sans"
              placeholder="Detailed description of the project..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-red-400 mb-1">PROBLEM STATEMENT *</label>
              <textarea
                rows={3}
                required
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                className="w-full bg-bg-dark border border-red-500/30 rounded-xl p-3 text-sm font-sans"
                placeholder="What challenge does this project solve?"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-green-highlight mb-1">SOLUTION & APPROACH *</label>
              <textarea
                rows={3}
                required
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                className="w-full bg-bg-dark border border-green-500/30 rounded-xl p-3 text-sm font-sans"
                placeholder="How does your AI architecture solve it?"
              />
            </div>
          </div>

          {/* Multimodal Animated Pipeline Steps Editor */}
          <div className="space-y-3 bg-bg-dark/60 p-4 rounded-2xl border border-cyan-accent/20">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-accent flex items-center gap-2">
                <Layers className="w-4 h-4" />
                INTERACTIVE PIPELINE STAGES
              </span>
              <button
                type="button"
                onClick={handleAddPipelineStep}
                className="px-3 py-1 bg-cyan-accent/20 text-cyan-accent rounded-lg font-mono text-xs hover:bg-cyan-accent/30 cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>ADD STAGE</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.pipeline.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-bg-surface p-2 rounded-xl border border-bg-border">
                  <span className="font-mono text-[10px] text-cyan-accent font-bold px-2">0{idx + 1}</span>
                  <input
                    type="text"
                    value={step.step}
                    onChange={(e) => handleUpdatePipelineStep(idx, 'step', e.target.value)}
                    placeholder="STAGE NAME"
                    className="w-1/3 bg-bg-dark border border-bg-border rounded-lg p-2 text-xs font-mono font-bold"
                  />
                  <input
                    type="text"
                    value={step.desc}
                    onChange={(e) => handleUpdatePipelineStep(idx, 'desc', e.target.value)}
                    placeholder="Stage description..."
                    className="flex-1 bg-bg-dark border border-bg-border rounded-lg p-2 text-xs font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePipelineStep(idx)}
                    className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Tags Editor */}
          <div className="space-y-2">
            <label className="block font-mono text-xs text-text-secondary">TECHNOLOGY STACK</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                placeholder="Type tech name and press Enter (e.g. OpenCV, PyTorch)"
                className="flex-1 bg-bg-dark border border-bg-border rounded-xl p-2.5 text-xs font-mono"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-4 py-2.5 bg-bg-surface hover:bg-bg-border text-cyan-accent rounded-xl font-mono text-xs cursor-pointer"
              >
                ADD TECH
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {formData.technology.map((tech, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-accent/15 border border-cyan-accent/30 font-mono text-xs text-cyan-accent">
                  #{tech}
                  <button type="button" onClick={() => handleRemoveTech(tech)} className="hover:text-red-400 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-text-secondary mb-1">GITHUB URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-text-secondary mb-1">LIVE DEMO URL</label>
              <input
                type="url"
                value={formData.liveDemoUrl}
                onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
                placeholder="https://demo.app..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-xs text-text-secondary mb-1">RESULTS & METRICS</label>
              <input
                type="text"
                value={formData.results}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
                placeholder="e.g. 94.2% accuracy, <500ms latency"
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
            <div className="flex items-center gap-3 pt-6">
              <label className="flex items-center gap-2 font-mono text-xs text-text-primary cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded accent-cyan-accent cursor-pointer"
                />
                <span>FEATURED CASE STUDY</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-bg-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-bg-border hover:bg-bg-surface font-mono text-xs cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-cyan-accent text-bg-void font-mono font-bold text-xs hover:opacity-90 transition-all cursor-pointer shadow-cyan-glow flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'SAVING...' : 'SAVE CASE STUDY'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
