import { NextFunction, Request, Response } from "express";

import { AUTH } from "@/shared/constants/auth.js";

import { sessionService } from "../services/session.service.js";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sessionToken = req.cookies?.[AUTH.SESSION_COOKIE_NAME];

    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const session = await sessionService.validate(sessionToken);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    req.user = session.user;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }
}