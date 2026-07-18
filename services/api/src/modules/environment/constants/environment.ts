export const ENVIRONMENT = {
  DEFAULT: {
    NAME: "Development",
    SLUG: "development",
    TYPE: "DEVELOPMENT",
  },

  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },

  SLUG: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
} as const;