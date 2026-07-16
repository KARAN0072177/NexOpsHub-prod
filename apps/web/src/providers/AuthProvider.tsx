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
  AuthStatus,
  AuthUser,
  OrganizationMembership,
  OrganizationSummary,
} from "@/types/auth";

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

  const [currentOrganization, setCurrentOrganization] =
    useState<OrganizationSummary | null>(null);

  const [organizations, setOrganizations] =
    useState<OrganizationMembership[]>([]);

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
        setCurrentOrganization(null);
        setOrganizations([]);
        setStatus("unauthenticated");
        return;
      }

      const result = await response.json();

      setUser(result.user);
      setCurrentOrganization(result.currentOrganization);
      setOrganizations(result.organizations);

      setStatus("authenticated");
    } catch {
      setUser(null);
      setCurrentOrganization(null);
      setOrganizations([]);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  async function logout() {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } finally {
      setUser(null);
      setCurrentOrganization(null);
      setOrganizations([]);
      setStatus("unauthenticated");
    }
  }

  const value = useMemo(
    () => ({
      status,
      user,
      currentOrganization,
      organizations,
      refreshUser: fetchUser,
      logout,
    }),
    [
      status,
      user,
      currentOrganization,
      organizations,
      fetchUser,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}