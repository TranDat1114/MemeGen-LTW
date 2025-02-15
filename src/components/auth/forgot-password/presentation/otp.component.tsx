'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface InputOtpProps {
    email: string;
    onVerifyOtp: (otp: string) => void;
}

const formSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export function InputOtpComponent({ email, onVerifyOtp }: InputOtpProps) {
    const [timeLeft, setTimeLeft] = useState(30); // ⏳ 30s countdown
    const [canResend, setCanResend] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pin: "",
        }
    })

    const pinValue = form.watch("pin");

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true); // ✅ Hết thời gian thì cho phép gửi lại email
        }
    }, [timeLeft]);

    function resendMail() {
        console.log("Resend email", email)
        toast.success("OPT resend successfully!")
        setTimeLeft(30); // Reset countdown
        setCanResend(false); // Disable nút gửi lại OTP
    }

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
                        <div className="flex justify-center items-center">
                            <p className="text-sm text-muted-foreground">
                                Haven’t received the email yet?&nbsp;
                                {canResend ? (
                                    <span className="cursor-pointer text-primary hover:underline" onClick={resendMail}>
                                        Resend email
                                    </span>
                                ) : (
                                    <span className="text-gray-500">Resend in {timeLeft}s</span>
                                )}
                            </p>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
