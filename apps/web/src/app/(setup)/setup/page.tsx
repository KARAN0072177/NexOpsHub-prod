import { SetupGuard } from "@/components/auth/SetupGuard";

import { SetupFlow } from "@/components/setup/SetupFlow";

export default function SetupPage() {
  return (
    <SetupGuard>
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
          <div className="mb-12">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              Workspace Setup
            </span>

            <h1 className="mt-4 text-4xl font-bold text-gray-900">
              Let's get your workspace ready
            </h1>

            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              You're only a few steps away from monitoring your
              infrastructure. Complete the setup below to unlock your
              operational dashboard.
            </p>
          </div>

          <SetupFlow />
        </div>
      </main>
    </SetupGuard>
  );
}