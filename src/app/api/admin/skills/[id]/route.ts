import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { skillSchema } from '@/lib/validations';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const validated = skillSchema.parse(body);

    const updated = await db.skill.update({
      where: { id: params.id },
      data: {
        name: validated.name,
        category: validated.category,
        level: validated.level,
        icon: validated.icon || null,
        description: validated.description || null,
        isFocusArea: validated.isFocusArea,
        relatedProjects: validated.relatedProjects ? (typeof validated.relatedProjects === 'string' ? validated.relatedProjects : JSON.stringify(validated.relatedProjects)) : null,
        orderIndex: validated.orderIndex,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update skill' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await db.skill.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: 'Skill deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 400 });
  }
}
