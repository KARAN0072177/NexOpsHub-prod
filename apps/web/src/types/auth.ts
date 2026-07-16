export type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated";

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

export interface AuthContextValue {
  status: AuthStatus;

  user: AuthUser | null;

  refreshUser: () => Promise<void>;

  logout: () => Promise<void>;
}