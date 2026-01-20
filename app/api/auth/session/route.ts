import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const adminSession = request.cookies.get('admin_session');

    const isAuthenticated = adminSession?.value === 'true';

    return NextResponse.json({
        isAuthenticated
    });
}
