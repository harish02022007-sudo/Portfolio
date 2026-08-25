import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const certs = await db.certification.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { orderIndex: 'asc' },
    });
    return NextResponse.json(certs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 });
  }
}
