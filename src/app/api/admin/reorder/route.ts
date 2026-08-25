import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { entity, items } = await req.json(); // items: [{ id: '...', orderIndex: 0 }, ...]

    if (!entity || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const updates = items.map((item: { id: string; orderIndex: number }) => {
      switch (entity) {
        case 'projects':
          return db.project.update({ where: { id: item.id }, data: { orderIndex: item.orderIndex } });
        case 'skills':
          return db.skill.update({ where: { id: item.id }, data: { orderIndex: item.orderIndex } });
        case 'education':
          return db.education.update({ where: { id: item.id }, data: { orderIndex: item.orderIndex } });
        case 'research':
          return db.research.update({ where: { id: item.id }, data: { orderIndex: item.orderIndex } });
        case 'achievements':
          return db.achievement.update({ where: { id: item.id }, data: { orderIndex: item.orderIndex } });
        case 'hackathons':
          return db.hackathon.update({ where: { id: item.id }, data: { orderIndex: item.orderIndex } });
        case 'certifications':
          return db.certification.update({ where: { id: item.id }, data: { orderIndex: item.orderIndex } });
        case 'socialLinks':
          return db.socialLink.update({ where: { id: item.id }, data: { orderIndex: item.orderIndex } });
        case 'timeline':
          return db.timelineEntry.update({ where: { id: item.id }, data: { orderIndex: item.orderIndex } });
        default:
          throw new Error(`Unsupported entity type: ${entity}`);
      }
    });

    await db.$transaction(updates);

    return NextResponse.json({ success: true, message: `Reordered ${items.length} items in ${entity}` });
  } catch (error: any) {
    console.error('Reorder error:', error);
    return NextResponse.json({ error: error.message || 'Failed to reorder items' }, { status: 500 });
  }
}
