export interface DevelopmentEnvironmentResponse {
  success: boolean;

  environment: {
    id: string;
    name: string;
    slug: string;
  };
}

export async function getDevelopmentEnvironment(
  organizationId: string
): Promise<DevelopmentEnvironmentResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/setup/environment?organizationId=${organizationId}`,
    {
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ??
        "Failed to load development environment."
    );
  }

  return result;
}