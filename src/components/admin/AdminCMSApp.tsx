'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Cpu,
  FolderGit2,
  Microscope,
  Trophy,
  Award,
  Share2,
  Image as ImageIcon,
  Settings,
  ShieldCheck,
  LogOut,
  Eye,
  Plus,
  Trash2,
  Edit,
  Save,
  Check,
  X,
  AlertTriangle,
  MoveUp,
  MoveDown,
  ExternalLink,
  Calendar,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

import { ProjectModal } from './ProjectModal';
import { SkillModal } from './SkillModal';
import { ResearchModal } from './ResearchModal';
import { CredentialModal } from './CredentialModal';
import { EducationModal } from './EducationModal';
import { SocialLinkModal } from './SocialLinkModal';
import { MediaManager } from './MediaManager';

interface AdminCMSProps {
  initialUser: {
    username: string;
    mustChangePassword: boolean;
  };
}

type TabType =
  | 'dashboard'
  | 'profile'
  | 'education'
  | 'skills'
  | 'projects'
  | 'research'
  | 'achievements'
  | 'hackathons'
  | 'certifications'
  | 'socialLinks'
  | 'media'
  | 'settings'
  | 'security';

export default function AdminCMSApp({ initialUser }: AdminCMSProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [mustChangePassword, setMustChangePassword] = useState(initialUser.mustChangePassword);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any | null>(null);

  const [researchModalOpen, setResearchModalOpen] = useState(false);
  const [editingResearch, setEditingResearch] = useState<any | null>(null);

  const [credentialModalOpen, setCredentialModalOpen] = useState(false);
  const [credentialType, setCredentialType] = useState<'hackathon' | 'achievement' | 'certification'>('hackathon');
  const [editingCredential, setEditingCredential] = useState<any | null>(null);

  const [educationModalOpen, setEducationModalOpen] = useState(false);
  const [educationMode, setEducationMode] = useState<'education' | 'timeline'>('education');
  const [editingEducation, setEditingEducation] = useState<any | null>(null);

  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<any | null>(null);

  // CMS State
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [research, setResearch] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwdError, setPwdError] = useState<string | null>(null);

  const router = useRouter();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        profRes,
        projRes,
        skillRes,
        eduRes,
        timeRes,
        resRes,
        achRes,
        hackRes,
        certRes,
        socRes,
        settRes,
      ] = await Promise.all([
        fetch('/api/admin/profile'),
        fetch('/api/admin/projects'),
        fetch('/api/admin/skills'),
        fetch('/api/admin/education'),
        fetch('/api/admin/timeline'),
        fetch('/api/admin/research'),
        fetch('/api/admin/achievements'),
        fetch('/api/admin/hackathons'),
        fetch('/api/admin/certifications'),
        fetch('/api/admin/social-links'),
        fetch('/api/admin/settings'),
      ]);

      if (profRes.ok) setProfile(await profRes.json());
      if (projRes.ok) setProjects(await projRes.json());
      if (skillRes.ok) setSkills(await skillRes.json());
      if (eduRes.ok) setEducation(await eduRes.json());
      if (timeRes.ok) setTimeline(await timeRes.json());
      if (resRes.ok) setResearch(await resRes.json());
      if (achRes.ok) setAchievements(await achRes.json());
      if (hackRes.ok) setHackathons(await hackRes.json());
      if (certRes.ok) setCertifications(await certRes.json());
      if (socRes.ok) setSocialLinks(await socRes.json());
      if (settRes.ok) setSettings(await settRes.json());
    } catch (err) {
      console.error('Failed to load CMS data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const [newUsername, setNewUsername] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError(null);
    try {
      const res = await fetch('/api/auth/change-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          ...(newUsername.trim() ? { newUsername: newUsername.trim() } : {}),
          ...(newPassword ? { newPassword } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update credentials');
      showToast('Credentials updated successfully!');
      setMustChangePassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setNewUsername('');
    } catch (err: any) {
      setPwdError(err.message);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      showToast('Profile updated successfully');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed to save site settings');
      showToast('Site settings updated');
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Generic Item Deletion
  const handleDeleteItem = async (endpoint: string, id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/${endpoint}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast(`Deleted ${name}`);
        fetchAllData();
      } else {
        alert('Failed to delete item');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Reordering Handler
  const handleReorder = async (entity: string, itemsList: any[], index: number, direction: 'up' | 'down') => {
    const newItems = [...itemsList];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const payloadItems = newItems.map((item, idx) => ({
      id: item.id,
      orderIndex: idx + 1,
    }));

    try {
      const res = await fetch('/api/admin/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity, items: payloadItems }),
      });

      if (res.ok) {
        showToast(`Reordered ${entity}`);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Social Link Enabled Status
  const handleToggleSocialLink = async (link: any) => {
    try {
      const res = await fetch(`/api/admin/social-links/${link.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...link, isEnabled: !link.isEnabled }),
      });
      if (res.ok) {
        showToast(`${link.platform} ${!link.isEnabled ? 'Enabled' : 'Disabled'}`);
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills Matrix', icon: Cpu },
    { id: 'education', label: 'Education & Timeline', icon: GraduationCap },
    { id: 'research', label: 'Research Lab', icon: Microscope },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'hackathons', label: 'Hackathons', icon: Trophy },
    { id: 'certifications', label: 'Certificates', icon: Award },
    { id: 'socialLinks', label: 'Social Links', icon: Share2 },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'settings', label: 'Site Settings', icon: Settings },
    { id: 'security', label: 'Security Center', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-bg-void text-text-primary flex flex-col md:flex-row">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-cyan-accent text-bg-void font-mono text-sm px-5 py-3 rounded-xl shadow-cyan-glow flex items-center gap-3 animate-bounce">
          <Check className="w-5 h-5 font-bold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-bg-dark border-r border-bg-border flex flex-col shrink-0">
        <div className="p-6 border-b border-bg-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-accent/10 border border-cyan-accent/30 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-accent" />
            </div>
            <div>
              <h2 className="font-display font-bold text-sm tracking-wide">HARISH CMS</h2>
              <span className="font-mono text-[10px] text-cyan-accent block">v1.0 ONLINE</span>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-accent/15 text-cyan-accent border border-cyan-accent/30 font-semibold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-accent' : 'text-text-muted'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-bg-border space-y-2">
          <button
            onClick={() => setPreviewOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-cyan-accent/40 bg-cyan-accent/10 text-cyan-accent font-mono text-xs hover:bg-cyan-accent/20 transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>PREVIEW SITE</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs hover:bg-red-500/20 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>LOG OUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {mustChangePassword && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-300 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <div>
                <span className="font-bold text-sm block">First Login Password Change Required</span>
                <span className="text-xs text-amber-200">
                  Please update your initial admin password in the Security Center.
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('security')}
              className="px-4 py-2 bg-amber-500 text-bg-void font-mono font-bold text-xs rounded-xl shrink-0 cursor-pointer"
            >
              CHANGE PASSWORD
            </button>
          </div>
        )}

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-cyan-accent">
            <div className="w-10 h-10 border-2 border-cyan-accent border-t-transparent rounded-full animate-spin" />
            <span className="font-mono text-xs tracking-widest uppercase">LOADING SYSTEM DATA...</span>
          </div>
        ) : (
          <>
            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div>
                  <h1 className="font-display text-3xl font-bold">System Control Dashboard</h1>
                  <p className="text-sm text-text-secondary mt-1">
                    Manage Harish R's dynamic AI research portfolio platform.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="glass-panel p-6 rounded-2xl border border-bg-border">
                    <span className="font-mono text-xs text-text-muted">TOTAL PROJECTS</span>
                    <div className="font-display text-3xl font-bold text-cyan-accent mt-2">{projects.length}</div>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl border border-bg-border">
                    <span className="font-mono text-xs text-text-muted">SKILLS MATRIX</span>
                    <div className="font-display text-3xl font-bold text-violet-accent mt-2">{skills.length}</div>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl border border-bg-border">
                    <span className="font-mono text-xs text-text-muted">RESEARCH LAB</span>
                    <div className="font-display text-3xl font-bold text-green-highlight mt-2">{research.length}</div>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl border border-bg-border">
                    <span className="font-mono text-xs text-text-muted">EDUCATION & LINKS</span>
                    <div className="font-display text-3xl font-bold text-text-primary mt-2">
                      {education.length + timeline.length + socialLinks.length}
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-bg-border space-y-4">
                  <h3 className="font-mono text-xs text-cyan-accent uppercase tracking-widest">
                    Quick Profile Summary
                  </h3>
                  {profile && (
                    <div className="space-y-2 text-sm text-text-secondary">
                      <p><strong className="text-text-primary">Name:</strong> {profile.name}</p>
                      <p><strong className="text-text-primary">Role:</strong> {profile.role}</p>
                      <p><strong className="text-text-primary">Location:</strong> {profile.location}</p>
                      <p><strong className="text-text-primary">Tagline:</strong> {profile.tagline}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && profile && (
              <form onSubmit={handleSaveProfile} className="space-y-8">
                <div>
                  <h1 className="font-display text-2xl font-bold">Edit Profile & Biography</h1>
                  <p className="text-xs text-text-secondary mt-1">
                    Update personal details and portrait photo displayed on the hero and identity sections.
                  </p>
                </div>

                {/* Profile Photo Uploader Section */}
                <div className="glass-panel p-6 rounded-2xl border border-cyan-accent/30 flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-32 h-40 rounded-2xl overflow-hidden bg-bg-dark border-2 border-cyan-accent/40 shrink-0 shadow-cyan-glow">
                    <img
                      src={profile.profileImage || '/harish-profile.jpg'}
                      alt="Current Profile Photo"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="space-y-3 flex-1">
                    <h3 className="font-mono text-xs text-cyan-accent uppercase tracking-widest font-bold">
                      PROFILE PORTRAIT PHOTO
                    </h3>
                    <p className="text-xs text-text-muted">
                      Upload a new photo (PNG, JPEG, WEBP) to update your portrait image across the website.
                    </p>

                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-accent/15 border border-cyan-accent/40 text-cyan-accent font-mono font-bold text-xs hover:bg-cyan-accent/25 cursor-pointer shadow-cyan-glow">
                        <ImageIcon className="w-4 h-4" />
                        <span>CHOOSE NEW PHOTO</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const formData = new FormData();
                            formData.append('file', file);
                            try {
                              const res = await fetch('/api/admin/media', {
                                method: 'POST',
                                body: formData,
                              });
                              const data = await res.json();
                              if (!res.ok) throw new Error(data.error || 'Failed to upload photo');
                              setProfile({ ...profile, profileImage: data.url });
                              showToast('Profile photo updated! Click Save Changes.');
                            } catch (err: any) {
                              alert(err.message);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                      <span className="font-mono text-[11px] text-text-muted truncate max-w-xs">
                        URL: {profile.profileImage || '/harish-profile.jpg'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-xs text-text-secondary mb-2">FULL NAME</label>
                    <input
                      type="text"
                      value={profile.name || ''}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-text-secondary mb-2">PRIMARY ROLE</label>
                    <input
                      type="text"
                      value={profile.role || ''}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-text-secondary mb-2">LOCATION</label>
                    <input
                      type="text"
                      value={profile.location || ''}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-text-secondary mb-2">HERO TAGLINE</label>
                    <input
                      type="text"
                      value={profile.tagline || ''}
                      onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                      className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-secondary mb-2">BIOGRAPHY</label>
                  <textarea
                    rows={5}
                    value={profile.biography || ''}
                    onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
                    className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-cyan-accent text-bg-void font-mono font-bold text-xs rounded-xl flex items-center gap-2 hover:opacity-90 cursor-pointer shadow-cyan-glow"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE PROFILE CHANGES</span>
                </button>
              </form>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-display text-2xl font-bold">Projects Case Studies</h1>
                    <p className="text-xs text-text-secondary mt-1">
                      Add, edit, delete, and reorder multimodal project entries.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setProjectModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-cyan-accent text-bg-void font-mono font-bold text-xs flex items-center gap-2 shadow-cyan-glow cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>CREATE NEW PROJECT</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {projects.map((proj, idx) => (
                    <div key={proj.id} className="glass-panel p-5 rounded-2xl border border-bg-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-base">{proj.title}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] ${proj.status === 'PUBLISHED' ? 'bg-green-500/20 text-green-highlight border border-green-500/30' : 'bg-amber-500/20 text-amber-300'}`}>
                            {proj.status}
                          </span>
                          {proj.isFeatured && (
                            <span className="px-2 py-0.5 rounded-full bg-cyan-accent/20 text-cyan-accent font-mono text-[10px]">
                              FEATURED
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-text-secondary mt-1">{proj.subtitle}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleReorder('projects', projects, idx, 'up')}
                          disabled={idx === 0}
                          className="p-2 bg-bg-surface hover:bg-bg-border rounded-lg disabled:opacity-30 cursor-pointer"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReorder('projects', projects, idx, 'down')}
                          disabled={idx === projects.length - 1}
                          className="p-2 bg-bg-surface hover:bg-bg-border rounded-lg disabled:opacity-30 cursor-pointer"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setProjectModalOpen(true);
                          }}
                          className="px-3 py-2 bg-cyan-accent/15 text-cyan-accent border border-cyan-accent/30 rounded-xl font-mono text-xs cursor-pointer flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>EDIT</span>
                        </button>
                        <button
                          onClick={() => handleDeleteItem('projects', proj.id, proj.title)}
                          className="p-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-display text-2xl font-bold">Neural Skills Matrix</h1>
                    <p className="text-xs text-text-secondary mt-1">Manage technical skills, proficiency levels, and focus areas.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingSkill(null);
                      setSkillModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-cyan-accent text-bg-void font-mono font-bold text-xs flex items-center gap-2 shadow-cyan-glow cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD NEW SKILL</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill, idx) => (
                    <div key={skill.id} className="glass-panel p-4 rounded-2xl border border-bg-border flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm">{skill.name}</h4>
                          <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                            skill.level === 'Strong' ? 'bg-cyan-accent/20 text-cyan-accent' : skill.level === 'Intermediate' ? 'bg-violet-accent/20 text-violet-accent' : 'bg-green-500/20 text-green-highlight'
                          }`}>
                            {skill.level}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-text-muted mt-1 block">{skill.category}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleReorder('skills', skills, idx, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 bg-bg-surface hover:bg-bg-border rounded disabled:opacity-30 cursor-pointer"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleReorder('skills', skills, idx, 'down')}
                          disabled={idx === skills.length - 1}
                          className="p-1.5 bg-bg-surface hover:bg-bg-border rounded disabled:opacity-30 cursor-pointer"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingSkill(skill);
                            setSkillModalOpen(true);
                          }}
                          className="p-1.5 bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/30 rounded cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem('skills', skill.id, skill.name)}
                          className="p-1.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EDUCATION & TIMELINE TAB */}
            {activeTab === 'education' && (
              <div className="space-y-10">
                {/* 1. Academic Education Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="font-display text-2xl font-bold">Education Records</h1>
                      <p className="text-xs text-text-secondary mt-1">Manage degree, institution, CGPA, and semester details.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingEducation(null);
                        setEducationMode('education');
                        setEducationModalOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-cyan-accent text-bg-void font-mono font-bold text-xs flex items-center gap-2 shadow-cyan-glow cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>ADD EDUCATION RECORD</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {education.map((edu, idx) => (
                      <div key={edu.id} className="glass-panel p-5 rounded-2xl border border-bg-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-base text-text-primary">{edu.institution}</h3>
                            <span className="font-mono text-xs text-cyan-accent font-bold bg-cyan-accent/10 px-2.5 py-0.5 rounded border border-cyan-accent/30">
                              CGPA: {edu.cgpa} / 10
                            </span>
                          </div>
                          <p className="text-xs text-text-secondary mt-1 font-mono">
                            {edu.degree} in {edu.field} ({edu.startYear} - {edu.endYear || 'Present'}) — {edu.semester}
                          </p>
                          <p className="text-xs text-text-muted mt-2 font-sans">{edu.description}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setEditingEducation(edu);
                              setEducationMode('education');
                              setEducationModalOpen(true);
                            }}
                            className="px-3 py-2 bg-cyan-accent/15 text-cyan-accent border border-cyan-accent/30 rounded-xl font-mono text-xs cursor-pointer flex items-center gap-1"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>EDIT</span>
                          </button>
                          <button
                            onClick={() => handleDeleteItem('education', edu.id, edu.institution)}
                            className="p-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Timeline Trajectory Section */}
                <div className="space-y-4 pt-6 border-t border-bg-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-xl font-bold">Cinematic Learning Timeline</h2>
                      <p className="text-xs text-text-secondary mt-1">Manage yearly learning trajectory points shown on the journey scene.</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingEducation(null);
                        setEducationMode('timeline');
                        setEducationModalOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-violet-accent text-bg-void font-mono font-bold text-xs flex items-center gap-2 shadow-violet-glow cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>ADD TIMELINE POINT</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {timeline.map((item, idx) => (
                      <div key={item.id} className="glass-panel p-4 rounded-2xl border border-bg-border flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 font-mono text-xs">
                            <span className="px-2.5 py-0.5 rounded bg-violet-accent/20 text-violet-accent font-bold">
                              {item.year}
                            </span>
                            <span className="font-bold text-text-primary font-sans">{item.title}</span>
                          </div>
                          <p className="text-xs text-text-secondary mt-1">{item.subtitle}</p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleReorder('timeline', timeline, idx, 'up')}
                            disabled={idx === 0}
                            className="p-1.5 bg-bg-surface hover:bg-bg-border rounded disabled:opacity-30 cursor-pointer"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleReorder('timeline', timeline, idx, 'down')}
                            disabled={idx === timeline.length - 1}
                            className="p-1.5 bg-bg-surface hover:bg-bg-border rounded disabled:opacity-30 cursor-pointer"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingEducation(item);
                              setEducationMode('timeline');
                              setEducationModalOpen(true);
                            }}
                            className="p-1.5 bg-violet-accent/15 text-violet-accent border border-violet-accent/30 rounded cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem('timeline', item.id, item.title)}
                            className="p-1.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* RESEARCH TAB */}
            {activeTab === 'research' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-display text-2xl font-bold">AI Research Laboratory</h1>
                    <p className="text-xs text-text-secondary mt-1">Manage active research questions, methods, and status.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingResearch(null);
                      setResearchModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-violet-accent text-bg-void font-mono font-bold text-xs flex items-center gap-2 shadow-violet-glow cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>CREATE RESEARCH TOPIC</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {research.map((r, idx) => (
                    <div key={r.id} className="glass-panel p-5 rounded-2xl border border-bg-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-base text-text-primary">{r.title}</h3>
                        <p className="text-xs text-violet-accent font-mono mt-1">{r.question}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingResearch(r);
                            setResearchModalOpen(true);
                          }}
                          className="px-3 py-2 bg-violet-accent/15 text-violet-accent border border-violet-accent/30 rounded-xl font-mono text-xs cursor-pointer flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>EDIT</span>
                        </button>
                        <button
                          onClick={() => handleDeleteItem('research', r.id, r.title)}
                          className="p-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HACKATHONS & CERTIFICATIONS TABS */}
            {(activeTab === 'achievements' || activeTab === 'hackathons' || activeTab === 'certifications') && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-display text-2xl font-bold capitalize">{activeTab} Manager</h1>
                    <p className="text-xs text-text-secondary mt-1">Manage verified credentials and competitions.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingCredential(null);
                      setCredentialType(activeTab === 'hackathons' ? 'hackathon' : activeTab === 'certifications' ? 'certification' : 'achievement');
                      setCredentialModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-cyan-accent text-bg-void font-mono font-bold text-xs flex items-center gap-2 shadow-cyan-glow cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="uppercase">ADD {activeTab.slice(0, -1)}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(activeTab === 'hackathons' ? hackathons : activeTab === 'certifications' ? certifications : achievements).map((item) => (
                    <div key={item.id} className="glass-panel p-4 rounded-2xl border border-bg-border flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm">{item.title}</h4>
                        <span className="font-mono text-xs text-text-muted">{item.date || item.issueDate}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(activeTab, item.id, item.title)}
                        className="p-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SOCIAL LINKS TAB */}
            {activeTab === 'socialLinks' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-display text-2xl font-bold">Social Links & Contact Channels</h1>
                    <p className="text-xs text-text-secondary mt-1">Manage email, LinkedIn, GitHub, LeetCode, and social platforms.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingSocial(null);
                      setSocialModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-cyan-accent text-bg-void font-mono font-bold text-xs flex items-center gap-2 shadow-cyan-glow cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD SOCIAL LINK</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {socialLinks.map((link, idx) => (
                    <div key={link.id} className="glass-panel p-5 rounded-2xl border border-bg-border flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-base text-text-primary">{link.platform}</h4>
                          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] ${link.isEnabled ? 'bg-green-500/20 text-green-highlight border border-green-500/30' : 'bg-red-500/20 text-red-400'}`}>
                            {link.isEnabled ? 'ACTIVE' : 'DISABLED'}
                          </span>
                        </div>
                        <a href={link.url} target="_blank" rel="noreferrer" className="text-xs text-cyan-accent font-mono hover:underline truncate block max-w-xs mt-1">
                          {link.url}
                        </a>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleSocialLink(link)}
                          className={`p-2 rounded-xl border font-mono text-xs cursor-pointer ${link.isEnabled ? 'bg-green-500/10 text-green-highlight border-green-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}
                          title={link.isEnabled ? 'Disable' : 'Enable'}
                        >
                          {link.isEnabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => {
                            setEditingSocial(link);
                            setSocialModalOpen(true);
                          }}
                          className="p-2 bg-cyan-accent/15 text-cyan-accent border border-cyan-accent/30 rounded-xl cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem('social-links', link.id, link.platform)}
                          className="p-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MEDIA LIBRARY TAB */}
            {activeTab === 'media' && <MediaManager />}

            {/* SITE SETTINGS TAB */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
                <div>
                  <h1 className="font-display text-2xl font-bold">Site Settings & Visual Modes</h1>
                  <p className="text-xs text-text-secondary mt-1">Configure global portfolio presentation and visual defaults.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs text-text-secondary mb-1">HERO TAGLINE OVERRIDE</label>
                    <input
                      type="text"
                      value={settings.heroTagline || ''}
                      onChange={(e) => setSettings({ ...settings, heroTagline: e.target.value })}
                      className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-text-secondary mb-1">ACCENT COLOR</label>
                    <input
                      type="text"
                      value={settings.accentColor || '#62E6FF'}
                      onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                      className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-cyan-accent text-bg-void font-mono font-bold text-xs rounded-xl flex items-center gap-2 shadow-cyan-glow cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE SITE SETTINGS</span>
                </button>
              </form>
            )}

            {/* SECURITY CENTER TAB */}
            {activeTab === 'security' && (
              <div className="space-y-8 max-w-xl">
                <div>
                  <h1 className="font-display text-2xl font-bold">Security Center</h1>
                  <p className="text-xs text-text-secondary mt-1">Manage admin password and security credentials.</p>
                </div>

                {pwdError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs">{pwdError}</div>
                )}

                <form onSubmit={handleChangePassword} className="glass-panel p-6 rounded-2xl border border-bg-border space-y-5">
                  <h3 className="font-mono text-xs text-cyan-accent uppercase tracking-wider">Change Admin Credentials</h3>

                  <div>
                    <label className="block font-mono text-xs text-text-secondary mb-2">CURRENT PASSWORD</label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-text-secondary mb-2">NEW USERNAME (OPTIONAL)</label>
                    <input
                      type="text"
                      placeholder="Leave blank to keep current username"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-text-secondary mb-2">NEW PASSWORD (OPTIONAL, MIN 8 CHARS)</label>
                    <input
                      type="password"
                      placeholder="Leave blank to keep current password"
                      minLength={8}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-bg-dark border border-bg-border rounded-xl p-3 text-sm font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-cyan-accent text-bg-void font-mono font-bold text-xs rounded-xl hover:opacity-90 cursor-pointer shadow-cyan-glow"
                  >
                    UPDATE ADMIN CREDENTIALS
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </main>

      {/* CRUD Modals */}
      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        onSave={fetchAllData}
        projectToEdit={editingProject}
      />

      <SkillModal
        isOpen={skillModalOpen}
        onClose={() => setSkillModalOpen(false)}
        onSave={fetchAllData}
        skillToEdit={editingSkill}
      />

      <ResearchModal
        isOpen={researchModalOpen}
        onClose={() => setResearchModalOpen(false)}
        onSave={fetchAllData}
        researchToEdit={editingResearch}
      />

      <CredentialModal
        isOpen={credentialModalOpen}
        onClose={() => setCredentialModalOpen(false)}
        onSave={fetchAllData}
        type={credentialType}
        itemToEdit={editingCredential}
      />

      <EducationModal
        isOpen={educationModalOpen}
        onClose={() => setEducationModalOpen(false)}
        onSave={fetchAllData}
        mode={educationMode}
        itemToEdit={editingEducation}
      />

      <SocialLinkModal
        isOpen={socialModalOpen}
        onClose={() => setSocialModalOpen(false)}
        onSave={fetchAllData}
        linkToEdit={editingSocial}
      />

      {/* Live Website Preview Drawer / Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col">
          <div className="p-4 bg-bg-dark border-b border-bg-border flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-accent">
              <Eye className="w-4 h-4" />
              <span>LIVE WEBSITE PREVIEW MODE</span>
            </div>
            <button onClick={() => setPreviewOpen(false)} className="p-2 hover:bg-bg-surface rounded-lg cursor-pointer">
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
          <iframe src="/" className="flex-1 w-full border-none" title="Live Preview" />
        </div>
      )}
    </div>
  );
}
