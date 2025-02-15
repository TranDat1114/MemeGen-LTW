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
import { fetchLogin } from "@/lib/axios/fetch/auth"
import Link from "next/link"
import { useRouter } from "next/navigation";

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

    const onSubmit = async (data: UserLoginDTO) => {
        try {
            const userLoginRes = await fetchLogin(data);
            if (userLoginRes) {
                setAccessToken(userLoginRes.accessToken);
                toast.success("Feeling lucky? 🍀")
                setUser(userLoginRes.user);
                router.push('/');

            } else {
                toast.error("Invalid email or password");
            }
        }
        catch (error) {
            toast.error('There was an error processing your request');
            setOrderErrorMessages((error as Error).message);
        }
    };
    return (
        <>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome to Meme Generator</CardTitle>
                    <CardDescription>Please sign in or sign up below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Button className="w-full cursor-pointer" variant="secondary">
                            <img
                                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                                alt="Google icon"
                                width={16}
                                height={16}
                            />
                            Sign in with Google
                        </Button>
                        <Button className="w-full cursor-pointer" variant="secondary">
                            <img
                                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                                alt="Github icon"
                                width={16}
                                height={16}
                            />
                            Sign in with Github
                        </Button>
                    </div>
                    <Separator className="my-6" />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="johndoe@email.com" {...field} />
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
                                                <Label className="cursor-pointer text-muted-foreground">Forgot password?</Label>
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="********" {...field} type="password" />
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
                                <Button type="submit" className="w-full cursor-pointer">Submit</Button>
                                <div className="flex justify-center items-center">
                                    <Label>
                                        Don't have an account?&nbsp;
                                        <Link href="/register" className="text-primary">
                                            Sign up
                                        </Link>
                                    </Label>
                                </div>

                            </div>
                        </form>
                    </Form>

                </CardContent>
            </Card>
        </>
    )
}
