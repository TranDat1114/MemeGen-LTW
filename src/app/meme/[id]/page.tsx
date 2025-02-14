"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Heart, MessageCircle, Share2, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

// Mock data for the meme
const memeData = {
    id: "1",
    title: "Funny Cat Meme",
    imageUrl: "/images/placeholder.jpg?height=400&width=400",
    creator: {
        name: "John Doe",
        avatar: "/images/placeholder.jpg?height=40&width=40",
        username: "@johndoe",
    },
    likes: 1234,
    comments: 56,
    shares: 78,
    price: 0.5,
    description: "This hilarious cat meme will make your day! 😹",
    tags: ["funny", "cats", "memes"],
}

// Mock data for related memes
const relatedMemes = [
    { id: "2", title: "Dog vs Cat", imageUrl: "/images/placeholder.jpg?height=150&width=150" },
    { id: "3", title: "Grumpy Cat", imageUrl: "/images/placeholder.jpg?height=150&width=150" },
    { id: "4", title: "Nyan Cat", imageUrl: "/images/placeholder.jpg?height=150&width=150" },
]

export default function MemePage() {
    const params = useParams()
    const [comment, setComment] = useState("")

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the comment to your backend
        console.log("Submitted comment:", comment)
        setComment("")
    }

    return (
        <div className="mx-auto px-4 py-8 container">
            <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-2">
                    <Card>
                        <CardContent className="p-6">
                            <div className="relative mb-4 aspect-square">
                                <Image
                                    src={memeData.imageUrl || "/images/placeholder.jpg"}
                                    alt={memeData.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <h1 className="mb-2 font-bold text-2xl">{memeData.title}</h1>
                            <div className="flex items-center mb-4">
                                <Avatar className="mr-2 w-8 h-8">
                                    <AvatarImage src={memeData.creator.avatar} alt={memeData.creator.name} />
                                    <AvatarFallback>{memeData.creator.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-muted-foreground text-sm">{memeData.creator.username}</span>
                            </div>
                            <p className="mb-4 text-muted-foreground">{memeData.description}</p>
                            <div className="flex space-x-4 mb-4">
                                <Button variant="outline" size="sm">
                                    <Heart className="mr-2 w-4 h-4" /> {memeData.likes}
                                </Button>
                                <Button variant="outline" size="sm">
                                    <MessageCircle className="mr-2 w-4 h-4" /> {memeData.comments}
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Share2 className="mr-2 w-4 h-4" /> {memeData.shares}
                                </Button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <DollarSign className="mr-1 w-5 h-5 text-green-500" />
                                    <span className="font-bold text-xl">{memeData.price} ETH</span>
                                </div>
                                <Button>Buy Now</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-8">
                        <CardContent className="p-6">
                            <h2 className="mb-4 font-semibold text-xl">Comments</h2>
                            <form onSubmit={handleCommentSubmit} className="mb-4">
                                <Textarea
                                    placeholder="Add a comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="mb-2"
                                />
                                <Button type="submit">Post Comment</Button>
                            </form>
                            {/* Here you would map through and display actual comments */}
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <Avatar>
                                        <AvatarImage src="/images/placeholder.jpg?height=40&width=40" alt="User" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">User123</p>
                                        <p className="text-muted-foreground text-sm">Great meme! 😂</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="mb-4 font-semibold text-xl">Related Memes</h2>
                            <div className="gap-4 grid grid-cols-2">
                                {relatedMemes.map((meme) => (
                                    <Link href={`/meme/${meme.id}`} key={meme.id} className="block">
                                        <div className="relative aspect-square">
                                            <Image
                                                src={meme.imageUrl || "/images/placeholder.jpg"}
                                                alt={meme.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-center">{meme.title}</p>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-8">
                        <CardContent className="p-6">
                            <h2 className="mb-4 font-semibold text-xl">Tags</h2>
                            <div className="flex flex-wrap gap-2">
                                {memeData.tags.map((tag) => (
                                    <Link
                                        href={`/tag/${tag}`}
                                        key={tag}
                                        className="bg-secondary hover:bg-secondary/80 px-3 py-1 rounded-full text-secondary-foreground text-sm transition-colors"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

