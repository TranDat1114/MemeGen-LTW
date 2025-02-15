import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of allowed origins
const allowedOrigins = ['http://localhost:3000', 'https://meme-gen-ltw.vercel.app', 'https://meme-gen-ltw-jayandys-projects.vercel.app', 'https://meme-gen-ltw-git-local-dev-jayandys-projects.vercel.app'];

export async function corsMiddleware(req: NextRequest) {
    // 1. Handle CORS
    const origin = req.headers.get('origin');

    if (origin && allowedOrigins.includes(origin)) {
        const response = NextResponse.next();
        response.headers.set('Access-Control-Allow-Origin', origin || '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    } else if (origin) {
        return new NextResponse(null, { status: 403, statusText: 'Forbidden' });
    }
    return NextResponse.next();
}


export const pathConfig = [
    "/api"
]