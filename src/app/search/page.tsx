"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for meme templates and memes
const memeTemplates = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Meme Template ${i + 1}`,
    imageUrl: `/images/placeholder.jpg?height=300&width=300&text=Template+${i + 1}`,
    creator: `User${Math.floor(Math.random() * 100) + 1}`,
}))

const memes = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Meme ${i + 1}`,
    imageUrl: `/images/placeholder.jpg?height=300&width=300&text=Meme+${i + 1}`,
    creator: `User${Math.floor(Math.random() * 100) + 1}`,
}))

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get("q") || ""
    const [activeTab, setActiveTab] = useState("all")

    const filteredTemplates = memeTemplates.filter((template) =>
        template.name.toLowerCase().includes(query.toLowerCase()),
    )

    const filteredMemes = memes.filter((meme) => meme.title.toLowerCase().includes(query.toLowerCase()))

    useEffect(() => {
        // Reset active tab when query changes
        setActiveTab("all")
    }, [query])

    return (
        <div className="mx-auto px-4 py-8 container">
            <h1 className="mb-8 font-bold text-4xl">Search Results for "{query}"</h1>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="memes">Memes</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {filteredTemplates.map((template) => (
                            <Link href={`/make-meme?template=${template.id}`} key={`template-${template.id}`}>
                                <Card className="hover:shadow-lg overflow-hidden transition-shadow">
                                    <CardContent className="p-0">
                                        <div className="relative aspect-square">
                                            <Image
                                                src={template.imageUrl || "/images/placeholder.jpg"}
                                                alt={template.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="hover:scale-105 transition-transform"
                                            />
                                        </div>
                                        <div className="p-2">
                                            <h3 className="font-medium text-sm text-center truncate">{template.name}</h3>
                                            <p className="text-muted-foreground text-xs text-center">{template.creator}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                        {filteredMemes.map((meme) => (
                            <Link href={`/meme/${meme.id}`} key={`meme-${meme.id}`}>
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
                                        <div className="p-2">
                                            <h3 className="font-medium text-sm text-center truncate">{meme.title}</h3>
                                            <p className="text-muted-foreground text-xs text-center">{meme.creator}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="templates">
                    <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {filteredTemplates.map((template) => (
                            <Link href={`/make-meme?template=${template.id}`} key={template.id}>
                                <Card className="hover:shadow-lg overflow-hidden transition-shadow">
                                    <CardContent className="p-0">
                                        <div className="relative aspect-square">
                                            <Image
                                                src={template.imageUrl || "/images/placeholder.jpg"}
                                                alt={template.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="hover:scale-105 transition-transform"
                                            />
                                        </div>
                                        <div className="p-2">
                                            <h3 className="font-medium text-sm text-center truncate">{template.name}</h3>
                                            <p className="text-muted-foreground text-xs text-center">{template.creator}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="memes">
                    <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {filteredMemes.map((meme) => (
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
                                        <div className="p-2">
                                            <h3 className="font-medium text-sm text-center truncate">{meme.title}</h3>
                                            <p className="text-muted-foreground text-xs text-center">{meme.creator}</p>
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

