"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/layout/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
    isLoggedIn: boolean
    onLoginToggle: () => void
}

export default function Header({ isLoggedIn, onLoginToggle }: HeaderProps) {
    return (
        <header className="top-0 z-50 sticky bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b w-full">
            <div className="flex items-center h-14 container">
                <div className="md:hidden">
                    <Sidebar isLoggedIn={isLoggedIn} onLoginToggle={onLoginToggle} />
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
                    {isLoggedIn ? (
                        <Link href="/profile">
                            <Avatar>
                                <AvatarImage src="/images/placeholder.jpg?height=32&width=32" alt="User" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </Link>
                    ) : (
                        <Button onClick={onLoginToggle} className="hidden md:flex">
                            Login
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}

