'use client'

import React from 'react'

import Lottie from 'react-lottie';
import successAnimation from '@/components/presentation/assets/animations/success-password.json'

export default function SuccessAnimation() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: successAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={200}
                width={200}
            />
        </div>
    )
}
