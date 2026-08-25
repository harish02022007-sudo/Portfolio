'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, FileText, Video, Copy, Check, Trash2 } from 'lucide-react';

export function MediaManager() {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        setMediaItems(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      fetchMedia();
    } catch (err: any) {
      alert(err.message || 'Upload error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Media Library & File Manager</h1>
        <p className="text-xs text-text-secondary mt-1">
          Upload and manage project screenshots, demo videos, resume PDFs, and certificates.
        </p>
      </div>

      {/* File Upload Zone */}
      <div className="glass-panel p-8 rounded-3xl border-2 border-dashed border-cyan-accent/40 text-center space-y-4 hud-border">
        <div className="w-14 h-14 rounded-2xl bg-cyan-accent/15 border border-cyan-accent/40 flex items-center justify-center mx-auto text-cyan-accent">
          <Upload className="w-7 h-7" />
        </div>
        <div>
          <h3 className="font-bold text-base">Upload Project Media or Document</h3>
          <p className="text-xs text-text-muted mt-1">
            Supports PNG, JPEG, WEBP, MP4 videos, and PDF documents (Max 15MB)
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-accent text-bg-void font-mono font-bold text-xs hover:bg-cyan-accent/90 cursor-pointer shadow-cyan-glow">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'UPLOADING...' : 'CHOOSE FILE TO UPLOAD'}</span>
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            accept="image/*,video/*,application/pdf"
          />
        </label>
      </div>

      {/* Media Grid View */}
      {loading ? (
        <div className="text-center py-10 font-mono text-xs text-cyan-accent">Loading media files...</div>
      ) : mediaItems.length === 0 ? (
        <div className="text-center py-10 font-mono text-xs text-text-muted">No media files uploaded yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaItems.map((item) => {
            const isImage = item.mimeType.startsWith('image/');
            const isVideo = item.mimeType.startsWith('video/');

            return (
              <div key={item.id} className="glass-panel p-3 rounded-2xl border border-bg-border flex flex-col justify-between space-y-3">
                <div className="h-32 rounded-xl bg-bg-dark border border-bg-border flex items-center justify-center overflow-hidden relative group">
                  {isImage ? (
                    <img src={item.url} alt={item.originalName} className="w-full h-full object-cover" />
                  ) : isVideo ? (
                    <Video className="w-8 h-8 text-violet-accent" />
                  ) : (
                    <FileText className="w-8 h-8 text-cyan-accent" />
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-xs truncate" title={item.originalName}>
                    {item.originalName}
                  </h4>
                  <span className="font-mono text-[10px] text-text-muted block">
                    {(item.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-bg-border">
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    className="flex-1 py-1.5 bg-bg-surface hover:bg-bg-border text-cyan-accent rounded-lg font-mono text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === item.id ? 'COPIED!' : 'COPY URL'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
