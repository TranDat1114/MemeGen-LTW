"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from "react-hook-form"

import React, { useMemo, useState } from 'react'
import { Check, Undo2, X } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import toast from 'react-hot-toast'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InferType } from 'yup'
import { fetchRegister } from '@/lib/axios/fetch/auth'
import { useRouter } from 'next/navigation'

const PASSWORD_REQUIREMENTS = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /[0-9]/, text: 'At least 1 number' },
    { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
    { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    { regex: /[!-\/:-@[-`{-~]/, text: 'At least 1 special characters' },
] as const;

type StrengthScore = 0 | 1 | 2 | 3 | 4 | 5;

const STRENGTH_CONFIG = {
    colors: {
        0: 'bg-border',
        1: 'bg-red-500',
        2: 'bg-orange-500',
        3: 'bg-amber-500',
        4: 'bg-amber-700',
        5: 'bg-emerald-500',
    } satisfies Record<StrengthScore, string>,
    texts: {
        0: 'Enter a password',
        1: 'Weak password',
        2: 'Medium password!',
        3: 'Strong password!!',
        4: 'Very Strong password!!!',
    } satisfies Record<Exclude<StrengthScore, 5>, string>,
} as const;

// Types
type Requirement = {
    met: boolean;
    text: string;
};

type PasswordStrength = {
    score: StrengthScore;
    requirements: Requirement[];
};

export const formSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email is required"),

    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password must be at most 32 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),

    repeatPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password"), ''], "Passwords do not match"),
});

export default function RegisterComponent() {
    const router = useRouter()
    const form = useForm<InferType<typeof formSchema>>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            repeatPassword: "",
        }
    })

    const [errorList, setErrorList] = useState<string[]>([])

    function onSubmit(data: InferType<typeof formSchema>) {
        const { repeatPassword, ...rest } = data
        fetchRegister(rest).then((res) => {
            if (res) {
                toast.success("Account created successfully 🎉")

                router.push('/login')
            }
        }).catch((error) => {
            toast.error("❌ Failed to create account")
            setErrorList((error as Error).message.split(','))
        })
    }

    const password = form.watch("password");

    const calculateStrength = useMemo((): PasswordStrength => {
        const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
            met: req.regex.test(password ?? ""),
            text: req.text,
        }));

        return {
            score: requirements.filter((req) => req.met).length as StrengthScore,
            requirements,
        };
    }, [password]);

    return (
        <>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    <CardDescription>Create an account to start using our service</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
                                        </div>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder="Input your password"
                                                {...field}
                                                // onChange={(e) => setPassword(e.target.value)}
                                                aria-invalid={calculateStrength.score < 4}
                                                aria-describedby='password-strength'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="repeatPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between items-center">
                                            <FormLabel>Confirm password</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input placeholder="Input your confirm password" type='password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex justify-between gap-2 mt-2 w-full'>
                                <span
                                    className={`${calculateStrength.score >= 1 ? 'bg-green-200' : 'bg-border'
                                        }  p-1 rounded-full w-full`}
                                ></span>
                                <span
                                    className={`${calculateStrength.score >= 2 ? 'bg-green-300' : 'bg-border'
                                        }  p-1 rounded-full w-full`}
                                ></span>
                                <span
                                    className={`${calculateStrength.score >= 3 ? 'bg-green-400' : 'bg-border'
                                        }  p-1 rounded-full w-full`}
                                ></span>
                                <span
                                    className={`${calculateStrength.score >= 4 ? 'bg-green-500' : 'bg-border'
                                        }  p-1 rounded-full w-full`}
                                ></span>
                                <span
                                    className={`${calculateStrength.score >= 5 ? 'bg-green-600' : 'bg-border'
                                        }  p-1 rounded-full w-full`}
                                ></span>
                            </div>
                            <p
                                id='password-strength'
                                className='flex justify-between my-2 font-medium text-sm'
                            >
                                <span>Must contain:</span>
                                <span>
                                    {
                                        STRENGTH_CONFIG.texts[
                                        Math.min(
                                            calculateStrength.score,
                                            4
                                        ) as keyof typeof STRENGTH_CONFIG.texts
                                        ]
                                    }
                                </span>
                            </p>
                            <ul className='space-y-1.5' aria-label='Password requirements'>
                                {calculateStrength.requirements.map((req, index) => (
                                    <li key={index} className='flex items-center space-x-2'>
                                        {req.met ? (
                                            <Check size={16} className='text-emerald-500' />
                                        ) : (
                                            <X size={16} className='text-muted-foreground/80' />
                                        )}
                                        <span
                                            className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'
                                                }`}
                                        >
                                            {req.text}
                                            <span className='sr-only'>
                                                {req.met ? ' - Requirement met' : ' - Requirement not met'}
                                            </span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <Separator className='my-6' />
                            <div className="space-y-4 w-full">
                                <Button type='submit' className='w-full cursor-pointer'>Register</Button>
                                <div className="flex justify-center items-center gap-2">
                                    <Label>Already have an account?&nbsp;
                                        <Link href="/login" className="text-primary">Login</Link>
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
