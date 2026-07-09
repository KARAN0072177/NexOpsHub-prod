import { z } from "zod";

import { emailSchema } from "@/shared/validation/email.schema.js";
import { passwordSchema } from "@/shared/validation/password.schema.js";

export const registerSchema = z
  .object({
    email: emailSchema,

    password: passwordSchema,

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type RegisterInput = z.infer<typeof registerSchema>;