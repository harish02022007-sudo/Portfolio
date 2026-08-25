import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const setting = await db.siteSetting.findUnique({ where: { key: 'visual_config' } });
  return NextResponse.json(setting ? JSON.parse(setting.value) : {});
}

export async function PUT(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const updated = await db.siteSetting.upsert({
      where: { key: 'visual_config' },
      update: { value: JSON.stringify(body) },
      create: { key: 'visual_config', value: JSON.stringify(body) },
    });

    return NextResponse.json({ success: true, settings: JSON.parse(updated.value) });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 400 });
  }
}
