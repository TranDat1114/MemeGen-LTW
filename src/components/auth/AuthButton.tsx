"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
    const { data: session } = useSession();

    return (
        <div>
            {session ? (
                <div>
                    <p>Chào, {session.user?.name}!</p>
                    <button
                        onClick={() => signOut()}
                        className="bg-red-500 px-4 py-2 rounded text-white"
                    >
                        Đăng xuất
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => signIn("google")}
                    className="bg-blue-500 px-4 py-2 rounded text-white"
                >
                    Đăng nhập với Google
                </button>
            )}
        </div>
    );
}
