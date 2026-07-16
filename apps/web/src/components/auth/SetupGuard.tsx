"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: ReactNode;
}

export function SetupGuard({ children }: Props) {
  const router = useRouter();

  const { status, currentOrganization } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    if (status === "authenticated" && currentOrganization?.hasProjects) {
      router.replace("/dashboard");
    }
  }, [status, currentOrganization, router]);

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

  if (currentOrganization?.hasProjects) {
    return null;
  }

  return <>{children}</>;
}
