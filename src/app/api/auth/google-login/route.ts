import { UserService } from "@/backend/services/user";
import { BaseResponse } from "@/backend/types/baseResponse";
import { UserLoginRes } from "@/backend/types/userDTO";
import { REFRESH_TOKEN_LIFETIME } from "@/lib/jwt/handle-token";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
const userService = new UserService();

async function POST(req: Request) {
    try {
        await dbConnect();
        const ip = req.headers.get('x-forwarded-for') || null;

        const { email, photoURL } = await req.json();

        console.log(email, photoURL);
        const loginResult = await userService.loginWithGoogle(email, ip ?? "", photoURL);
        if (!loginResult) {
            throw new Error('Login failed');
        }
        const response: BaseResponse<UserLoginRes> = {
            success: true,
            result: {
                user: loginResult.userLoginRes.user,
                accessToken: loginResult.userLoginRes.accessToken
            }
        }
        return NextResponse.json(response, {
            status: loginResult.newUser ? 201 : 200, headers: {
                'Set-Cookie': `refresh_token=${loginResult.userLoginRes.refreshToken}; HttpOnly; Path=/; Max-Age=${REFRESH_TOKEN_LIFETIME}; SameSite=Lax; secure: ${process.env.NODE_ENV === 'production'}`
            }
        });
    } catch (error) {
        console.error((error as Error).message);
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
}
export { POST };