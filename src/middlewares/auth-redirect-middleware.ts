// import { NextRequest, NextResponse } from 'next/server';
// export async function authPathMiddleware(req: NextRequest, pathname: string) {
//     const token = req.cookies.get("refresh_token");

//     // If in auth pages and already have token => redirect home
//     if (authPathConfig.includes(pathname)) {
//         if (token) {
//             console.log('demoooo');
//             return NextResponse.redirect(new URL("/", req.url));
//         }
//     }

//     return NextResponse.next();
// }

// export const authPathConfig = [
//     "/login",
//     "/auth/register"
// ]