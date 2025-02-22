
import dbConnect from "@/lib/mongodb";
import { UserService } from "@/backend/services/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const userService = new UserService();

export async function GET() {
    // Lấy cookie
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token');
    try {
        await dbConnect();

        if (!refreshToken) {
            return NextResponse.json({ success: false, message: 'No refresh token provided' }, {
                status: 401,
                headers: {
                    'Set-Cookie': `refresh_token=''; HttpOnly; Path=/; Max-Age=-1; SameSite=Lax; secure: ${process.env.NODE_ENV === 'production'}`
                }
            });
        }
        const user = await userService.findByRefreshToken(refreshToken.value);

        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid refresh token' }, {
                status: 403, headers: {
                    'Set-Cookie': `refresh_token=''; HttpOnly; Path=/; Max-Age=-1; SameSite=Lax; secure: ${process.env.NODE_ENV === 'production'}`
                }
            });
        }

        await userService.deleteRefreshTokenAndIP(user._id);
        return NextResponse.json({ success: true }, {
            status: 200, headers: {
                'Set-Cookie': `refresh_token=''; HttpOnly; Path=/; Max-Age=-1; SameSite=Lax; secure: ${process.env.NODE_ENV === 'production'}`
            }
        });
    }
    catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, {
            status: 500, headers: {
                'Set-Cookie': `refresh_token=''; HttpOnly; Path=/; Max-Age=-1; SameSite=Lax; secure: ${process.env.NODE_ENV === 'production'}`
            }
        });
    }
}