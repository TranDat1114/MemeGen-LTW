import { UserLoginValidationSchema } from "@/backend/validators/userValidator";
import { REFRESH_TOKEN_LIFETIME } from "@/lib/jwt/handle-token";
import dbConnect from "@/lib/mongodb";
import { UserService } from "@/backend/services/user";
import { BaseResponse } from "@/backend/types/baseResponse";
import { UserLoginRes } from "@/backend/types/userDTO";
import { NextResponse } from "next/server";

const userService = new UserService();

export async function POST(req: Request) {
    try {
        await dbConnect();
        const ip = req.headers.get('x-forwarded-for') || null;

        const { email, password } = await req.json();

        // Type-guard or validate userData as UserDTO
        const { error } = UserLoginValidationSchema.validate({ email, password });
        if (error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 400 });
        }

        const user = await userService.loginUser(email, password, ip ?? "");
        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 400 });
        }
        const response: BaseResponse<UserLoginRes> = {
            success: true,
            result: {
                accessToken: user.accessToken,
                user: user.user
            }
        }
        return NextResponse.json(response, {
            status: 200, headers: {
                'Set-Cookie': `refresh_token=${user.refreshToken}; HttpOnly; Path=/; Max-Age=${REFRESH_TOKEN_LIFETIME}; SameSite=Lax; secure: ${process.env.NODE_ENV === 'production'}`
            }
        });
    }
    catch (error) {
        if ((error as Error).message === 'Invalid email or password') {
            return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 });
        }

        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
}