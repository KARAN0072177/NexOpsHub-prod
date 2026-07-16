import { Request, Response } from "express";

import { projectSchema } from "../validators/project.schema.js";
import { projectService } from "../services/project.service.js";

export class ProjectController {
  async create(req: Request, res: Response) {
    const body = projectSchema.parse(req.body);

    const project = await projectService.create({
      userId: req.user.id,
      organizationId: req.body.organizationId,
      name: body.name,
      description: body.description,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });
  }
}

export const projectController = new ProjectController();