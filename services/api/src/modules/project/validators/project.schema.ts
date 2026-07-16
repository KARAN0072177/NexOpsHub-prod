import { z } from "zod";

import { PROJECT } from "@/shared/constants/project.js";

export const projectSchema = z.object({
  organizationId: z.uuid("Invalid organization ID."),

  name: z
    .string()
    .trim()
    .min(
      PROJECT.NAME.MIN_LENGTH,
      `Project name must be at least ${PROJECT.NAME.MIN_LENGTH} characters.`
    )
    .max(
      PROJECT.NAME.MAX_LENGTH,
      `Project name cannot exceed ${PROJECT.NAME.MAX_LENGTH} characters.`
    ),

  description: z
    .string()
    .trim()
    .max(
      PROJECT.DESCRIPTION.MAX_LENGTH,
      `Description cannot exceed ${PROJECT.DESCRIPTION.MAX_LENGTH} characters.`
    )
    .optional()
    .default(""),
});

export type ProjectInput = z.infer<typeof projectSchema>;