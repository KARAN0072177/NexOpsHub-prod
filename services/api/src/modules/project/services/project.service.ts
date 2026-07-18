import { EnvironmentType } from "@prisma/client";

import { prisma } from "@/shared/database/prisma.js";
import { generateSlug } from "@/shared/utils/slug.js";

import { ENVIRONMENT } from "@/modules/environment/constants/environment.js";
import { environmentRepository } from "@/modules/environment/repositories/environment.repository.js";
import { membershipRepository } from "@/modules/organization/repositories/membership.repository.js";

import { projectRepository } from "../repositories/project.repository.js";

export class ProjectService {
  async create(data: {
    userId: string;
    organizationId: string;
    name: string;
    description?: string;
  }) {
    /**
     * Verify membership
     */
    const membership =
      await membershipRepository.findByUserAndOrganization(
        data.userId,
        data.organizationId
      );

    if (!membership) {
      throw new Error(
        "You do not have access to this organization."
      );
    }

    /**
     * Generate slug
     */
    const slug = generateSlug(data.name);

    /**
     * Project already exists?
     */
    const existingProject =
      await projectRepository.findBySlug(
        prisma,
        data.organizationId,
        slug
      );

    if (existingProject) {
      throw new Error(
        "A project with this name already exists."
      );
    }

    /**
     * Atomic project creation
     */
    return prisma.$transaction(async (tx) => {
      const project =
        await projectRepository.create(tx, {
          organizationId: data.organizationId,
          name: data.name.trim(),
          slug,
          description: data.description?.trim(),
        });

      await environmentRepository.create(tx, {
        projectId: project.id,
        name: ENVIRONMENT.DEFAULT.NAME,
        slug: ENVIRONMENT.DEFAULT.SLUG,
        type: EnvironmentType.DEVELOPMENT,
      });

      return project;
    });
  }
}

export const projectService =
  new ProjectService();