/**
 * Authentication Constants
 *
 * Central place for authentication-related configuration.
 * Avoid hardcoding values throughout the codebase.
 */

export const AUTH = {
  /**
   * Session
   */
  SESSION_COOKIE_NAME: "session",

  SESSION_DURATION_DAYS: 7,

  /**
   * Username
   */
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
  },

  /**
   * Login Protection
   */
  LOGIN: {
    MAX_ATTEMPTS_PER_IP: 10,
    MAX_ATTEMPTS_PER_EMAIL: 5,
    WINDOW_MINUTES: 10,
  },
} as const;
