"use client"

import type React from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Separator } from "@/components/ui/separator"
import useAuthStore from "@/stores/auth-store"

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    const { accessToken } = useAuthStore();


    return (
        <div className="flex flex-col min-h-screen">
            <Header isLoggedIn={!!accessToken} />
            <main className="flex-1 px-4 md:px-6 py-6">{children}</main>
            <Separator />
            <Footer />
        </div>
    )
}

