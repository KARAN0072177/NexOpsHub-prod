import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { usernameController } from "../controllers/username.controller.js";

const router = Router();

router.post(
  "/username",
  authMiddleware,
  usernameController.completeOnboarding.bind(usernameController)
);

export default router;