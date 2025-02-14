import Link from "next/link"
import Image from "next/image"
import { Filter, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"

export default function Marketplace() {
    return (
        <div className="space-y-6">
            <h1 className="font-bold text-4xl">Meme NFT Marketplace</h1>

            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex sm:flex-row flex-col items-start sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 w-full sm:w-auto">
                    <Button className="w-full sm:w-auto">
                        <Filter className="mr-2" /> Filter
                    </Button>
                    <Select>
                        <option>All Categories</option>
                        <option>Funny</option>
                        <option>Crypto</option>
                        <option>Politics</option>
                    </Select>
                </div>
                <Select >
                    <option>Sort by: Latest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Most Popular</option>
                </Select>
            </div>

            <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Link
                        href={`/meme/${i}`}
                        key={i}
                        className="bg-card shadow-md hover:shadow-lg rounded-lg overflow-hidden text-card-foreground transition-shadow"
                    >
                        <Image
                            src={`/images/placeholder.jpg?height=300&width=300`}
                            alt={`Meme NFT ${i}`}
                            width={300}
                            height={300}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="mb-2 font-semibold">Meme NFT #{i}</h3>
                            <p className="mb-2 text-muted-foreground">Created by: User{i}</p>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center font-bold text-lg">
                                    <DollarSign className="mr-1" /> {(i * 0.1).toFixed(2)} ETH
                                </span>
                                <Button size="sm">Buy Now</Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

