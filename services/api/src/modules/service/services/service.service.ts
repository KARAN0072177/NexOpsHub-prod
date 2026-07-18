import { prisma } from "@/shared/database/prisma.js";
import { generateSlug } from "@/shared/utils/slug.js";

import { environmentRepository } from "@/modules/environment/repositories/environment.repository.js";
import { membershipRepository } from "@/modules/organization/repositories/membership.repository.js";

import { serviceRepository } from "../repositories/service.repository.js";

export class ServiceService {
  async create(data: {
    userId: string;
    environmentId: string;
    name: string;
    description?: string;
  }) {
    /**
     * Find environment
     */
    const environment =
      await environmentRepository.findByIdWithProject(
        prisma,
        data.environmentId
      );

    if (!environment) {
      throw new Error("Environment not found.");
    }

    /**
     * Verify membership
     */
    const membership =
      await membershipRepository.findByUserAndOrganization(
        data.userId,
        environment.project.organizationId
      );

    if (!membership) {
      throw new Error(
        "You do not have access to this environment."
      );
    }

    /**
     * Generate slug
     */
    const slug = generateSlug(data.name);

    /**
     * Duplicate service?
     */
    const existingService =
      await serviceRepository.findBySlug(
        prisma,
        data.environmentId,
        slug
      );

    if (existingService) {
      throw new Error(
        "A service with this name already exists."
      );
    }

    /**
     * Create service
     */
    return serviceRepository.create(prisma, {
      environment: {
        connect: {
          id: data.environmentId,
        },
      },
      name: data.name.trim(),
      slug,
      description: data.description?.trim(),
    });
  }
}

export const serviceService = new ServiceService();