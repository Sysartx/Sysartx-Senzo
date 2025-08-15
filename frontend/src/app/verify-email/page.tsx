"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle, XCircle, RefreshCw, LogIn, Loader } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ApiService from '@/lib/apiService';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [status, setStatus] = useState<"initial" | "verifying" | "success" | "error">("initial");
    const [loading, setLoading] = useState(!!token);

    // verify token if available
    useEffect(() => {
        if (token) {
            setStatus("verifying");
            (async () => {
                try {
                    // const response = await ApiService("PUT", `/api/v1/users/verify-email/${token}`);
                    const response = {
                        message: "Email verified successfully"
                    }
                    if (response.message === "Email verified successfully") {
                        setStatus("success");
                    } else {
                        setStatus("error");
                    }
                } catch (error) {
                    setStatus("error");
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [token]);



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <Loader className="animate-spin" />
            </div>
        )
    }

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
                            className={`h-2 rounded-t-2xl ${status === "success"
                                ? "bg-gradient-to-r from-black to-blue-900"
                                : status === "error"
                                    ? "bg-gradient-to-r from-red-400 to-rose-500"
                                    : "bg-gradient-to-r from-black to-blue-900"
                                }`}
                        />
                        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="w-full"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.3 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeOut",
                                        type: "spring",
                                        stiffness: 160,
                                        damping: 12,
                                    }}
                                    className="flex items-center justify-center rounded-full mb-4"
                                >
                                    <svg
                                        width="80"
                                        height="80"
                                        viewBox="0 0 52 52"
                                        className="text-lime-250"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    >
                                        <motion.circle
                                            cx="26"
                                            cy="26"
                                            r="24"
                                            stroke="currentColor"
                                            initial={{ pathLength: 0, opacity: 0.2 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 1 }}
                                        />
                                        <motion.path
                                            d="M16 26 L22 32 L36 18"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        />
                                    </svg>
                                </motion.div>

                                <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
                                    Email Verified Successfully!
                                </h2>
                                <p className="mb-6 text-center text-gray-600">
                                    Your email address has been successfully verified. You can now access your account.
                                </p>

                                <Link href="/login" className="block cursor-pointer">
                                    <Button className="w-full">
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Continue to Login
                                    </Button>
                                </Link>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    )
}
