"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HashIcon as Hashtag, Search, SlidersHorizontal } from "lucide-react"

interface Meme {
    id: number
    title: string
    imageUrl: string
    creator: string
    likes: number
    comments: number
}

export default function TagPage() {
    const params = useParams()
    const tag = params.tag as string
    const [memes, setMemes] = useState<Meme[]>([])
    const [sortBy, setSortBy] = useState("latest")
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        // In a real app, you would fetch memes based on the tag from an API
        const fetchedMemes = Array.from({ length: 12 }, (_, i) => ({
            id: i + 1,
            title: `${tag} Meme ${i + 1}`,
            imageUrl: `/images/placeholder.jpg?height=300&width=300&text=${tag}+${i + 1}`,
            creator: `User${Math.floor(Math.random() * 100) + 1}`,
            likes: Math.floor(Math.random() * 1000),
            comments: Math.floor(Math.random() * 100),
        }))
        setMemes(fetchedMemes)
    }, [tag])

    const filteredMemes = memes.filter((meme) => meme.title.toLowerCase().includes(searchTerm.toLowerCase()))

    const sortedMemes = [...filteredMemes].sort((a, b) => {
        switch (sortBy) {
            case "likes":
                return b.likes - a.likes
            case "comments":
                return b.comments - a.comments
            default:
                return b.id - a.id // Latest by default
        }
    })

    return (
        <div className="mx-auto px-4 py-8 container">
            <div className="flex items-center mb-8">
                <Hashtag className="mr-2 w-8 h-8 text-primary" />
                <h1 className="font-bold text-4xl">{tag}</h1>
            </div>

            <div className="flex sm:flex-row flex-col justify-between items-center gap-4 mb-8">
                <div className="relative w-full sm:w-64">
                    <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
                    <Input
                        placeholder="Search memes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latest">Latest</SelectItem>
                            <SelectItem value="likes">Most Liked</SelectItem>
                            <SelectItem value="comments">Most Commented</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                        <SlidersHorizontal className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedMemes.map((meme) => (
                    <Link href={`/meme/${meme.id}`} key={meme.id}>
                        <Card className="hover:shadow-lg overflow-hidden transition-shadow">
                            <CardContent className="p-0">
                                <div className="relative aspect-square">
                                    <Image
                                        src={meme.imageUrl || "/images/placeholder.jpg"}
                                        alt={meme.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="mb-2 font-semibold">{meme.title}</h3>
                                    <p className="mb-2 text-muted-foreground text-sm">by {meme.creator}</p>
                                    <div className="flex justify-between text-muted-foreground text-sm">
                                        <span>{meme.likes} likes</span>
                                        <span>{meme.comments} comments</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

