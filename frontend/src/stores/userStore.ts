"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    id: string
    name: string
    email: string
    role: string
    token: string
    image: string
    emailVerified: boolean
}

interface UserStore {
    user: User | null
    setUser: (user: User) => void
    logout: () => void
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            user: null,

            setUser: (user) => set({ user }),
            logout: () => {
                set({ user: null })

                if (typeof window !== 'undefined') {
                    localStorage.removeItem('user')
                }
            },
        }),
        {
            name: 'user', // localStorage key
        }
    )
)
