import crypto from "crypto";

/**
 * Generates a cryptographically secure random token.
 */
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Hashes a token before storing it in the database.
 */
export function hashVerificationToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}