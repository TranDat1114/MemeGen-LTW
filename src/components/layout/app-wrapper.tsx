import type React from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Separator } from "@/components/ui/separator"

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-svh">
            <Header />
            <main className="flex-1 px-4 md:px-6 py-2">{children}</main>
            <Separator />
            <Footer />
        </div>
    )
}

