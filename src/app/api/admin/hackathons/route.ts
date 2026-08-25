import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { hackathonSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const items = await db.hackathon.findMany({ orderBy: { orderIndex: 'asc' } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const validated = hackathonSchema.parse(body);
    const created = await db.hackathon.create({
      data: {
        ...validated,
        technologies: typeof validated.technologies === 'string' ? validated.technologies : JSON.stringify(validated.technologies),
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create hackathon' }, { status: 400 });
  }
}
