import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { projectSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const projects = await db.project.findMany({
    orderBy: { orderIndex: 'asc' },
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const validated = projectSchema.parse(body);

    const newProject = await db.project.create({
      data: {
        title: validated.title,
        subtitle: validated.subtitle,
        description: validated.description,
        problem: validated.problem,
        solution: validated.solution,
        features: typeof validated.features === 'string' ? validated.features : JSON.stringify(validated.features),
        technology: typeof validated.technology === 'string' ? validated.technology : JSON.stringify(validated.technology),
        architecture: validated.architecture || null,
        results: validated.results || null,
        githubUrl: validated.githubUrl || null,
        liveDemoUrl: validated.liveDemoUrl || null,
        images: validated.images ? (typeof validated.images === 'string' ? validated.images : JSON.stringify(validated.images)) : null,
        videos: validated.videos ? (typeof validated.videos === 'string' ? validated.videos : JSON.stringify(validated.videos)) : null,
        pipeline: validated.pipeline ? (typeof validated.pipeline === 'string' ? validated.pipeline : JSON.stringify(validated.pipeline)) : null,
        tags: validated.tags ? (typeof validated.tags === 'string' ? validated.tags : JSON.stringify(validated.tags)) : null,
        status: validated.status,
        isFeatured: validated.isFeatured,
        orderIndex: validated.orderIndex,
        date: validated.date || null,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create project' }, { status: 400 });
  }
}
