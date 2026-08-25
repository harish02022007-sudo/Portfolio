import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword, signToken, verifyToken } from '../src/lib/auth';
import { loginSchema, projectSchema, skillSchema } from '../src/lib/validations';

describe('Security & Authentication Unit Tests', () => {
  it('should hash and verify passwords correctly using bcrypt', async () => {
    const password = 'AdminPassword123!';
    const hash = await hashPassword(password);

    expect(hash).not.toBe(password);
    expect(await verifyPassword(password, hash)).toBe(true);
    expect(await verifyPassword('WrongPassword', hash)).toBe(false);
  });

  it('should generate and verify valid JWT session tokens', () => {
    const payload = {
      userId: 'test-user-id-123',
      username: 'harish_admin',
      mustChangePassword: true,
    };

    const token = signToken(payload);
    expect(typeof token).toBe('string');

    const decoded = verifyToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe(payload.userId);
    expect(decoded?.username).toBe(payload.username);
  });
});

describe('Zod Input Validation Schemas', () => {
  it('should validate valid login payload', () => {
    const valid = { username: 'harish_admin', password: 'AdminPassword123!' };
    const result = loginSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('should reject invalid login payload', () => {
    const invalid = { username: '', password: '' };
    const result = loginSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('should validate valid project payload', () => {
    const project = {
      title: 'VideoSense AI',
      subtitle: 'Multimodal Video Intelligence',
      description: 'End-to-end video pipeline',
      problem: 'Video archives are opaque',
      solution: 'Ingest and index with Faiss vector DB',
      features: ['Feature 1', 'Feature 2'],
      technology: ['Python', 'PyTorch'],
      status: 'PUBLISHED',
      isFeatured: true,
      orderIndex: 1,
    };

    const result = projectSchema.safeParse(project);
    expect(result.success).toBe(true);
  });
});
