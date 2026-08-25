import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const profile = await db.profile.findFirst();
    let imageRelativePath = profile?.profileImage || '/harish-profile.png';

    // Avoid self-referential loop if DB holds '/api/public/profile-image'
    if (imageRelativePath.includes('/api/public/profile-image')) {
      imageRelativePath = '/harish-profile.png';
    }

    const cleanRelPath = imageRelativePath.replace(/^\//, '').split('?')[0];
    let filePath = path.join(process.cwd(), 'public', cleanRelPath);

    try {
      const fileBuffer = await readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const contentType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';

      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400, must-revalidate',
        },
      });
    } catch {
      // Fallback 1: harish-profile.png
      try {
        const pngPath = path.join(process.cwd(), 'public', 'harish-profile.png');
        const pngBuffer = await readFile(pngPath);
        return new NextResponse(pngBuffer, {
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=86400, must-revalidate',
          },
        });
      } catch {}

      // Fallback 2: harish-profile.jpg
      try {
        const jpgPath = path.join(process.cwd(), 'public', 'harish-profile.jpg');
        const jpgBuffer = await readFile(jpgPath);
        return new NextResponse(jpgBuffer, {
          headers: {
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=86400, must-revalidate',
          },
        });
      } catch {}

      // Fallback 3: harish-profile.jpeg
      const jpegPath = path.join(process.cwd(), 'public', 'harish-profile.jpeg');
      const jpegBuffer = await readFile(jpegPath);
      return new NextResponse(jpegBuffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=86400, must-revalidate',
        },
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Image not found' }, { status: 404 });
  }
}
