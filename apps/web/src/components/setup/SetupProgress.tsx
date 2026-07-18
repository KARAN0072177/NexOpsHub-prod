import type { SetupStep } from "@/components/setup/types";

interface SetupProgressProps {
  currentStep: SetupStep;
}

export function SetupProgress({
  currentStep,
}: SetupProgressProps) {
  const steps = [
    {
      label: "Account Created",
      completed: true,
      key: "account",
    },
    {
      label: "Username Configured",
      completed: true,
      key: "username",
    },
    {
      label: "Organization Created",
      completed: true,
      key: "organization",
    },
    {
      label: "Create First Project",
      key: "project",
    },
    {
      label: "Create First Service",
      key: "service",
    },
    {
      label: "Connect First Resource",
      key: "resource",
    },
    {
      label: "Enable Monitoring",
      key: "monitoring",
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Setup Progress
      </h2>

      <div className="space-y-4">
        {steps.map((step) => {
          if (step.completed) {
            return (
              <div
                key={step.key}
                className="flex items-center justify-between"
              >
                <span>✅ {step.label}</span>
              </div>
            );
          }

          if (step.key === currentStep) {
            return (
              <div
                key={step.key}
                className="flex items-center justify-between font-medium"
              >
                <span>🟦 {step.label}</span>
              </div>
            );
          }

          return (
            <div
              key={step.key}
              className="flex items-center justify-between text-gray-400"
            >
              <span>⬜ {step.label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-lg bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          <strong>Current Step:</strong>{" "}
          {currentStep === "project" &&
            "Create your first project. Projects organize your applications, environments and infrastructure."}

          {currentStep === "service" &&
            "Create your first service. Services represent the deployable components of your application."}

          {currentStep === "resource" &&
            "Connect your first infrastructure resource."}

          {currentStep === "monitoring" &&
            "Enable monitoring to start collecting operational data."}
        </p>
      </div>
    </div>
  );
}