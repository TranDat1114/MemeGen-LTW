"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import useAuthStore from "@/stores/auth-store"
import { motion } from "framer-motion"
import { TrendingUp, EclipseIcon as Ethereum, Wallet, Shield, Gem, TrendingUpIcon as Trending, Zap, Award, User, Upload, Plus } from "lucide-react"
import { useEffect, useState } from "react"

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
  { id: 1, name: "Distracted Boyfriend", uses: 10000, imageUrl: "/images/placeholder.jpg?height=200&width=300", price: "0.02 ETH" },
  { id: 2, name: "Drake Hotline Bling", uses: 9500, imageUrl: "/images/placeholder.jpg?height=200&width=300", price: "0.02 ETH" },
  { id: 3, name: "Two Buttons", uses: 9000, imageUrl: "/images/placeholder.jpg?height=200&width=300", price: "0.02 ETH" },
  { id: 4, name: "Expanding Brain", uses: 8500, imageUrl: "/images/placeholder.jpg?height=200&width=300", price: "0.02 ETH" },
]

export default function Home() {
  const { accessToken } = useAuthStore();
  const [matrixText, setMatrixText] = useState("")

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$€¥₿"
    const interval = setInterval(() => {
      const randomText = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
      setMatrixText(randomText)
    }, 100)

    return () => clearInterval(interval)
  }, [])
  return (
    <div className="space-y-8">
      {/* <section className="bg-gradient-to-tl from-primary to-foreground py-12 md:py-24 text-background">
        <div className="mx-auto container">
          <div className="flex md:flex-row flex-col justify-between items-center px-2">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <h1 className="mb-4 font-bold text-4xl md:text-6xl max-md:text-center">Welcome to Meme Gen</h1>
              <p className="mb-6 font-semibold text-xl max-md:text-center">Make, collect, and trade the dankest memes as NFTs!</p>
              <div className="flex md:flex-row flex-col gap-4">
                <Button asChild>
                  <Link href="/make-meme">{`Make your 'Memes' come true`}</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/marketplace">Explore Marketplace</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/tomemeornottomeme.jpg"
                alt="Meme Gen Hero"
                width={600}
                height={400}
                className="shadow-lg rounded-lg"
              />
            </div>
          </div>
        </div>
      </section> */}

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:40px_40px] [mask-image:radial-gradient(white,transparent_85%)]" />

        <div className="relative mx-auto px-4 container">
          <div className="flex md:flex-row flex-col justify-between items-center gap-12">
            <div className="space-y-6 md:w-1/2">
              <div className="inline-block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-primary/10 backdrop-blur-sm px-4 py-2 border border-primary/20 rounded-full text-primary"
                >
                  {matrixText} | The Future of Meme NFTs
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-clip-text bg-gradient-to-r from-primary to-purple-500 py-4 font-bold text-transparent text-4xl md:text-6xl"
              >
                Create, Mint & Trade Crypto Memes
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-muted-foreground text-xl"
              >
                Join the decentralized meme revolution. Create, collect, and trade the dankest memes as NFTs on the
                blockchain.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90" asChild>
                  <Link href="/make-meme">
                    <Plus className="mr-2 w-5 h-5" />
                    Make your MEME come true
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-primary/10 border-primary/20" asChild>
                  <Link href="/marketplace">
                    <Ethereum className="mr-2 w-5 h-5" />
                    Browse Marketplace
                  </Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 opacity-50 rounded-lg blur" />
                <Image
                  src="/images/tomemeornottomeme.jpg"
                  alt="MemeNFT Hero"
                  width={600}
                  height={400}
                  className="relative shadow-2xl rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mx-auto container">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="flex items-center font-semibold max-md:text-sm text-2xl">
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

        {!!accessToken && (
          <section className="mb-12">
            <h2 className="flex items-center mb-4 font-semibold max-md:text-sm text-2xl">
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
          <h2 className="flex items-center mb-4 font-semibold max-md:text-sm text-2xl">
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
          <h2 className="flex items-center mb-4 font-semibold max-md:text-sm text-2xl">
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
          <div className="flex justify-between items-center mb-8">
            <h2 className="flex items-center font-semibold text-2xl">
              <TrendingUp className="mr-2 text-primary" /> Trending NFT Memes
            </h2>
            <Button variant="outline" className="hover:bg-primary/10 border-primary/20" asChild>
              <Link href="/marketplace">View All</Link>
            </Button>
          </div>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {trendingTemplates.map((template) => (
              <Card
                key={template.id}
                className="group bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 overflow-hidden transition-all"
              >
                <CardContent className="p-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Image
                      src={template.imageUrl || "/placeholder.svg"}
                      alt={template.name}
                      width={300}
                      height={200}
                      className="rounded-md w-full h-40 object-cover"
                    />
                    <div className="right-2 bottom-2 left-2 absolute opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="flex items-center text-white text-sm">
                        <Ethereum className="mr-1 w-4 h-4" />
                        {template.price}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="mb-1 font-semibold text-lg">{template.name}</h3>
                    <p className="text-muted-foreground text-sm">{template.uses} mints</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-8 font-semibold text-2xl">Features</h2>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex justify-center items-center bg-primary/10 mb-4 rounded-lg w-12 h-12">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-xl">Secure Minting</h3>
                <p className="text-muted-foreground">
                  Your memes are securely minted as NFTs on the blockchain with proof of ownership and authenticity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex justify-center items-center bg-primary/10 mb-4 rounded-lg w-12 h-12">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-xl">Easy Trading</h3>
                <p className="text-muted-foreground">
                  Buy and sell meme NFTs with cryptocurrency. Support for multiple wallets and chains.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex justify-center items-center bg-primary/10 mb-4 rounded-lg w-12 h-12">
                  <Gem className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-xl">Rare Collections</h3>
                <p className="text-muted-foreground">
                  Create and collect rare meme NFTs. Build your digital portfolio of dank assets.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-center items-center bg-primary/10 mb-4 rounded-lg w-12 h-12">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-xl">Create Memes</h3>
                <p>
                  Use our meme generator to create hilarious memes from trending templates or upload your own images.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-center items-center bg-primary/10 mb-4 rounded-lg w-12 h-12">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-xl">Upload Templates</h3>
                <p>Share your meme templates with the community and see them become the next viral sensation.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-center items-center bg-primary/10 mb-4 rounded-lg w-12 h-12">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-xl">NFT Marketplace</h3>
                <p>
                  Turn your memes into NFTs, buy and sell unique meme creations in our blockchain-powered marketplace.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="relative mb-12 border border-primary/20 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10" />
          <div className="relative p-8 md:p-12">
            <h2 className="mb-4 font-bold text-3xl">Ready to Join the Meme Economy?</h2>
            <p className="mb-6 text-muted-foreground text-xl">
              Start creating, collecting, and trading meme NFTs today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90">
                Connect Wallet
              </Button>
              <Button size="lg" variant="outline" className="hover:bg-primary/10 border-primary/20">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}

