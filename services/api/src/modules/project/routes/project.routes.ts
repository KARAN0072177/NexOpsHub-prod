import { Router } from "express";

import { authMiddleware } from "@/modules/auth/middleware/auth.middleware.js";

import { projectController } from "../controllers/project.controller.js";

const router = Router();

router.post(
  "/projects",
  authMiddleware,
  projectController.create.bind(projectController)
);

export default router;