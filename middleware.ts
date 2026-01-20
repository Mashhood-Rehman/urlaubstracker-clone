import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the request is for an admin route
    if (pathname.startsWith('/admin')) {
        const adminSession = request.cookies.get('admin_session');

        // If no session cookie is found, redirect to the login page
        if (!adminSession || adminSession.value !== 'true') {
            const loginUrl = new URL('/auth/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/admin/:path*'],
};
