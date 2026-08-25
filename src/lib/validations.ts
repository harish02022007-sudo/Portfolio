import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required').max(50),
  password: z.string().min(1, 'Password is required'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  biography: z.string().min(1, 'Biography is required'),
  location: z.string().min(1, 'Location is required'),
  focusAreas: z.array(z.string()).or(z.string()),
  profileImage: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  availability: z.boolean().default(true),
});

export const educationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().min(1, 'Field is required'),
  semester: z.string().min(1, 'Semester is required'),
  startYear: z.number().int().min(2000).max(2100),
  endYear: z.number().int().min(2000).max(2100).optional().nullable(),
  cgpa: z.number().min(0).max(10),
  description: z.string().min(1, 'Description is required'),
  orderIndex: z.number().int().default(0),
});

export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.string().min(1, 'Category is required'),
  level: z.enum(['Strong', 'Intermediate', 'Learning']),
  icon: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  isFocusArea: z.boolean().default(false),
  relatedProjects: z.array(z.string()).or(z.string()).optional().nullable(),
  orderIndex: z.number().int().default(0),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  description: z.string().min(1, 'Description is required'),
  problem: z.string().min(1, 'Problem statement is required'),
  solution: z.string().min(1, 'Solution statement is required'),
  features: z.array(z.string()).or(z.string()),
  technology: z.array(z.string()).or(z.string()),
  architecture: z.string().optional().nullable(),
  results: z.string().optional().nullable(),
  githubUrl: z.string().url().optional().nullable().or(z.literal('')),
  liveDemoUrl: z.string().url().optional().nullable().or(z.literal('')),
  images: z.array(z.string()).or(z.string()).optional().nullable(),
  videos: z.array(z.string()).or(z.string()).optional().nullable(),
  pipeline: z.array(z.object({ step: z.string(), desc: z.string() })).or(z.string()).optional().nullable(),
  tags: z.array(z.string()).or(z.string()).optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  isFeatured: z.boolean().default(false),
  orderIndex: z.number().int().default(0),
  date: z.string().optional().nullable(),
});

export const researchSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  question: z.string().min(1, 'Research question is required'),
  description: z.string().min(1, 'Description is required'),
  approach: z.string().min(1, 'Approach is required'),
  currentStatus: z.string().min(1, 'Current status is required'),
  futureDirection: z.string().optional().nullable(),
  tags: z.array(z.string()).or(z.string()).optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  orderIndex: z.number().int().default(0),
});

export const achievementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  organization: z.string().min(1, 'Organization is required'),
  imageUrl: z.string().optional().nullable(),
  certificateUrl: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  orderIndex: z.number().int().default(0),
});

export const hackathonSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  team: z.string().min(1, 'Team name is required'),
  role: z.string().min(1, 'Role is required'),
  project: z.string().min(1, 'Project name is required'),
  result: z.string().min(1, 'Result is required'),
  technologies: z.array(z.string()).or(z.string()),
  imageUrl: z.string().optional().nullable(),
  certificateUrl: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  orderIndex: z.number().int().default(0),
});

export const certificationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  credentialId: z.string().optional().nullable(),
  credentialUrl: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  orderIndex: z.number().int().default(0),
});

export const socialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform name is required'),
  url: z.string().min(1, 'URL is required'),
  icon: z.string().optional().nullable(),
  orderIndex: z.number().int().default(0),
  isEnabled: z.boolean().default(true),
});
