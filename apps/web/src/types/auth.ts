export interface OrganizationSummary {
  id: string;
  name: string;
  slug: string;
  hasProjects: boolean;
}

export interface OrganizationMembership
  extends OrganizationSummary {
  role: "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";
}

export interface AuthUser {
  id: string;
  email: string;
  username: string | null;
  displayName: string | null;
  avatar: string | null;
  onboardingCompleted: boolean;
  emailVerifiedAt: string | null;
  createdAt: string;
}

export type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated";

export interface AuthContextValue {
  status: AuthStatus;

  user: AuthUser | null;

  currentOrganization: OrganizationSummary | null;

  organizations: OrganizationMembership[];

  refreshUser: () => Promise<void>;

  logout: () => Promise<void>;
}