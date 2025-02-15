'use client'

import { useForm } from "react-hook-form";

import * as yup from 'yup'
import { InferType } from 'yup'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import React, { Suspense, useState } from 'react'
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { yupResolver } from '@hookform/resolvers/yup';

// Load animation component dynamically (chỉ tải khi cần)
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const SuccessAnimation = dynamic(() => import("../../../ui/success-animation"), { ssr: false });

export const formSchema = yup.object().shape({
    newPassword: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password must be at most 32 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),

    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("newPassword"), ''], "Passwords do not match"),
});

export default function ResetPasswordComponent() {
    const router = useRouter();
    const [passwordReset, setPasswordReset] = useState(false);

    const form = useForm<InferType<typeof formSchema>>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        }
    })

    function onSubmit(data: InferType<typeof formSchema>) {
        console.log(data);
        toast.success("Password reset successfully!");

        setPasswordReset(true);

        setTimeout(() => {
            router.push("/");
        }, 3000);
    }

    const newPassword = form.watch("newPassword");
    const confirmPassword = form.watch("confirmPassword");

    const isFormValid = newPassword.length >= 6 && confirmPassword.length >= 6 && newPassword === confirmPassword;


    return (
        <div className='space-y-4'>
            {passwordReset ? (
                <Suspense fallback={<p>Loading animation...</p>}>
                    <SuccessAnimation />
                </Suspense>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='newPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter your new password' {...field} type='password' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Re-enter password' {...field} type='password' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-4">
                            <Button className='w-full' type='submit' disabled={!isFormValid}>Update Password</Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}
