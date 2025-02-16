"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, PlusSquare, ShoppingBag, User, LogIn, Film } from "lucide-react"
import useAuthStore from "@/stores/auth-store"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const sidebarItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Make Meme", href: "/make-meme", icon: PlusSquare },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
    // { name: "View User", href: "/user/coolmemer", icon: User },
    { name: "Meme Feed", href: "/meme-feed", icon: Film },
]

export function Sidebar() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const { accessToken, setAccessToken, user, setUser } = useAuthStore();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-6 h-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col h-full">
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <SheetHeader>
                                <SheetTitle className="mb-2 px-4 font-semibold text-lg tracking-tight">
                                    Menu
                                </SheetTitle>
                            </SheetHeader>
                            <div className="space-y-1">
                                {sidebarItems.map((item) => (
                                    <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                                        <span
                                            className={cn(
                                                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                                pathname === item.href ? "bg-accent" : "transparent",
                                            )}
                                        >
                                            <item.icon className="mr-2 w-4 h-4" />
                                            <span>{item.name}</span>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto p-4">
                        {!!accessToken ? (
                            <Link href="/me" className="flex justify-betweenflex-row items-center space-x-2 hover:bg-accent rounded-md font-medium text-sm hover:text-accent-foreground">
                                <Avatar className="border-2 border-foreground">
                                    <AvatarImage src={user.imageUrl} alt="User" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <span className="font-semibold text-sm hover:text-accent-foreground">
                                    @{user.username}
                                </span>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <span
                                    className={cn(
                                        "flex items-center flex-row rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                        pathname === "/login" ? "bg-accent" : "transparent",
                                    )}
                                >
                                    <LogIn className="mr-2 w-4 h-4" />
                                    Login
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

