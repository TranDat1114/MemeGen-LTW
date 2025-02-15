"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { TrendingUpIcon as Trending, Zap, Award, User, Upload, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const myCreations = [
  {
    id: 1,
    title: "My Meme 1",
    imageUrl: "/images/placeholder.jpg?height=150&width=200",
    upvotes: 100,
    comments: 10,
    views: 500,
  },
  {
    id: 2,
    title: "My Meme 2",
    imageUrl: "/images/placeholder.jpg?height=150&width=200",
    upvotes: 80,
    comments: 8,
    views: 400,
  },
  {
    id: 3,
    title: "My Meme 3",
    imageUrl: "/images/placeholder.jpg?height=150&width=200",
    upvotes: 60,
    comments: 6,
    views: 300,
  },
]

const trendingTemplates = [
  { id: 1, name: "Distracted Boyfriend", uses: 10000, imageUrl: "/images/placeholder.jpg?height=200&width=300" },
  { id: 2, name: "Drake Hotline Bling", uses: 9500, imageUrl: "/images/placeholder.jpg?height=200&width=300" },
  { id: 3, name: "Two Buttons", uses: 9000, imageUrl: "/images/placeholder.jpg?height=200&width=300" },
  { id: 4, name: "Expanding Brain", uses: 8500, imageUrl: "/images/placeholder.jpg?height=200&width=300" },
]

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-primary to-primary-foreground py-12 md:py-24 text-primary-foreground">
        <div className="mx-auto px-4 container">
          <div className="flex md:flex-row flex-col justify-between items-center">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <h1 className="mb-4 font-bold text-4xl md:text-6xl">Welcome to Meme Gen</h1>
              <p className="mb-6 text-xl">Create, collect, and trade the dankest memes as NFTs!</p>
              <div className="flex space-x-4">
                <Button asChild>
                  <Link href="/create">Create a Meme</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/marketplace">Explore Marketplace</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/placeholder.jpg?height=400&width=600"
                alt="Meme Gen Hero"
                width={600}
                height={400}
                className="shadow-lg rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto px-4 container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text-4xl">Welcome to Meme Gen Marketplace</h1>
          <Button onClick={toggleLoginStatus}>{isLoggedIn ? "Logout" : "Login"}</Button>
        </div>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="flex items-center font-semibold text-2xl">
              <Trending className="mr-2" /> Trending Meme Templates
            </h2>
            <Button asChild variant="outline">
              <Link href="/meme-templates">View All Templates</Link>
            </Button>
          </div>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {trendingTemplates.map((template) => (
              <Card key={template.id}>
                <CardContent className="p-4">
                  <Image
                    src={template.imageUrl || "/images/placeholder.jpg"}
                    alt={template.name}
                    width={300}
                    height={200}
                    className="mb-2 rounded-md w-full h-40 object-cover"
                  />
                  <h3 className="mb-1 font-semibold text-lg">{template.name}</h3>
                  <p className="text-muted-foreground text-sm">{template.uses} uses</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {isLoggedIn && (
          <section className="mb-12">
            <h2 className="flex items-center mb-4 font-semibold text-2xl">
              <User className="mr-2" /> My Creations
            </h2>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {myCreations.map((meme) => (
                <Link href={`/meme/${meme.id}`} key={meme.id}>
                  <Card>
                    <CardContent className="p-0">
                      <Image
                        src={meme.imageUrl || "/images/placeholder.jpg"}
                        alt={meme.title}
                        width={200}
                        height={150}
                        className="rounded-t-lg w-full h-36 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="mb-2 font-semibold text-sm">{meme.title}</h3>
                        <p className="text-gray-600 text-xs">
                          {meme.upvotes} upvotes • {meme.comments} comments • {meme.views} views
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="flex items-center mb-4 font-semibold text-2xl">
            <Zap className="mr-2" /> Latest Memes
          </h2>
          <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Link
                href={`/meme/${i}`}
                key={i}
                className="bg-card shadow-md hover:shadow-lg rounded-lg overflow-hidden text-card-foreground transition-shadow"
              >
                <Image
                  src={`/images/placeholder.jpg?height=150&width=200`}
                  alt={`Latest Meme ${i}`}
                  width={200}
                  height={150}
                  className="w-full h-36 object-cover"
                />
                <div className="p-2">
                  <h3 className="font-semibold text-sm">Latest Meme {i}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="flex items-center mb-4 font-semibold text-2xl">
            <Award className="mr-2" /> Top Meme Creators
          </h2>
          <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Link
                href={`/user/creator${i}`}
                key={i}
                className="flex items-center bg-card shadow-md hover:shadow-lg p-4 rounded-lg text-card-foreground transition-shadow"
              >
                <Image
                  src={`/images/placeholder.jpg?height=80&width=80`}
                  alt={`Creator ${i}`}
                  width={80}
                  height={80}
                  className="mr-4 rounded-full w-20 h-20"
                />
                <div>
                  <h3 className="font-semibold">Creator {i}</h3>
                  <p className="text-muted-foreground">Memes created: {i * 10}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-2xl">Features</h2>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <Plus className="mb-4 w-12 h-12 text-primary" />
                <h3 className="mb-2 font-semibold text-xl">Create Memes</h3>
                <p>
                  Use our meme generator to create hilarious memes from trending templates or upload your own images.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Upload className="mb-4 w-12 h-12 text-primary" />
                <h3 className="mb-2 font-semibold text-xl">Upload Templates</h3>
                <p>Share your meme templates with the community and see them become the next viral sensation.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Award className="mb-4 w-12 h-12 text-primary" />
                <h3 className="mb-2 font-semibold text-xl">NFT Marketplace</h3>
                <p>
                  Turn your memes into NFTs, buy and sell unique meme creations in our blockchain-powered marketplace.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

