import { generateSlug } from "@/shared/utils/slug.js";

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
     * Slug already exists?
     */
    const existingProject =
      await projectRepository.findBySlug(
        data.organizationId,
        slug
      );

    if (existingProject) {
      throw new Error(
        "A project with this name already exists."
      );
    }

    /**
     * Create project
     */
    const project = await projectRepository.create({
      organizationId: data.organizationId,
      name: data.name.trim(),
      slug,
      description: data.description?.trim(),
    });

    return project;
  }
}

export const projectService = new ProjectService();