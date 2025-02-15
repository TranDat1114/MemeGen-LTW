import { UserService } from "@/backend/services/user";
import { UserDTO } from "@/backend/types/userDTO";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
const userService = new UserService();

async function GET(req: Request) {
    try {
        await dbConnect();
        const { email } = await req.json();
        
        const users = await userService.getUserByEmail(email);
        console.log(users);
        const newUser = { email:email }
      
        const user = await userService.createUser(newUser);

        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        console.error((error as Error).message);
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
}
export { GET };