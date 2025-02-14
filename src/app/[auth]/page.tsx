import LoginComponent from '@/components/auth/login/presentation/login.component';
import RegisterComponent from '@/components/auth/register/presentation/register.component';
import React from 'react'

type Props = {
    params: { auth: string };
}

export default function AuthPage({ params }: Props) {
    const { auth } = params;
    return (
        <div className="flex justify-center items-center min-h-screen">
            {auth === 'login' && <LoginComponent />}
            {auth === 'register' && <RegisterComponent />}
            {!["login", "register"].includes(auth) && <h1 className="text-red-500">404 - Không tìm thấy trang</h1>}
        </div>
    )
}
