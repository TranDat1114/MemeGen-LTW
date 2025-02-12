"use client"
import AuthButton from "@/components/auth/AuthButton";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl">Home</h1>
      <ModeToggle />
      <SessionProvider >
        <AuthButton />
      </SessionProvider>
    </div>
  );
}
