"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Status = "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState(
    "Verifying your email..."
  );

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ??
              "Email verification failed."
          );
        }

        setStatus("success");
        setMessage(
          "Email verified successfully. Redirecting..."
        );

        setTimeout(() => {
          router.replace("/username");
        }, 2000);
      } catch (error) {
        setStatus("error");

        setMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong."
        );
      }
    };

    verifyEmail();
  }, [router, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">

        <h1 className="mb-6 text-center text-2xl font-bold">
          Email Verification
        </h1>

        {status === "loading" && (
          <div className="space-y-4 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />

            <p className="text-gray-600">
              {message}
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4 text-center">

            <div className="text-5xl">
              ✅
            </div>

            <p className="font-medium text-green-600">
              {message}
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6 text-center">

            <div className="text-5xl">
              ❌
            </div>

            <p className="text-red-600">
              {message}
            </p>

            <button
              onClick={() => router.push("/login")}
              className="w-full rounded-lg bg-black px-4 py-2 font-medium text-white transition hover:bg-gray-800"
            >
              Go to Login
            </button>

          </div>
        )}

      </div>
    </main>
  );
}