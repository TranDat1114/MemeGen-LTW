// pages/api/users.ts
import { UserService } from '@/backend/services/user';
import dbConnect from '@/libs/mongodb';
import { NextResponse } from 'next/server';
import { UserDTO } from '@/backend/types/userDTO';
import { UserDTOValidationSchema } from '@/backend/validators/userValidator';

const userService = new UserService();

async function POST(req: Request) {
    try {
        await dbConnect();
        const userData = await req.json();

        // Type-guard or validate userData as UserDTO
        const userDto: UserDTO = userData;
        const { error } = UserDTOValidationSchema.validate(userDto);
        if (error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 400 });
        }

        const user = await userService.createUser(userDto);
        return NextResponse.json({ success: true, data: user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
}

async function GET() {
    try {
        await dbConnect();
        const users = await userService.getAllUsers();
        return NextResponse.json({ success: true, data: users }, { status: 200 });
    } catch (error) {
        console.error((error as Error).message);
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
}

export { POST, GET };