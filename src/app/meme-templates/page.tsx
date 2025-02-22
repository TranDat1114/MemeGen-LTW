"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

// Mock data for meme templates
const memeTemplates = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Meme Template ${i + 1}`,
    imageUrl: `/images/placeholder.jpg?height=300&width=300&text=Template+${i + 1}`,
}))

export default function MemeTemplatesPage() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredTemplates = memeTemplates.filter((template) =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="mx-auto px-4 py-8 container">
            <h1 className="mb-8 font-bold text-4xl">Meme Templates</h1>

            <div className="relative mb-8">
                <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
                <Input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

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
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

