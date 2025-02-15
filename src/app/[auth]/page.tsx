"use client"
import { authPathConfig } from "@/lib/router"
import useAuthStore from "@/stores/auth-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import NotFound from "./not-found";


export default function AuthPage() {
    const pathName = usePathname();
    const router = useRouter();
    const { accessToken } = useAuthStore();

    // Redirect to home page if user is already logged in
    useEffect(() => {
        if (accessToken) {
            const isAuthPath = authPathConfig.find((config) => config.path === `${pathName}`);
            if (isAuthPath) {
                router.push(isAuthPath.redirectPath);
            }
            return;
        }
    }, [accessToken, router, pathName]);

    if (!authPathConfig.find((config) => config.path === pathName)) {
        return <NotFound />
    }

    return (
        <>
            {
                authPathConfig.map((config) =>
                    accessToken ? undefined
                        :
                        config.path === pathName &&
                        <div key={config.path}>
                            {config.component}
                        </div>
                )
            }
        </>
    )
}
