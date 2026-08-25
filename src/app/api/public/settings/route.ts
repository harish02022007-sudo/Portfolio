import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const setting = await db.siteSetting.findUnique({
      where: { key: 'visual_config' },
    });
    if (!setting) {
      return NextResponse.json({
        heroTagline: 'SYSTEM ONLINE / HARISH R / MACHINE LEARNING ENGINEER',
        accentColor: '#62E6FF',
        visualMode: 'HIGH',
        particleDensity: 'HIGH',
        enable3D: true,
        sections: {
          intro: true,
          identity: true,
          journey: true,
          skills: true,
          projects: true,
          research: true,
          achievements: true,
          contact: true,
        },
      });
    }
    return NextResponse.json(JSON.parse(setting.value));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}
