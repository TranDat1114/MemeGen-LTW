
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/provider/theme-provider"
import "./globals.css";
import AppWrapper from "@/components/layout/app-wrapper";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from '@vercel/speed-insights/next';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const poppins = Poppins({
  weight: "400",
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MEME Generator - LTW",
  description: "MEME Generator - LTW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="apple-mobile-web-app-title" content="MemeGen" />
      <body
        className={`${poppins.variable} antialiased`}
      >

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppWrapper>
            {children}
            <Toaster />
          </AppWrapper>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
