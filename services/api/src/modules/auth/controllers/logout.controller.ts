import { Request, Response } from "express";

import { AUTH } from "@/shared/constants/auth.js";

import { logoutService } from "../services/logout.service.js";

export class LogoutController {
  async logout(req: Request, res: Response) {
    const sessionToken =
      req.cookies?.[AUTH.SESSION_COOKIE_NAME];

    if (sessionToken) {
      await logoutService.execute(sessionToken);
    }

    res.clearCookie(AUTH.SESSION_COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  }
}

export const logoutController =
  new LogoutController();