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
        const token = request.cookies.get('token')?.value;

        // If on login page and has token, try to redirect to dashboard
        if (path === '/admin/login') {
            if (token) {
                try {
                    await jwtVerify(token, JWT_SECRET);
                    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
                } catch (err) {
                    // Invalid token, stay on login page
                    return NextResponse.next();
                }
            }
            return NextResponse.next();
        }

        // For all other admin routes, require valid token
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
