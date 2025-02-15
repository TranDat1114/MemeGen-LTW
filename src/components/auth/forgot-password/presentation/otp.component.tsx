'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface InputOtpProps {
    onVerifyOtp: (otp: string) => void;
}

const formSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export function InputOtpComponent({ onVerifyOtp }: InputOtpProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pin: "",
        }
    })

    const pinValue = form.watch("pin");

    return (
        <div className='space-y-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => onVerifyOtp(data.pin))} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex justify-center items-center">
                                        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                            </InputOTPGroup>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={1} />
                                            </InputOTPGroup>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={2} />
                                            </InputOTPGroup>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={3} />
                                            </InputOTPGroup>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={4} />
                                            </InputOTPGroup>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-4">
                        <Button className='w-full' type='submit' disabled={!pinValue}>Verify Code</Button>
                        <div className='flex justify-center items-center'>
                            <p className='text-sm text-muted-foreground'>
                                Haven’t got the email yet?&nbsp;
                                <span className='cursor-pointer text-primary hover:underline'>Resend email</span>
                            </p>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
