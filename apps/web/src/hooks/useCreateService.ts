"use client";

import { useState } from "react";

import { createService } from "@/components/service/service.api";

import type {
  CreateServiceRequest,
  CreateServiceResponse,
} from "@/components/service/types";

export function useCreateService() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function execute(
    environmentId: string,
    data: CreateServiceRequest
  ): Promise<CreateServiceResponse | null> {
    setLoading(true);
    setError("");

    try {
      const result = await createService(
        environmentId,
        data
      );

      return result;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    createService: execute,
  };
}