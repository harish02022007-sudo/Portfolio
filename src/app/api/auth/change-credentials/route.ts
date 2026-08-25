import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession, verifyPassword, hashPassword, signToken, COOKIE_NAME } from '@/lib/auth';
import { z } from 'zod';

const changeCredentialsSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newUsername: z.string().min(3, 'Username must be at least 3 characters').optional(),
  newPassword: z.string().min(8, 'Password must be at least 8 characters').optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = changeCredentialsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { currentPassword, newUsername, newPassword } = result.data;
    if (!newUsername && !newPassword) {
      return NextResponse.json({ error: 'Provide a new username or new password to update' }, { status: 400 });
    }

    const user = await db.adminUser.findUnique({ where: { id: session.userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isMatch = await verifyPassword(currentPassword, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    // Check if newUsername is taken by another user
    if (newUsername && newUsername !== user.username) {
      const existing = await db.adminUser.findUnique({ where: { username: newUsername } });
      if (existing) {
        return NextResponse.json({ error: 'Username is already taken' }, { status: 400 });
      }
    }

    const updateData: { username?: string; passwordHash?: string; mustChangePassword?: boolean } = {};
    if (newUsername) updateData.username = newUsername;
    if (newPassword) {
      updateData.passwordHash = await hashPassword(newPassword);
      updateData.mustChangePassword = false;
    }

    const updatedUser = await db.adminUser.update({
      where: { id: user.id },
      data: updateData,
    });

    const token = signToken({
      userId: updatedUser.id,
      username: updatedUser.username,
      mustChangePassword: updatedUser.mustChangePassword,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Credentials updated successfully',
      username: updatedUser.username,
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Change credentials error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
