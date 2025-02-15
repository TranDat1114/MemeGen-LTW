"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"

interface Meme {
    id: number
    imageUrl: string
    title: string
    creator: string
    likes: number
    comments: number
}

const ITEMS_PER_PAGE = 5

export default function MemeFeed() {
    const [memes, setMemes] = useState<Meme[]>([])
    const [page, setPage] = useState(1)
    const [ref, inView] = useInView()

    const fetchMemes = async (pageNum: number) => {
        // In a real application, you would fetch memes from an API
        // For this example, we'll generate mock data
        const newMemes = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({
            id: (pageNum - 1) * ITEMS_PER_PAGE + i + 1,
            imageUrl: `/images/placeholder.jpg?height=600&width=400&text=Meme+${(pageNum - 1) * ITEMS_PER_PAGE + i + 1}`,
            title: `Meme ${(pageNum - 1) * ITEMS_PER_PAGE + i + 1}`,
            creator: `User${Math.floor(Math.random() * 100) + 1}`,
            likes: Math.floor(Math.random() * 1000),
            comments: Math.floor(Math.random() * 100),
        }))

        return newMemes
    }

    useEffect(() => {
        if (inView) {
            fetchMemes(page).then((newMemes) => {
                setMemes((prevMemes) => [...prevMemes, ...newMemes])
                setPage((prevPage) => prevPage + 1)
            })
        }
    }, [inView, page])

    return (
        <div className="mx-auto px-4 py-8 container">
            <h1 className="mb-8 font-bold text-4xl">Meme Feed</h1>
            <div className="space-y-8">
                {memes.map((meme) => (
                    <Card key={meme.id} className="mx-auto max-w-md">
                        <CardContent className="p-0">
                            <div className="relative aspect-[4/5]">
                                <Image
                                    src={meme.imageUrl || "/images/placeholder.jpg"}
                                    alt={meme.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-lg"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="mb-2 font-semibold text-xl">{meme.title}</h2>
                                <p className="mb-4 text-gray-500 text-sm">Created by: {meme.creator}</p>
                                <div className="flex justify-between items-center">
                                    <Button variant="ghost" size="sm">
                                        <Heart className="mr-2 w-5 h-5" />
                                        {meme.likes}
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <MessageCircle className="mr-2 w-5 h-5" />
                                        {meme.comments}
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Share2 className="mr-2 w-5 h-5" />
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                <div ref={ref} className="h-10" />
            </div>
        </div>
    )
}

