import LoginComponent from '@/components/auth/login/presentation/login.component';
import RegisterComponent from '@/components/auth/register/presentation/register.component';
import React from 'react'

type Props = {
    params: { auth: string };
}

export default function AuthPage({ params }: Props) {
    const { auth } = params;
    return (<>
        {auth === 'login' && <LoginComponent />}
        {auth === 'register' && <RegisterComponent />}
    </>
    )
}
