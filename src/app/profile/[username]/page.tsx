"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock user data (in a real app, this would come from an API)
const mockUserData = {
    username: "coolmemer",
    name: "Cool Memer",
    avatar: "https://r6j0-my.sharepoint.com/personal/cctalk1114_r6j0_onmicrosoft_com/Documents/OLD%20SCHOOL/Documents/Image/placeholder-img.jpg",
    bio: "I create the dankest memes on the internet! 😎",
    followers: 1234,
    following: 567,
    joinedDate: "January 2023",
    createdMemes: [
        { id: "1", title: "Funny Cat", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: "2", title: "Doge Meme", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: "3", title: "Distracted Boyfriend", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
    collectedNFTs: [
        { id: "4", title: "Rare Pepe", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: "5", title: "Wojak", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
}

export default function UserProfilePage() {
    const params = useParams()
    const [userData, setUserData] = useState(mockUserData)
    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        // In a real app, you would fetch the user data based on the username
        // For now, we'll just use the mock data
        setUserData(mockUserData)
    }, [])

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing)
        // In a real app, you would make an API call to follow/unfollow the user
    }

    return (
        <div className="mx-auto px-4 sm:px-6 py-6 sm:py-8 container">
            <Card>
                <CardContent className="p-6">
                    <div className="flex sm:flex-row flex-col items-center sm:items-start gap-6">
                        <Avatar className="w-32 h-32">
                            <AvatarImage src={userData.avatar} alt={userData.name} />
                            <AvatarFallback>{userData.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h1 className="mb-2 font-bold text-3xl">{userData.name}</h1>
                            <p className="mb-4 text-muted-foreground">@{userData.username}</p>
                            <p className="mb-4">{userData.bio}</p>
                            <div className="flex gap-4 mb-4">
                                <div>
                                    <span className="font-bold">{userData.followers}</span> followers
                                </div>
                                <div>
                                    <span className="font-bold">{userData.following}</span> following
                                </div>
                            </div>
                            <Button onClick={handleFollowToggle}>{isFollowing ? "Unfollow" : "Follow"}</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="created" className="mt-8">
                <TabsList>
                    <TabsTrigger value="created">Created Memes</TabsTrigger>
                    <TabsTrigger value="collected">Collected NFTs</TabsTrigger>
                </TabsList>
                <TabsContent value="created">
                    <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                        {userData.createdMemes.map((meme) => (
                            <Link href={`/meme/${meme.id}`} key={meme.id}>
                                <Card>
                                    <CardContent className="p-0">
                                        <div className="relative aspect-square">
                                            <Image
                                                src={meme.imageUrl || "/images/placeholder.jpg"}
                                                alt={meme.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-t-lg"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold">{meme.title}</h3>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="collected">
                    <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                        {userData.collectedNFTs.map((nft) => (
                            <Link href={`/meme/${nft.id}`} key={nft.id}>
                                <Card>
                                    <CardContent className="p-0">
                                        <div className="relative aspect-square">
                                            <Image
                                                src={nft.imageUrl || "https://r6j0-my.sharepoint.com/personal/cctalk1114_r6j0_onmicrosoft_com/Documents/OLD%20SCHOOL/Documents/Image/placeholder-img.jpg"}
                                                alt={nft.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-t-lg"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold">{nft.title}</h3>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

