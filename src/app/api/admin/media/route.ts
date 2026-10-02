import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
  'application/pdf',
];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB

export async function GET(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const media = await db.mediaItem.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(media);
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: `File type ${file.type} is not permitted.` }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 15 MB limit' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let publicUrl = '';
    const ext = path.extname(file.name) || '.bin';
    const safeFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;

    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadsDir, { recursive: true });
      const filePath = path.join(uploadsDir, safeFilename);
      await writeFile(filePath, buffer);
      publicUrl = `/uploads/${safeFilename}`;
    } catch (fsErr) {
      // Fallback for Vercel read-only filesystem
      const base64 = buffer.toString('base64');
      const mime = file.type || 'application/octet-stream';
      publicUrl = `data:${mime};base64,${base64}`;
    }

    const mediaRecord = await db.mediaItem.create({
      data: {
        filename: safeFilename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url: publicUrl,
      },
    });

    return NextResponse.json(mediaRecord, { status: 201 });
  } catch (error: any) {
    console.error('Media upload error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload media file' }, { status: 500 });
  }
}
