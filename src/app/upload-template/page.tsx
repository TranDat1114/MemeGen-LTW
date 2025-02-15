"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

export default function UploadTemplatePage() {
    const [templateName, setTemplateName] = useState("")
    const [templateImage, setTemplateImage] = useState<string | null>(null)
    const router = useRouter()

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target?.result
                if (typeof result === "string") {
                    setTemplateImage(result)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the template data to your backend
        console.log("Submitting template:", { name: templateName, image: templateImage })
        // For now, we'll just redirect to the templates page
        router.push("/meme-templates")
    }

    return (
        <div className="mx-auto px-4 py-8 container">
            <h1 className="mb-8 font-bold text-4xl">Upload New Meme Template</h1>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="templateName">Template Name</Label>
                            <Input
                                id="templateName"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                placeholder="Enter template name"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="templateImage">Template Image</Label>
                            <div className="mt-2">
                                <Input
                                    id="templateImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    required
                                    className="hidden"
                                />
                                <Label
                                    htmlFor="templateImage"
                                    className="flex justify-center items-center bg-white px-4 border-2 border-gray-300 hover:border-gray-400 border-dashed rounded-md focus:outline-none w-full h-32 transition appearance-none cursor-pointer"
                                >
                                    {templateImage ? (
                                        <Image
                                            src={templateImage || "/images/placeholder.jpg"}
                                            alt="Template preview"
                                            width={200}
                                            height={200}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <span className="flex items-center space-x-2">
                                            <Upload className="w-6 h-6 text-gray-600" />
                                            <span className="font-medium text-gray-600">Click to upload an image</span>
                                        </span>
                                    )}
                                </Label>
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            Upload Template
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

