import type {
  CreateServiceRequest,
  CreateServiceResponse,
} from "./types";

export async function createService(
  environmentId: string,
  data: CreateServiceRequest
): Promise<CreateServiceResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/environments/${environmentId}/services`,
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
    throw new Error(
      result.message || "Failed to create service."
    );
  }

  return result;
}