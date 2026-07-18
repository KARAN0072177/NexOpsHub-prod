"use client";

import { SetupContent } from "@/components/setup/SetupContent";
import { SetupProgress } from "@/components/setup/SetupProgress";

import { useAuth } from "@/hooks/useAuth";

import type { SetupStep } from "@/components/setup/types";



export function SetupFlow() {
  const { currentOrganization } = useAuth();

  const currentStep: SetupStep =
    currentOrganization?.hasProjects
      ? "service"
      : "project";

  return (
    <div className="grid gap-10 lg:grid-cols-[350px_1fr]">
      <SetupProgress currentStep={currentStep} />

      <SetupContent currentStep={currentStep} />
    </div>
  );
}