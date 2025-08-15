"use client";

import { useUserStore } from '@/stores/userStore';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

export default function page() {
    const router = useRouter();
    const params = useSearchParams();

    const token = params?.get('token');

    const user: any = {
        id: 1,
        name: 'John Doe',
        email: 'iV2XW@example.com',
        role: 'admin',
        image: "/placeholder.jpg",
        emailVerified: true
    }

    useEffect(() => {
        if (!token) {
            router.push("/login");
            return
        };
        try {
            document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24}`;
            useUserStore.getState().setUser({
                ...user
            });
            toast.success("User logged in successfully!");
            router.push("/dashboard");
        } catch (err) {
            console.error("Store error:", err);
        }
    }, [token]);

    return (
        <div className='flex justify-center items-center h-screen'>
            <Loader className='animate-spin' />
        </div>
    )
}
