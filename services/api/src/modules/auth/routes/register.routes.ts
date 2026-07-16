import { Router } from "express";

import { authController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", authController.register.bind(authController));

export default router;
