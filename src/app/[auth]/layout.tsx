export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md">{children}</div>
        </div>
    )
}