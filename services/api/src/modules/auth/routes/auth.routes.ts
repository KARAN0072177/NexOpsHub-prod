import { Router } from "express";

import registerRoutes from "./register.routes.js";
import verifyEmailRoutes from "./verify-email.routes.js";
import loginRoutes from "./login.routes.js";

import usernameRoutes from "./username.routes.js";
import logoutRoutes from "./logout.routes.js";

const router = Router();

router.use(registerRoutes);
router.use(verifyEmailRoutes);
router.use(loginRoutes);
router.use(usernameRoutes);
router.use(logoutRoutes);

export default router;