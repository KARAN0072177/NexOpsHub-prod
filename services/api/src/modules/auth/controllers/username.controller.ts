import { Request, Response } from "express";

import { usernameSchema } from "../validators/username.schema.js";
import { usernameService } from "../services/username.service.js";

export class UsernameController {
  async completeOnboarding(
    req: Request,
    res: Response
  ) {
    try {
      const data = usernameSchema.parse(req.body);

      await usernameService.execute({
        userId: req.user.id,
        username: data.username,
      });

      return res.status(200).json({
        success: true,
        message: "Username created successfully.",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to complete onboarding.",
      });
    }
  }
}

export const usernameController =
  new UsernameController();