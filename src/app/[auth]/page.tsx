"use client"
import { authPathConfig } from "@/lib/router"
import useAuthStore from "@/stores/auth-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";


export default function AuthPage() {
    const pathName = usePathname();
    const router = useRouter();
    const { accessToken } = useAuthStore();
    useEffect(() => {
        if (accessToken) {
            const isAuthPath = authPathConfig.find((config) => config.path === `${pathName}`);
            if (isAuthPath) {
                router.push(isAuthPath.redirectPath);
            }
            return;
        }
    }, [accessToken, router]);

    return (
        <>
            {
                authPathConfig.map((config) =>
                    accessToken ?
                        undefined
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
