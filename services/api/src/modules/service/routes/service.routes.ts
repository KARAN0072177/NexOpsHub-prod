import { Router } from "express";

import { authMiddleware } from "@/modules/auth/middleware/auth.middleware.js";

import { serviceController } from "../controllers/service.controller.js";

const router = Router();

router.post(
  "/environments/:environmentId/services",
  authMiddleware,
  serviceController.create.bind(serviceController)
);

export default router;