import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from '@/libs/mongodb';
import { UserService } from "@/backend/services/user";

const userService = new UserService();
export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            await dbConnect();

            // Kiểm tra xem user đã tồn tại trong DB chưa
            const existingUser = await userService.getUserByEmail(user.email!);

            if (!existingUser) {
                // Nếu chưa, tạo user mới
                await userService.createUser({
                    email: user.email!,
                    username: user.name!,
                    imageUrl: user.image!,
                    //random password with 10 characters
                    password: Math.random().toString(36).slice(-10),
                    userType: 'User',
                });
            }

            return true;
        },
        async session({ session }) {
            await dbConnect();

            // Lấy user từ DB
            // if (session.user && session.user.email) {
            //     const dbUser = await userService.getUserByEmail(session.user.email);
            //     if (dbUser) {
            //         session.user.id = dbUser._id.toString();
            //     }
            // }

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET!,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
