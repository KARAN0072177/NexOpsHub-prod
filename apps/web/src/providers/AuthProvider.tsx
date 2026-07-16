"use client";

import {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { AuthContext } from "@/contexts/auth-context";

import type {
    AuthStatus
} from "@/types/auth";

import type { AuthUser } from "@/types/auth";

interface Props {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: Props) {

    const [status, setStatus] =
        useState<AuthStatus>("loading");

    const [user, setUser] =
        useState<AuthUser | null>(null);

    const fetchUser = useCallback(async () => {
        setStatus("loading");

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
                {
                    credentials: "include",
                }
            );

            if (!response.ok) {
                setUser(null);
                setStatus("unauthenticated");
                return;
            }

            const result = await response.json();

            setUser(result.user);

            setStatus("authenticated");
        } catch {
            setUser(null);

            setStatus("unauthenticated");
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    async function logout() {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
            {
                method: "POST",
                credentials: "include",
            }
        );

        setUser(null);

        setStatus("unauthenticated");
    }

    const value = useMemo(
        () => ({
            status,
            user,
            refreshUser: fetchUser,
            logout,
        }),
        [status, user, fetchUser]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}