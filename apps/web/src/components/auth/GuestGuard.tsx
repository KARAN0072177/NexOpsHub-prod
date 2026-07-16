"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: ReactNode;
}

export function GuestGuard({ children }: Props) {
  const router = useRouter();

  const { status, user } = useAuth();

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    if (user?.onboardingCompleted) {
      router.replace("/dashboard");
    } else {
      router.replace("/username");
    }
  }, [status, user, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (status === "authenticated") {
    return null;
  }

  return <>{children}</>;
}