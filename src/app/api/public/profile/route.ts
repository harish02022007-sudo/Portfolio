import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const profile = await db.profile.findFirst();
    if (!profile) {
      return NextResponse.json({
        name: 'Harish R',
        role: 'Machine Learning Engineer',
        tagline: 'SYSTEM ONLINE / HARISH R / MACHINE LEARNING ENGINEER',
        biography: 'Machine Learning Engineer passionate about Deep Learning, Computer Vision, and Autonomous AI.',
        location: 'Coimbatore, Tamil Nadu, India',
        focusAreas: JSON.stringify([
          'Computer Vision',
          'Deep Learning',
          'NLP',
          'LLMs',
          'Generative AI',
          'Agentic AI',
          'Multimodal AI',
          'Machine Learning',
          'AI Research',
        ]),
        availability: true,
      });
    }
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Public profile fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
