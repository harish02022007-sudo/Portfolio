import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const research = await db.research.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { orderIndex: 'asc' },
    });
    return NextResponse.json(research);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch research entries' }, { status: 500 });
  }
}
