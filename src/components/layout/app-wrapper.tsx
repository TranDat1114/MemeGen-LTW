"use client"

import { useState } from "react"
import type React from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Separator } from "@/components/ui/separator"

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const toggleLoginStatus = () => {
        setIsLoggedIn(!isLoggedIn)
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header isLoggedIn={isLoggedIn} onLoginToggle={toggleLoginStatus} />
            <main className="flex-1 px-4 md:px-6 py-6">{children}</main>
            <Separator />
            <Footer />
        </div>
    )
}

