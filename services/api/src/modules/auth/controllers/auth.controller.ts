import type { Request, Response, NextFunction } from "express";

import { registerSchema } from "../validators/register.schema.js";
import { registerService } from "../services/register.service.js";

export class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = registerSchema.parse(req.body);

      const result = await registerService.execute({
        email: data.email,
        password: data.password,
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();