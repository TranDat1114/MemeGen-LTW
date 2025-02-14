import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center px-4 min-h-[60vh] text-center">
            <h1 className="mb-4 font-bold text-4xl">404 - Page Not Found</h1>
            <p className="mb-8 max-w-md text-muted-foreground">
                Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>
            <Button asChild>
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    )
}

