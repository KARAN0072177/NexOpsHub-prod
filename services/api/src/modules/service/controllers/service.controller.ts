import { Request, Response } from "express";

import { serviceService } from "../services/service.service.js";

export class ServiceController {
  async create(req: Request, res: Response) {
    const service = await serviceService.create({
      userId: req.user.id,
      environmentId: req.params.environmentId,
      name: req.body.name,
      description: req.body.description,
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully.",
      data: service,
    });
  }
}

export const serviceController =
  new ServiceController();