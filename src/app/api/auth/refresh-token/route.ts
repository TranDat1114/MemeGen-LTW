import { NextResponse } from 'next/server';
import { generateAccessToken, verifyRefreshToken } from '@/lib/jwt/handle-token';
import { UserService } from '@/backend/services/user';
import dbConnect from '@/lib/mongodb';
import { cookies } from 'next/headers';

const userService = new UserService();

export async function GET(req: Request) {
    // Lấy địa chỉ IP
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('host');

    // Lấy cookie
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token');

    // Cookie không nên được viết trong Try-Catch block
    //[Error] Dynamic server usage: Route /app couldn't be rendered statically because it used cookies, which are not supported in static mode. The server rendered a fallback.
    try {

        await dbConnect();

        if (!refreshToken) {
            return NextResponse.json({ success: false, message: 'No refresh token provided' }, { status: 401 });
        }

        // Xác thực refresh token
        const decoded = verifyRefreshToken(refreshToken.value);
        if (!decoded) {


            return NextResponse.json({ success: false, message: 'Invalid refresh token' }, {
                status: 401, //set cookie to 
            });
        }

        // Kiểm tra nếu refresh token đã tồn tại trong database
        const user = await userService.getUserByObjectId(decoded.userId);
        if (!user || user.refreshToken !== refreshToken.value) {
            console.log('YOU ARE NOT ALLOWED TO REFRESH TOKEN');
            return NextResponse.json({ success: false, message: 'Invalid refresh token' }, { status: 401 });
        }

        if (user.deviceIp !== ip) {
            return NextResponse.json({ success: false, message: 'Invalid IP address' }, { status: 403 });
        }

        // Tạo Access Token mới
        const newAccessToken = generateAccessToken(user);
        return NextResponse.json({ success: true, accessToken: newAccessToken }, { status: 200 });
    } catch (error) {
        console.error((error as Error).message);
        return NextResponse.json({ success: false, message: 'Failed to refresh token' }, { status: 500 });
    }
}