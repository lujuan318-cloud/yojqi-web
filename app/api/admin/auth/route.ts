import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin, getAdminUsers } from '@/lib/admin-store';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const user = authenticateAdmin(username, password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password, or account is disabled.' },
        { status: 401 }
      );
    }

    const { password: _, ...safeUser } = user;
    return NextResponse.json({
      success: true,
      user: safeUser,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Auth error' }, { status: 500 });
  }
}
