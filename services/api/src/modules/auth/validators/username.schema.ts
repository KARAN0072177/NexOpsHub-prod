import { z } from "zod";

import { AUTH } from "@/shared/constants/auth.js";

export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(
      AUTH.USERNAME.MIN_LENGTH,
      `Username must be at least ${AUTH.USERNAME.MIN_LENGTH} characters.`
    )
    .max(
      AUTH.USERNAME.MAX_LENGTH,
      `Username cannot exceed ${AUTH.USERNAME.MAX_LENGTH} characters.`
    )
    .regex(
      /^[a-z0-9_]+$/,
      "Username may only contain lowercase letters, numbers and underscores."
    ),
});

export type UsernameInput = z.infer<typeof usernameSchema>;