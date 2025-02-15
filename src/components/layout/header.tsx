"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/layout/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"
import useAuthStore from "@/stores/auth-store"
import { logout as fetchLogout } from "@/lib/axios/fetch/auth"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import toast from "react-hot-toast"
import { Label } from "../ui/label"
import { useEffect } from "react"


export default function Header() {
    const pathName = usePathname();
    const { accessToken, setAccessToken, user } = useAuthStore();

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


    return (
        <header className="top-0 z-50 sticky bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b w-full">
            <div className="flex items-center h-14 container">
                <div className="md:hidden">
                    <Sidebar />
                </div>
                <div className="hidden md:flex items-center space-x-4 mr-4">
                    <Link href="/" className="font-bold">
                        MemeNFT
                    </Link>
                    <nav className="flex items-center space-x-4">
                        <Link href="/make-meme" className="font-medium text-sm">
                            Make MEME
                        </Link>
                        <Link href="/marketplace" className="font-medium text-sm">
                            Marketplace
                        </Link>
                        <Link href="/meme-feed" className="font-medium text-sm">
                            Meme Feed
                        </Link>
                        <Link href="/trending" className="font-medium text-sm">
                            Trending
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 justify-end items-center space-x-2">
                    <div className="flex-1 md:flex-none w-full md:w-auto">
                        <form className="relative">
                            <Search className="top-2.5 left-2 absolute w-4 h-4 text-muted-foreground" />
                            <Input placeholder="Search memes..." className="pl-8 w-full md:w-[300px] lg:w-[400px]" />
                        </form>
                    </div>
                    <ThemeToggle />
                    {!!accessToken ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="/images/placeholder.jpg?height=32&width=32" alt="User" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>@{user.username}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href="/profile">
                                        <Label>Profile</Label>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    {
                                        accessToken &&
                                        <button id="logout" title="logout" type="button" onClick={logoutOfApp}>
                                            <Label>Log out</Label>
                                        </button>
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

