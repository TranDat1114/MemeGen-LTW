import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { User, ImageIcon, ShoppingCart, Heart } from "lucide-react"

export default function Profile() {
    return (
        <div className="mx-auto px-4 py-8 container">
            <div className="flex items-center mb-8">
                <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="User Avatar"
                    width={128}
                    height={128}
                    className="mr-6 rounded-full"
                />
                <div>
                    <h1 className="mb-2 font-bold text-4xl">John Doe</h1>
                    <p className="mb-2 text-gray-600">@johndoe</p>
                    <p className="text-gray-600">Joined: January 2023</p>
                </div>
            </div>

            <Tabs defaultValue="created">
                <TabsList>
                    <TabsTrigger value="created">Created Memes</TabsTrigger>
                    <TabsTrigger value="collected">Collected NFTs</TabsTrigger>
                    <TabsTrigger value="liked">Liked Memes</TabsTrigger>
                </TabsList>
                <TabsContent value="created">
                    <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mt-6">
                        {[1, 2, 3].map((i) => (
                            <Card key={i}>
                                <CardContent className="p-0">
                                    <Image
                                        src={`/placeholder.svg?height=300&width=300`}
                                        alt={`Created Meme ${i}`}
                                        width={300}
                                        height={300}
                                        className="rounded-t-lg w-full h-64 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="mb-2 font-semibold">Created Meme #{i}</h3>
                                        <p className="text-gray-600">Views: {i * 100}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="collected">
                    <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mt-6">
                        {[1, 2, 3].map((i) => (
                            <Card key={i}>
                                <CardContent className="p-0">
                                    <Image
                                        src={`/placeholder.svg?height=300&width=300`}
                                        alt={`Collected NFT ${i}`}
                                        width={300}
                                        height={300}
                                        className="rounded-t-lg w-full h-64 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="mb-2 font-semibold">Collected NFT #{i}</h3>
                                        <p className="text-gray-600">Acquired: {new Date().toLocaleDateString()}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="liked">
                    <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mt-6">
                        {[1, 2, 3].map((i) => (
                            <Card key={i}>
                                <CardContent className="p-0">
                                    <Image
                                        src={`/placeholder.svg?height=300&width=300`}
                                        alt={`Liked Meme ${i}`}
                                        width={300}
                                        height={300}
                                        className="rounded-t-lg w-full h-64 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="mb-2 font-semibold">Liked Meme #{i}</h3>
                                        <p className="text-gray-600">Creator: User{i}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            <div className="mt-12">
                <h2 className="mb-4 font-semibold text-2xl">Stats</h2>
                <div className="gap-6 grid grid-cols-1 md:grid-cols-4">
                    <Card>
                        <CardContent className="flex items-center p-6">
                            <ImageIcon className="mr-4 w-12 h-12 text-blue-500" />
                            <div>
                                <p className="font-semibold text-lg">23</p>
                                <p className="text-gray-600">Memes Created</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center p-6">
                            <ShoppingCart className="mr-4 w-12 h-12 text-green-500" />
                            <div>
                                <p className="font-semibold text-lg">12</p>
                                <p className="text-gray-600">NFTs Collected</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center p-6">
                            <Heart className="mr-4 w-12 h-12 text-red-500" />
                            <div>
                                <p className="font-semibold text-lg">156</p>
                                <p className="text-gray-600">Likes Received</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center p-6">
                            <User className="mr-4 w-12 h-12 text-purple-500" />
                            <div>
                                <p className="font-semibold text-lg">89</p>
                                <p className="text-gray-600">Followers</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

