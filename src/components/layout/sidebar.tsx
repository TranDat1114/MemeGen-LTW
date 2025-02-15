"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, PlusSquare, ShoppingBag, User, LogIn, Film } from "lucide-react"

const sidebarItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Make Meme", href: "/make-meme", icon: PlusSquare },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
    // { name: "View User", href: "/user/coolmemer", icon: User },
    { name: "Meme Feed", href: "/meme-feed", icon: Film },
]

interface SidebarProps {
    isLoggedIn: boolean
}

export function Sidebar({ isLoggedIn }: SidebarProps) {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

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
                                {isLoggedIn && (
                                    <Link href="/profile" onClick={() => setOpen(false)}>
                                        <span
                                            className={cn(
                                                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                                pathname === "/profile" ? "bg-accent" : "transparent",
                                            )}
                                        >
                                            <User className="mr-2 w-4 h-4" />
                                            <span>Profile</span>
                                        </span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto p-4">
                        {isLoggedIn ? (
                            <>
                                <LogIn className="mr-2 w-4 h-4" />
                                Logout
                            </>
                        ) : (
                            <>
                                <LogIn className="mr-2 w-4 h-4" />
                                Login
                            </>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

