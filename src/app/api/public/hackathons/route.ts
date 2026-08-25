import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const hackathons = await db.hackathon.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { orderIndex: 'asc' },
    });
    return NextResponse.json(hackathons);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hackathons' }, { status: 500 });
  }
}
