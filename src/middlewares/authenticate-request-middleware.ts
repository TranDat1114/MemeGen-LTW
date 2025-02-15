import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt/handle-token';

// Middleware function to handle AccessToken
export async function authenticateRequestMiddleware(req: NextRequest) {
    const authHeader = req.headers.get('Authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' part
    const tokenPayload = verifyAccessToken(token);
    if (!tokenPayload) {
        return new NextResponse(JSON.stringify({ error: 'Invalid or Expired Token' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Continue if the token is valid
    return NextResponse.next();
}

export const pathConfig = [
    "/api/protected",
    "/api/users"
]