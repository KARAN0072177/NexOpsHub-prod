export const EnvironmentType = {
  DEVELOPMENT: "DEVELOPMENT",
  STAGING: "STAGING",
  PRODUCTION: "PRODUCTION",
  TESTING: "TESTING",
  PREVIEW: "PREVIEW",
} as const;

export type EnvironmentType =
  (typeof EnvironmentType)[keyof typeof EnvironmentType];