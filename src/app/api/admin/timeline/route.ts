import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const timeline = await db.timelineEntry.findMany({ orderBy: { orderIndex: 'asc' } });
  return NextResponse.json(timeline);
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const created = await db.timelineEntry.create({
      data: {
        year: body.year,
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        orderIndex: body.orderIndex || 0,
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create timeline entry' }, { status: 400 });
  }
}
