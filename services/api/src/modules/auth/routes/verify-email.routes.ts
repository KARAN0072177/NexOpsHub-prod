import { Router } from "express";

import { authController } from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/verify-email",
  authController.verifyEmail.bind(authController)
);

export default router;
