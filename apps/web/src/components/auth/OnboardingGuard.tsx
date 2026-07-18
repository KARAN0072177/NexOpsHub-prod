"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { resolveLandingPage } from "@/lib/auth/resolveLandingPage";

interface Props {
  children: ReactNode;
}

export function OnboardingGuard({ children }: Props) {
  const router = useRouter();

  const { status, user, currentOrganization } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    if (
      status === "authenticated" &&
      user?.onboardingCompleted
    ) {
      const destination = resolveLandingPage({
        status,
        user,
        currentOrganization,
      });
      router.replace(destination);
    }
  }, [status, user, currentOrganization, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (user?.onboardingCompleted) {
    return null;
  }

  return <>{children}</>;
}