"use client";

import { CreateProjectForm } from "@/components/project/CreateProjectForm";

import type { SetupStep } from "@/components/setup/types";

interface SetupContentProps {
  currentStep: SetupStep;
}

export function SetupContent({
  currentStep,
}: SetupContentProps) {
  if (currentStep === "project") {
    return <CreateProjectForm />;
  }

  return (
    <div className="rounded-xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold">
        Create your first service
      </h2>

      <p className="mt-2 text-gray-600">
        Every project contains one or more deployable services.
        Your Development environment is ready.
      </p>

      <div className="mt-8 rounded-lg bg-blue-50 p-4 text-blue-800">
        CreateServiceForm will be implemented next.
      </div>
    </div>
  );
}