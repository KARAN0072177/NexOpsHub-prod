import { z } from "zod";

import { SERVICE } from "../constants/service.js";

export const createServiceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      SERVICE.NAME.MIN_LENGTH,
      "Service name is required."
    )
    .max(
      SERVICE.NAME.MAX_LENGTH,
      `Service name must be at most ${SERVICE.NAME.MAX_LENGTH} characters.`
    ),

  description: z
    .string()
    .trim()
    .max(
      SERVICE.DESCRIPTION.MAX_LENGTH,
      `Description must be at most ${SERVICE.DESCRIPTION.MAX_LENGTH} characters.`
    )
    .optional(),
});

export type CreateServiceInput = z.infer<
  typeof createServiceSchema
>;