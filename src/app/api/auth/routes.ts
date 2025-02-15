import { verifyRefreshToken } from "@/lib/jwt/handle-token";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { refreshToken } = await req.json();
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
        return NextResponse.json({ success: false, message: 'Invalid refresh token' })
    }
    return NextResponse.json({ success: true });

}