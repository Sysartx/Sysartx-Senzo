"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function page() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const email = searchParams.get('email');

    const [resendLoading, setResendLoading] = useState(false);
    const [canResend, setCanResend] = useState(false);
    const [resendMessage, setResendMessage] = useState("");
    const [countdown, setCountdown] = useState(30);

    useEffect(() => {

        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);


    // resend handler
    const handleResendEmail = async () => {
        if (!email) return;
        try {
            setResendLoading(true);
            setCanResend(false);
            setCountdown(30);
            // const response = await ApiService("POST", "/api/v1/users/resend-verification-email", {
            //     email,
            // });
            setResendMessage("Verification email sent successfully.");
        } catch (err: any) {
            if (err.message === "User already verified") {
                setResendMessage("You've already verified your email. Redirecting to login...");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
                return
            }
            setResendMessage(err.message || "Failed to resend email. Try again later.");
        } finally {
            setResendLoading(false);
        }
    };


    return (
        <div className='bg-white'>
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex min-h-screen items-center justify-center p-4 md:p-8"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <Card className="overflow-hidden border-0 shadow-xl">
                        <div
                            className={`h-2 rounded-t-2xl bg-gradient-to-r from-black to-blue-900`}
                        />
                        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full"
                            >
                                <motion.div
                                    className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 mx-auto"
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 1.5,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <RefreshCw className="h-14 w-14 text-blue-900" />
                                </motion.div>
                                <h2 className="mb-2 text-2xl font-bold text-gray-800">Verify Your Email</h2>
                                <p className="mb-6 text-gray-600">
                                    A verification link has been sent to your email address. Please check your inbox to activate your account.
                                </p>

                                <Button
                                    className="w-full cursor-pointer"
                                    onClick={handleResendEmail}
                                    disabled={!canResend || resendLoading}
                                >
                                    {
                                        resendLoading
                                            ? "Sending..."
                                            : canResend
                                                ? "Resend Verification Email"
                                                : `Resend in ${countdown}s`
                                    }
                                </Button>

                                {resendMessage && (
                                    <p className="mt-4 text-sm text-gray-500">{resendMessage}</p>
                                )}
                            </motion.div>

                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    )
}
