import type { AuthContextValue } from "@/types/auth";

export function resolveLandingPage(
  auth: Pick<
    AuthContextValue,
    "status" | "user" | "currentOrganization"
  >
): string {
  if (auth.status !== "authenticated") {
    return "/login";
  }

  if (!auth.user?.onboardingCompleted) {
    return "/username";
  }

  if (!auth.currentOrganization?.hasProjects) {
    return "/setup";
  }

  if (!auth.currentOrganization?.hasServices) {
    return "/setup";
  }

  return "/dashboard";
}