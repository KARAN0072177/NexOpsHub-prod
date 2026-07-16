export const PROJECT = {
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
  },

  DESCRIPTION: {
    MAX_LENGTH: 500,
  },

  SLUG: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
    REGEX: /^[a-z0-9-]+$/,
  },
} as const;