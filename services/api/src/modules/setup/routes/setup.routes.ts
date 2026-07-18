import { Router } from "express";

import { authMiddleware } from "@/modules/auth/middleware/auth.middleware.js";

import { setupController } from "../controllers/setup.controller.js";

const router = Router();

router.get(
  "/setup/environment",
  authMiddleware,
  setupController.getDevelopmentEnvironment.bind(
    setupController
  )
);

export default router;