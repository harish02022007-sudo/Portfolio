import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { researchSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const research = await db.research.findMany({ orderBy: { orderIndex: 'asc' } });
  return NextResponse.json(research);
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const validated = researchSchema.parse(body);
    const created = await db.research.create({
      data: {
        title: validated.title,
        question: validated.question,
        description: validated.description,
        approach: validated.approach,
        currentStatus: validated.currentStatus,
        futureDirection: validated.futureDirection || null,
        tags: validated.tags ? (typeof validated.tags === 'string' ? validated.tags : JSON.stringify(validated.tags)) : null,
        status: validated.status,
        orderIndex: validated.orderIndex,
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create research entry' }, { status: 400 });
  }
}
