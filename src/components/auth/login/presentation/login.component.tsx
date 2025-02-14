"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import toast from 'react-hot-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
    email: z
        .string()
        .email({ message: "Please enter a valid email address" })
        .min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
})

export default function LoginComponent() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)
        toast.success("Đăng nhập thành công! 🎉");
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
                                            <Label className="cursor-pointer text-muted-foreground">Forgot password?</Label>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="********" {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="w-full space-y-4">
                                <Button type="submit" className="cursor-pointer w-full">Submit</Button>
                                <Separator />
                                <Button type="button" className="cursor-pointer w-full" variant="secondary">
                                    <img
                                        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                                        alt="Google icon"
                                        width={16}
                                        height={16}
                                    />
                                    Sign in with Google
                                </Button>
                            </div>
                        </form>
                    </Form>

                </CardContent>
            </Card>
        </>
    )
}
