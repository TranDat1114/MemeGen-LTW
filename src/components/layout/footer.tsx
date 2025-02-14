import Link from "next/link"
import { Twitter, Youtube, Instagram, Facebook } from "lucide-react"
import React from "react" // Import React

const footerSections = {
    tools: {
        title: "Tools",
        items: [
            { name: "Video Editor", href: "#" },
            { name: "Subtitles", href: "#" },
            { name: "Meme Generator", href: "#" },
            { name: "Convert Video", href: "#" },
            { name: "Video Trimmer", href: "#" },
            { name: "Screen Recorder", href: "#" },
        ],
    },
    aiPowered: {
        title: "AI-powered",
        items: [
            { name: "Smart Cut", href: "#" },
            { name: "AI Video Generator", href: "#" },
            { name: "Clean Audio", href: "#" },
            { name: "AI Image Generator", href: "#" },
            { name: "Text to Speech", href: "#" },
            { name: "Document to Video", href: "#" },
        ],
    },
    templates: {
        title: "Templates",
        items: [
            { name: "Video Templates", href: "#" },
            { name: "Meme Templates", href: "#" },
            { name: "Collage Templates", href: "#" },
            { name: "Instagram Video", href: "#" },
            { name: "Popular Templates", href: "#" },
            { name: "EDU Templates", href: "#" },
        ],
    },
    learn: {
        title: "Learn",
        items: [
            { name: "About Us", href: "#" },
            { name: "Resources", href: "#" },
            { name: "Help Center", href: "#" },
            { name: "Blog", href: "#" },
            { name: "EDU", href: "#" },
            { name: "Teams", href: "#" },
            { name: "Contact Us", href: "#" },
        ],
    },
    company: {
        title: "Company",
        items: [
            { name: "Pricing", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Partnerships", href: "#" },
            { name: "Affiliates", href: "#" },
            { name: "Plugins", href: "#" },
            { name: "Release Notes", href: "#" },
            { name: "Refund Policy", href: "#" },
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
        ],
    },
}

const languages = [
    { name: "English", code: "en" },
    { name: "Español", code: "es" },
    { name: "Français", code: "fr" },
    { name: "Português", code: "pt" },
    { name: "日本語", code: "ja" },
    { name: "عربى", code: "ar" },
]

export default function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="mx-auto px-6 py-12 container">
                <div className="mb-8">
                    <Link href="/" className="flex items-center">
                        <span className="font-bold text-2xl">MemeNFT</span>
                    </Link>
                    <div className="flex space-x-4 mt-4">
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Youtube className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Facebook className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <div className="gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {Object.entries(footerSections).map(([key, section]) => (
                        <div key={key}>
                            <h3 className="mb-4 font-semibold">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.items.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t">
                    <div className="flex md:flex-row flex-col justify-between items-center">
                        <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
                            {languages.map((lang, index) => (
                                <React.Fragment key={lang.code}>
                                    <button className="text-muted-foreground hover:text-foreground transition-colors">{lang.name}</button>
                                    {index < languages.length - 1 && <span className="text-muted-foreground">|</span>}
                                </React.Fragment>
                            ))}
                        </div>
                        <p className="text-muted-foreground text-sm">
                            © {new Date().getFullYear()} MemeNFT. Made with love in San Francisco, California.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

