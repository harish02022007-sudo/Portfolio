import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { researchSchema } from '@/lib/validations';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const validated = researchSchema.parse(body);
    const updated = await db.research.update({
      where: { id: params.id },
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
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update research entry' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await db.research.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete research entry' }, { status: 400 });
  }
}
