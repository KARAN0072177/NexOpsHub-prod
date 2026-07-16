import { ProtectedGuard } from "@/components/auth/ProtectedGuard";
import { CreateProjectForm } from "@/components/project/CreateProjectForm";

export default function SetupPage() {
  return (
    <ProtectedGuard>
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

          <div className="grid gap-10 lg:grid-cols-[350px_1fr]">
            {/* Progress */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">
                Setup Progress
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>✅ Account Created</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>✅ Username Configured</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>✅ Organization Created</span>
                </div>

                <div className="flex items-center justify-between font-medium">
                  <span>🟦 Create First Project</span>
                </div>

                <div className="flex items-center justify-between text-gray-400">
                  <span>⬜ Connect First Resource</span>
                </div>

                <div className="flex items-center justify-between text-gray-400">
                  <span>⬜ Enable Monitoring</span>
                </div>
              </div>

              <div className="mt-8 rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-blue-800">
                  <strong>Current Step:</strong> Create your first
                  project. Projects organize your applications,
                  environments and infrastructure.
                </p>
              </div>
            </div>

            {/* Form */}
            <CreateProjectForm />
          </div>
        </div>
      </main>
    </ProtectedGuard>
  );
}