import { NextRequest, NextResponse } from 'next/server';
import { getAdminUsers, createAdminUser, updateAdminUserPermissions, deleteAdminUser } from '@/lib/admin-store';

export async function GET(req: NextRequest) {
  try {
    const users = getAdminUsers();
    return NextResponse.json({ success: true, users });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, name, email, password, roleNameZh, roleNameEn, permissions } = body;

    if (!username || !name || !email) {
      return NextResponse.json({ error: 'Username, name, and email are required' }, { status: 400 });
    }

    const newUser = createAdminUser({
      username,
      name,
      email,
      password,
      roleNameZh,
      roleNameEn,
      permissions: permissions || [],
    });

    const { password: _, ...safeUser } = newUser;
    return NextResponse.json({ success: true, user: safeUser });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error creating user' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, permissions, status } = body;

    if (!userId || !permissions) {
      return NextResponse.json({ error: 'User ID and permissions are required' }, { status: 400 });
    }

    const updated = updateAdminUserPermissions(userId, permissions, status);
    if (!updated) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { password: _, ...safeUser } = updated;
    return NextResponse.json({ success: true, user: safeUser });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating user' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const success = deleteAdminUser(userId);
    if (!success) {
      return NextResponse.json({ error: 'Cannot delete user (super admin is protected)' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error deleting user' }, { status: 500 });
  }
}
