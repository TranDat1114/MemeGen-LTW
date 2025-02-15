import { NextRequest, NextResponse } from "next/server";
import { corsMiddleware, pathConfig as corsPathConfig } from "@/middlewares/cors-middleware";
import { authenticateRequestMiddleware, pathConfig as authRequestPathConfig } from "@/middlewares/authenticate-request-middleware";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 1. Apply CORS middleware cho các route trong `corsPathConfig`
    const isCorsPath = corsPathConfig.some((path) => pathname.startsWith(path));
    if (isCorsPath) {
        const corsResponse = await corsMiddleware(req);
        if (corsResponse.status !== 200) {
            return corsResponse;
        }
    }

    // 2. Apply AuthRequest middleware cho các route trong `authPathConfig`
    const isProtectedPath = authRequestPathConfig.some((path) => pathname.startsWith(path));
    if (isProtectedPath) {
        const authResponse = await authenticateRequestMiddleware(req);
        if (authResponse.status !== 200) {
            return authResponse;
        }
    }

    return NextResponse.next(); // Cho phép tiếp tục nếu tất cả đều hợp lệ

}

// Cấu hình matcher để áp dụng cho từng route
export const config = {
    matcher: ['/:path*'],
};