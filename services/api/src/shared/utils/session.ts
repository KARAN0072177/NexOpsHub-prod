import crypto from "crypto";

/**
 * Generates a cryptographically secure random session token.
 *
 * This raw token is sent to the user's browser as an HTTP-only cookie.
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Hashes a session token before storing it in the database.
 *
 * Only the hash is persisted.
 * The raw token is never stored.
 */
export function hashSessionToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}