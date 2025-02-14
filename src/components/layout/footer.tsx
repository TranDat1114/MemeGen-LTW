import Link from "next/link"
import { Twitter, Youtube, Instagram, Facebook } from "lucide-react"
import React from "react" // Import React
import Image from "next/image"
import { useTheme } from "next-themes"
import { LineShadowText } from "../magicui/line-shadow-text"

const footerSections = {
    tools: {
        title: "Tools",
        items: [
            // { name: "Video Editor", href: "#" },
            // { name: "Subtitles", href: "#" },
            { name: "Meme Generator", href: "#" },
            // { name: "Convert Video", href: "#" },
            // { name: "Video Trimmer", href: "#" },
            // { name: "Screen Recorder", href: "#" },
        ],
    },
    // aiPowered: {
    //     title: "AI-powered",
    //     items: [
    //         { name: "Smart Cut", href: "#" },
    //         { name: "AI Video Generator", href: "#" },
    //         { name: "Clean Audio", href: "#" },
    //         { name: "AI Image Generator", href: "#" },
    //         { name: "Text to Speech", href: "#" },
    //         { name: "Document to Video", href: "#" },
    //     ],
    // },
    templates: {
        title: "Templates",
        items: [
            { name: "Video Templates", href: "#" },
            { name: "Meme Templates", href: "#" },
            // { name: "Collage Templates", href: "#" },
            // { name: "Instagram Video", href: "#" },
            // { name: "Popular Templates", href: "#" },
            // { name: "EDU Templates", href: "#" },
        ],
    },
    learn: {
        title: "Learn",
        items: [
            { name: "About Us", href: "#" },
            // { name: "Resources", href: "#" },
            { name: "Help Center", href: "#" },
            // { name: "Blog", href: "#" },
            // { name: "EDU", href: "#" },
            { name: "Teams", href: "#" },
            { name: "Contact Us", href: "#" },
        ],
    },
    company: {
        title: "Company",
        items: [
            // { name: "Pricing", href: "#" },
            // { name: "Careers", href: "#" },
            // { name: "Partnerships", href: "#" },
            // { name: "Affiliates", href: "#" },
            // { name: "Plugins", href: "#" },
            { name: "Release Notes", href: "#" },
            // { name: "Refund Policy", href: "#" },
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
        ],
    },
}

const languages = [
    { name: "English", code: "en" },
    { name: "Vietnamese", code: "vi" },
    // { name: "Español", code: "es" },
    // { name: "Français", code: "fr" },
    // { name: "Português", code: "pt" },
    // { name: "日本語", code: "ja" },
    // { name: "عربى", code: "ar" },
]

export default function Footer() {
    const theme = useTheme();
    const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";

    return (
        <footer className="bg-white">
            <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/images/placeholder.jpg"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="rounded-full object-center"
                        />
                        <h1 className="text-balance text-4xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-5xl lg:text-6xl">
                            Meme
                            <LineShadowText className="italic" shadowColor={shadowColor}>
                                Generator
                            </LineShadowText>
                        </h1>
                    </div>

                    <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">

                        <li>
                            <a
                                href="#"
                                rel="noreferrer"
                                target="_blank"
                                className="text-gray-700 transition hover:opacity-75"
                            >
                                <span className="sr-only">GitHub</span>

                                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>

                <div
                    className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16"
                >
                    {/* <div>
                        <p className="font-medium text-gray-900">Services</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> 1on1 Coaching </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Company Review </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Accounts Review </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> HR Consulting </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> SEO Optimisation </a>
                            </li>
                        </ul>
                    </div> */}

                    <div>
                        <p className="font-medium text-gray-900">Company</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> About </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Meet the Team </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Accounts Review </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-medium text-gray-900">Helpful Links</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Contact </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> FAQs </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Live Chat </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-medium text-gray-900">Legal</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Accessibility </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Returns Policy </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Refund Policy </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-700 transition hover:opacity-75"> Hiring-3 Statistics </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="text-xs text-gray-500">&copy; 2022. Company Name. All rights reserved.</p>
            </div>
        </footer>

        // <footer className="bg-background border-t">
        //     <div className="mx-auto px-6 py-12 container">
        //         <div className="mb-8">
        //             <Link href="/" className="flex items-center">
        //                 <span className="font-bold text-2xl">MemeNFT</span>
        //             </Link>
        //             <div className="flex space-x-4 mt-4">
        //                 <Link href="#" className="text-muted-foreground hover:text-foreground">
        //                     <Twitter className="w-5 h-5" />
        //                 </Link>
        //                 <Link href="#" className="text-muted-foreground hover:text-foreground">
        //                     <Youtube className="w-5 h-5" />
        //                 </Link>
        //                 <Link href="#" className="text-muted-foreground hover:text-foreground">
        //                     <Instagram className="w-5 h-5" />
        //                 </Link>
        //                 <Link href="#" className="text-muted-foreground hover:text-foreground">
        //                     <Facebook className="w-5 h-5" />
        //                 </Link>
        //             </div>
        //         </div>

        //         <div className="gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        //             {Object.entries(footerSections).map(([key, section]) => (
        //                 <div key={key}>
        //                     <h3 className="mb-4 font-semibold">{section.title}</h3>
        //                     <ul className="space-y-2">
        //                         {section.items.map((item) => (
        //                             <li key={item.name}>
        //                                 <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
        //                                     {item.name}
        //                                 </Link>
        //                             </li>
        //                         ))}
        //                     </ul>
        //                 </div>
        //             ))}
        //         </div>

        //         <div className="mt-12 pt-8 border-t">
        //             <div className="flex md:flex-row flex-col justify-between items-center">
        //                 <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
        //                     {languages.map((lang, index) => (
        //                         <React.Fragment key={lang.code}>
        //                             <button className="text-muted-foreground hover:text-foreground transition-colors">{lang.name}</button>
        //                             {index < languages.length - 1 && <span className="text-muted-foreground">|</span>}
        //                         </React.Fragment>
        //                     ))}
        //                 </div>
        //                 <p className="text-muted-foreground text-sm">
        //                     © {new Date().getFullYear()} MemeNFT. Made with love in Ho Chi Minh city, Viet Nam.
        //                 </p>
        //             </div>
        //         </div>
        //     </div>
        // </footer>
    )
}

