import ForgotPasswordComponent from "@/components/auth/forgot-password/presentation/forgotPassword.component";
import LoginComponent from "@/components/auth/login/presentation/login.component";
import RegisterComponent from "@/components/auth/register/presentation/register.component";

export const authPathConfig = [
    {
        path: "/login",
        redirectPath: "/",
        component: <LoginComponent />
    },
    {
        path: "/register",
        redirectPath: "/",
        component: <RegisterComponent />
    },
    {
        path: "/forgot-password",
        redirectPath: "/",
        component: <ForgotPasswordComponent />
    }
]