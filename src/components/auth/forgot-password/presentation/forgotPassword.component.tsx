'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { InputOtpComponent } from './otp.component'
import ResetPasswordComponent from '../../reset-password/presentation/resetPassword.component'

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }).min(1, { message: "Email is required" }),
})

export default function ForgotPasswordComponent() {
    const [otpSent, setOtpSent] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [email, setEmail] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    })

    const emailValue = form.watch("email");

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);
        setEmail(data.email);
        setOtpSent(true);
        toast.success("OTP sent to your email address");
    }

    function handleVerifyOtp(otp: string) {
        if (otp === "123456") {
            toast.success("OTP verified!");
            setResetPassword(true);
        } else {
            toast.error("Invalid OTP!");
        }
    }

    return (
        <>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle>
                        {resetPassword ? "Reset Password" : otpSent ? "Enter OTP" : "Forgot Password?"}
                    </CardTitle>
                    <CardDescription>
                        {resetPassword
                            ? "Enter your new password below"
                            : otpSent
                                ? `Enter the OTP sent to ${email}`
                                : "Enter your email to reset your password"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!otpSent ? (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='johndoe@email.com'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="w-full space-y-4">
                                    <Button type='submit' className='w-full cursor-pointer' disabled={!emailValue}>Reset Password</Button>
                                </div>
                            </form>
                        </Form>
                    ) : resetPassword ? (
                        <ResetPasswordComponent />
                    ) : (
                        <InputOtpComponent
                            email={email}
                            onVerifyOtp={handleVerifyOtp}
                        />
                    )}
                </CardContent>
            </Card>
        </>
    )
}
