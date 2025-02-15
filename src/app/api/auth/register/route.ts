import { UserService } from '@/backend/services/user';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { UserDTO } from '@/backend/types/userDTO';
import { UserDTOValidationSchema } from '@/backend/validators/userValidator';

const userService = new UserService();

export async function POST(req: Request) {
    try {
        await dbConnect();
        const userData = await req.json();
        // Type-guard or validate userData as UserDTO
        const userDto: UserDTO = userData;
        const { error } = UserDTOValidationSchema.validate(userDto);

        //send mail

        if (error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 400 });
        }

        if (await userService.getUserByEmail(userDto.email)) {
            return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 400 });
        }

        const user = await userService.createUser(userDto);
        return NextResponse.json({ success: true, data: user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
}