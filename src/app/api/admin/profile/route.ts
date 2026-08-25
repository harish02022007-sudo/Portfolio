import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { profileSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const profile = await db.profile.findFirst();
  return NextResponse.json(profile);
}

export async function PUT(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const validated = profileSchema.parse(body);

    const existing = await db.profile.findFirst();
    const dataToSave = {
      name: validated.name,
      role: validated.role,
      tagline: validated.tagline,
      biography: validated.biography,
      location: validated.location,
      focusAreas: typeof validated.focusAreas === 'string' ? validated.focusAreas : JSON.stringify(validated.focusAreas),
      profileImage: validated.profileImage || null,
      resumeUrl: validated.resumeUrl || null,
      availability: validated.availability,
    };

    let updated;
    if (existing) {
      updated = await db.profile.update({
        where: { id: existing.id },
        data: dataToSave,
      });
    } else {
      updated = await db.profile.create({
        data: dataToSave,
      });
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update profile' }, { status: 400 });
  }
}
