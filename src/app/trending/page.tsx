import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

const popularMemes = [
    { id: 1, title: "Trending Meme 1", imageUrl: "//images/placeholder.jpg?height=200&width=300", upvotes: 1000, comments: 50 },
    { id: 2, title: "Trending Meme 2", imageUrl: "//images/placeholder.jpg?height=200&width=300", upvotes: 950, comments: 45 },
    { id: 3, title: "Trending Meme 3", imageUrl: "//images/placeholder.jpg?height=200&width=300", upvotes: 900, comments: 40 },
    { id: 4, title: "Trending Meme 4", imageUrl: "//images/placeholder.jpg?height=200&width=300", upvotes: 850, comments: 35 },
]

export default function PopularMemesPage() {
    return (
        <div className="mx-auto px-4 py-8 container">
            <h1 className="mb-8 font-bold text-4xl">Popular Memes</h1>

            <Tabs defaultValue="trending">
                <TabsList className="mb-8">
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="week">This Week</TabsTrigger>
                    <TabsTrigger value="month">This Month</TabsTrigger>
                    <TabsTrigger value="alltime">All Time</TabsTrigger>
                </TabsList>

                <TabsContent value="trending">
                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {popularMemes.map((meme) => (
                            <Link href={`/meme/${meme.id}`} key={meme.id}>
                                <Card>
                                    <CardContent className="p-0">
                                        <Image
                                            src={meme.imageUrl || "//images/placeholder.jpg"}
                                            alt={meme.title}
                                            width={300}
                                            height={200}
                                            className="rounded-t-lg w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="mb-2 font-semibold">{meme.title}</h3>
                                            <p className="text-gray-600 text-sm">
                                                {meme.upvotes} upvotes • {meme.comments} comments
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="week">
                    <p>Content for this week's popular memes</p>
                </TabsContent>

                <TabsContent value="month">
                    <p>Content for this month's popular memes</p>
                </TabsContent>

                <TabsContent value="alltime">
                    <p>Content for all-time popular memes</p>
                </TabsContent>
            </Tabs>
        </div>
    )
}

