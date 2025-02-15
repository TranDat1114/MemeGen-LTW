"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import useAuthStore from "@/stores/auth-store"
import { UserLoginDTO } from "@/backend/types/userDTO"
import { fetchGoogleLogin, fetchLogin } from "@/lib/axios/fetch/auth"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { AxiosError } from "axios"
import { BaseResponse } from "@/backend/types/baseResponse"
import { SignUpWithGoogle } from "@/lib/firebase"

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
        }
        catch (error) {
            toast.error('There was an error processing your request');
            setOrderErrorMessages((error as Error).message);
        }
    };
    const googleLogin = async () => {
        // const userService = new UserService();
        const googleLogin = await fetchGoogleLogin()
        console.log(googleLogin);
        // const checkEmailExist = userService.getUserByEmail(email);
        // console.log(checkEmailExist);
    }

    return (
        <>
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
                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                                    alt="Google icon"
                                    width={16}
                                    height={16}
                                />
                                Sign in with Google
                            </Button>
                            <Button
                                className="w-full cursor-pointer"
                                variant="outline">
                                <img
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
                                Don't have an account?&nbsp;
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
        </>
    );
}
