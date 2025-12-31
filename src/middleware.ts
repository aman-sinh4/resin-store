import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// We use 'jose' because 'jsonwebtoken' is not edge compatible
// and middleware runs on the edge.

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'secret'
);

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Protect /admin routes
    if (path.startsWith('/admin')) {
        // Exclude login page if it's under /admin/login (but we might put login elsewhere)
        // If our login page is /admin/login, allow it.
        if (path === '/admin/login') {
            return NextResponse.next();
        }

        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (err) {
            // Invalid token
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
