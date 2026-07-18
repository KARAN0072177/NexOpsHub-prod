import { prisma } from "@/shared/database/prisma.js";

import { environmentRepository } from "@/modules/environment/repositories/environment.repository.js";
import { membershipRepository } from "@/modules/organization/repositories/membership.repository.js";

export class SetupService {
  async getDevelopmentEnvironment(data: {
    userId: string;
    organizationId: string;
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
     * Find Development environment
     */
    const environment =
      await environmentRepository.findDevelopmentByOrganizationId(
        prisma,
        data.organizationId
      );

    if (!environment) {
      throw new Error(
        "Development environment not found."
      );
    }

    return environment;
  }
}

export const setupService =
  new SetupService();