"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingGuard } from "@/components/auth/OnboardingGuard";
import { useAuth } from "@/hooks/useAuth";

export default function UsernamePage() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/username`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message);
        return;
      }

      await refreshUser();
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (

    <OnboardingGuard>

    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow"
      >
        <h1 className="mb-6 text-3xl font-bold">
          Choose Username
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="mb-4 w-full rounded border p-3"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        {message && (
          <p className="mb-4 text-red-600">
            {message}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full rounded bg-black p-3 text-white"
        >
          {loading
            ? "Saving..."
            : "Continue"}
        </button>
      </form>
    </main>

    </OnboardingGuard>
  );
}