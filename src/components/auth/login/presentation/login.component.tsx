"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import useAuthStore from "@/stores/auth-store"
import { UserLoginDTO } from "@/backend/types/userDTO"
import { fetchGoogleLogin, fetchLogin } from "@/lib/axios/fetch/auth"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { AxiosError } from "axios"
import { BaseResponse } from "@/backend/types/baseResponse"
import confetti from "canvas-confetti"


const formSchema = z.object({
    email: z
        .string()
        .email({ message: "Please enter a valid email address" })
        .min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
})

export default function LoginComponent() {
    const { setAccessToken, setUser } = useAuthStore();
    const router = useRouter();

    const form = useForm<UserLoginDTO>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const [orderErrorMessages, setOrderErrorMessages] = useState<string>();

    const secretMessage = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    const [secretIndex, setSecretMessage] = useState(0);
    const [foundSecret, setFoundSecret] = useState(false);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === secretMessage[secretIndex]) {
                setSecretMessage((prev) => prev + 1);
                if (secretIndex + 1 === secretMessage.length) {
                    handleClick();
                    setSecretMessage(0);
                }
            } else {
                setSecretMessage(0);
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [secretIndex]);

    const handleClick = () => {
        const end = Date.now() + 3 * 1000; // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

        const frame = () => {
            if (Date.now() > end) return;

            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors: colors,
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors: colors,
            });

            requestAnimationFrame(frame);
        };

        frame();
        setFoundSecret(true);
    };

    const onSubmit = async (data: UserLoginDTO) => {
        await fetchLogin(data).then((res) => {
            if (res.status === 200) {
                setAccessToken(res.data.result.accessToken);
                setUser(res.data.result.user);
                toast.success("Feeling lucky? 🍀")
                router.push('/')
            }
        }).catch((error: AxiosError<BaseResponse<null>>) => {
            if (error.response?.status === 400) {
                setOrderErrorMessages("Invalid email or password");
            } else {
                setOrderErrorMessages("An error occurred. Please try again later.");
            }
        });
    };
    const googleLogin = async () => {
        await fetchGoogleLogin().then((res) => {
            setAccessToken(res.accessToken);
            setUser(res.user);
            toast.success("Feeling lucky? 🍀")
            router.push('/')
        }).catch((error: AxiosError<BaseResponse<null>>) => {
            if (error.response?.status === 400) {
                setOrderErrorMessages("Invalid email or password");
            } else {
                setOrderErrorMessages("An error occurred. Please try again later.");
            }
        });
    }

    return (
        <div className="space-y-12">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome to Meme Generator</CardTitle>
                    <CardDescription>Please sign in or sign up below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="johndoe@email.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between items-center">
                                            <FormLabel>Password</FormLabel>
                                            <Link href="/forgot-password">
                                                <Label className="text-muted-foreground cursor-pointer">Forgot password?</Label>
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="Input your password" {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                        <>
                                            {
                                                orderErrorMessages &&
                                                <p className="text-red-500 text-sm">
                                                    {orderErrorMessages}
                                                </p>
                                            }
                                        </>
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-4 w-full">
                                <Button type="submit" className="w-full">Continue</Button>
                            </div>
                        </form>
                    </Form>

                    <div className="my-6 px-8">
                        <Separator className="flex-1" />
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Button
                                className="w-full cursor-pointer"
                                onClick={googleLogin}
                                variant="outline">
                                <Image
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                                    alt="Google icon"
                                    width={16}
                                    height={16}
                                />
                                Sign in with Google
                            </Button>
                            <Button
                                onClick={() => toast.error("This feature is in development.\n Please check back later.")}
                                className="w-full cursor-pointer"
                                variant="outline">
                                <Image
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                                    alt="Github icon"
                                    width={16}
                                    height={16}
                                />
                                Sign in with Github
                            </Button>
                        </div>
                        <div className="flex justify-center items-center">
                            <Label>
                                {`Don't have an account?`}
                                &nbsp;
                                <Link
                                    href="/register"
                                    className="text-primary">
                                    Sign up
                                </Link>
                            </Label>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {foundSecret ? (
                <p className="text-center text-xs text-green-500">
                    You know what it does, right? 😉
                </p>
            ) : (
                <p className="text-muted-foreground text-xs text-center">
                    Do you know? The game Contra by Konami is one of the childhood games of the developers in this project.
                </p>
            )}
        </div>
    );
}
