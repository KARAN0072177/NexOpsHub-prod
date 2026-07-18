import { Request, Response } from "express";

import { setupService } from "../services/setup.service.js";

export class SetupController {
  async getDevelopmentEnvironment(
    req: Request,
    res: Response
  ) {
    const environment =
      await setupService.getDevelopmentEnvironment({
        userId: req.user.id,
        organizationId:
          req.query.organizationId as string,
      });

    return res.status(200).json({
      success: true,
      environment,
    });
  }
}

export const setupController =
  new SetupController();