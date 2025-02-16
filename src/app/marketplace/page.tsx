"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { DollarSign, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface Meme {
    id: number
    title: string
    creator: string
    price: number
    category: string
    imageUrl: string
    likes: number
    views: number
}

const categories = ["Funny", "Crypto", "Politics", "Animals", "Sports", "Programming", "Gaming"]
const priceRanges = [
    { label: "Under 0.1 ETH", min: 0, max: 0.1 },
    { label: "0.1 - 0.5 ETH", min: 0.1, max: 0.5 },
    { label: "0.5 - 1 ETH", min: 0.5, max: 1 },
    { label: "Over 1 ETH", min: 1, max: Number.POSITIVE_INFINITY },
]

export default function Marketplace() {
    const [memes] = useState<Meme[]>(
        Array.from({ length: 12 }, (_, i) => ({
            id: i + 1,
            title: `Meme NFT #${i + 1}`,
            creator: `User${i + 1}`,
            price: Number.parseFloat((Math.random() * 2).toFixed(2)),
            category: categories[Math.floor(Math.random() * categories.length)],
            imageUrl: `/images/placeholder.jpg?height=300&width=300&text=Meme+${i + 1}`,
            likes: Math.floor(Math.random() * 1000),
            views: Math.floor(Math.random() * 5000),
        })),
    )

    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([])
    const [sortBy, setSortBy] = useState("latest")
    const [searchTerm, setSearchTerm] = useState("")
    const [showFilters, setShowFilters] = useState(false)

    const filteredMemes = memes.filter((meme) => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(meme.category)
        const priceMatch =
            selectedPriceRanges.length === 0 ||
            selectedPriceRanges.some((index) => {
                const range = priceRanges[index]
                return meme.price >= range.min && meme.price <= range.max
            })
        const searchMatch =
            meme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            meme.creator.toLowerCase().includes(searchTerm.toLowerCase())
        return categoryMatch && priceMatch && searchMatch
    })

    const sortedMemes = [...filteredMemes].sort((a, b) => {
        switch (sortBy) {
            case "priceAsc":
                return a.price - b.price
            case "priceDesc":
                return b.price - a.price
            case "popular":
                return b.likes - a.likes
            case "trending":
                return b.views - a.views
            default:
                return b.id - a.id // Latest by default
        }
    })

    return (
        <div className="space-y-6" suppressHydrationWarning>
            <div className="flex sm:flex-row flex-col justify-between items-center gap-4">
                <h1 className="font-bold text-2xl md:text-4xl">NFT Marketplace</h1>
                <div className="flex md:flex-row flex-col md:items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-80">
                        <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
                        <Input
                            placeholder="Search memes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <div className="flex max-sm:justify-between items-center gap-2">

                        <Sheet open={showFilters} onOpenChange={setShowFilters}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="aspect-square">
                                    <SlidersHorizontal className="w-4 h-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Filters</SheetTitle>
                                    <SheetDescription>Refine your search with these filters</SheetDescription>
                                </SheetHeader>
                                <div className="space-y-6 py-6">
                                    <div className="space-y-4">
                                        <Label>Categories</Label>
                                        <div className="gap-2 grid grid-cols-2">
                                            {categories.map((category, index) => (
                                                <div key={category} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`category-${index}`}
                                                        checked={selectedCategories.includes(category)}
                                                        onCheckedChange={(checked: boolean) => {
                                                            setSelectedCategories(
                                                                checked
                                                                    ? [...selectedCategories, category]
                                                                    : selectedCategories.filter((c) => c !== category),
                                                            )
                                                        }}
                                                    />
                                                    <Label htmlFor={`category-${index}`}>{category}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <Label>Price Range</Label>
                                        <div className="space-y-2">
                                            {priceRanges.map((range, index) => (
                                                <div key={range.label} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`price-${index}`}
                                                        checked={selectedPriceRanges.includes(index)}
                                                        onCheckedChange={(checked: boolean) => {
                                                            setSelectedPriceRanges(
                                                                checked
                                                                    ? [...selectedPriceRanges, index]
                                                                    : selectedPriceRanges.filter((i) => i !== index),
                                                            )
                                                        }}
                                                    />
                                                    <Label htmlFor={`price-${index}`}>{range.label}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <SheetFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedCategories([])
                                            setSelectedPriceRanges([])
                                        }}
                                    >
                                        Reset Filters
                                    </Button>
                                    <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="latest">Latest</SelectItem>
                                <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                                <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                                <SelectItem value="popular">Most Popular</SelectItem>
                                <SelectItem value="trending">Trending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedMemes.map((meme) => (
                    <Card key={meme.id} className="overflow-hidden">
                        <Link href={`/meme/${meme.id}`}>
                            <CardContent className="p-0">
                                <Image
                                    src={meme.imageUrl || "/images/placeholder.jpg"}
                                    alt={meme.title}
                                    width={300}
                                    height={300}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold">{meme.title}</h3>
                                        <span className="text-muted-foreground text-sm">{meme.category}</span>
                                    </div>
                                    <p className="mb-2 text-muted-foreground">Created by: {meme.creator}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center font-bold text-lg">
                                            <DollarSign className="mr-1 w-4 h-4" /> {meme.price.toFixed(2)} ETH
                                        </span>
                                        <Button size="sm">Buy Now</Button>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
                                        <span>{meme.likes} likes</span>
                                        <span>{meme.views} views</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    )
}

