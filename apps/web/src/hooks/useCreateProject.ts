"use client";

import { useState } from "react";

import type {
  CreateProjectRequest,
  CreateProjectResponse,
} from "@/types/project";

export function useCreateProject() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function createProject(
    data: CreateProjectRequest
  ): Promise<CreateProjectResponse | null> {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        return null;
      }

      return result;
    } catch {
      setError("Something went wrong.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    createProject,
  };
}