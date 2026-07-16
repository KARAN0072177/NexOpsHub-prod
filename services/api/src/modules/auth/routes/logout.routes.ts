import { Router } from "express";

import { logoutController } from "../controllers/logout.controller.js";

const router = Router();

router.post(
  "/logout",
  logoutController.logout.bind(logoutController)
);

export default router;