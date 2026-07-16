import { Request, Response } from "express";

import { meService } from "../services/me.service.js";

export class MeController {
  async me(req: Request, res: Response) {
    const user = meService.execute(req.user);

    return res.status(200).json({
      success: true,
      user,
    });
  }
}

export const meController = new MeController();