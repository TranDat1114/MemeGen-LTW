"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/layout/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname, useRouter } from "next/navigation"
import useAuthStore from "@/stores/auth-store"
import { logout as fetchLogout } from "@/lib/axios/fetch/auth"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


export default function Header() {
    const pathName = usePathname();
    const { accessToken, setAccessToken, user } = useAuthStore();
    const router = useRouter();

    const logoutOfApp = async () => {
        await fetchLogout();
        setAccessToken('');
        toast.success("Logged out successfully");
    }

    useEffect(() => {
        const handleShortcut = (event: KeyboardEvent) => {
            if (event.altKey && event.shiftKey && event.key === "Q") {
                event.preventDefault(); // Ngăn hành động mặc định
                logoutOfApp();
            }
        };

        window.addEventListener("keydown", handleShortcut);

        return () => {
            window.removeEventListener("keydown", handleShortcut);
        };
    }, []);


    const [searchTerm, setSearchTerm] = useState("")


    return (
        <header className="top-0 z-50 sticky bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur-3xl border-b w-full">
            <div className="flex items-center h-14 container">
                <div className="md:hidden">
                    <Sidebar />
                </div>
                <div className="hidden md:flex items-center space-x-4 mr-4 uppercase">
                    <Link href="/" className="font-bold">
                        Meme GEN
                    </Link>
                    <nav className="flex items-center space-x-4">
                        <Link href="/make-meme" className="font-medium text-sm">
                            Make MEME
                        </Link>
                        <Link href="/meme-feed" className="font-medium text-sm">
                            Meme Feed
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 justify-end items-center space-x-2">
                    <div className="flex-1 md:flex-none w-full md:w-auto">
                        <form
                            className="relative flex-1 md:flex-none w-full md:w-auto"
                            onSubmit={(e) => {
                                e.preventDefault()
                                router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
                            }}
                        >
                            <Search className="top-2.5 left-2 absolute w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search memes & templates..."
                                className="pl-8 w-full md:w-[300px]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                    </div>
                    <ThemeToggle />
                    {!!accessToken ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="border-2 border-foreground">
                                    <AvatarImage src="/images/placeholder.jpg?height=32&width=32" alt="User" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuItem asChild>
                                    <Link href="/me" className="cursor-pointer">
                                        <Button variant={'link'}>
                                            @{user.username}
                                        </Button>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/settings" className="cursor-pointer" >
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    {
                                        accessToken &&
                                        <Button className="w-full"
                                            id="logout"
                                            title="logout"
                                            type="button"
                                            onClick={logoutOfApp}>
                                            Log out
                                        </Button>
                                    }
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : pathName !== "/login" ? (
                        <Link href="/login">
                            <Button className="hidden md:flex">Login</Button>
                        </Link>
                    ) :
                        <Link href="/auth/register">
                            <Button className="hidden md:flex">Register</Button>
                        </Link>
                    }
                </div>
            </div>
        </header>
    )
}

