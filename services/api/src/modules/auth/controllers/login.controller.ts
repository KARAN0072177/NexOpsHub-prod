import { Request, Response } from "express";

import { AUTH } from "@/shared/constants/auth.js";

import { loginSchema } from "../validators/login.schema.js";
import { loginService } from "../services/login.service.js";

export class LoginController {
  async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);

      const result = await loginService.execute(data);

      res.cookie(
        AUTH.SESSION_COOKIE_NAME,
        result.session.sessionToken,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          expires: result.session.expiresAt,
          path: "/",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Login successful.",
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
  }
}

export const loginController = new LoginController();