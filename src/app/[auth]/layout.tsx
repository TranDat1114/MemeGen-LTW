export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <div className="flex justify-center items-center py-4 h-auto min-h-[600px]">
            <div className="w-full max-w-md">{children}</div>
        </div>
    )
}