import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="space-y-8">
            <Skeleton className="w-[300px] h-12" />

            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i}>
                        <CardContent className="p-0">
                            <Skeleton className="rounded-t-lg w-full h-36" />
                            <div className="space-y-2 p-4">
                                <Skeleton className="w-3/4 h-4" />
                                <Skeleton className="w-1/2 h-3" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="space-y-4">
                <Skeleton className="w-[200px] h-8" />
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardContent className="p-0">
                                <Skeleton className="rounded-t-lg w-full h-48" />
                                <div className="space-y-2 p-4">
                                    <Skeleton className="w-3/4 h-4" />
                                    <Skeleton className="w-1/2 h-3" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

