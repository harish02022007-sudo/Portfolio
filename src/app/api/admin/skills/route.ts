import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { skillSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const skills = await db.skill.findMany({ orderBy: { orderIndex: 'asc' } });
  return NextResponse.json(skills);
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const validated = skillSchema.parse(body);

    const created = await db.skill.create({
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

    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create skill' }, { status: 400 });
  }
}
