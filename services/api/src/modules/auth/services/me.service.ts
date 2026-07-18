import { membershipRepository } from "@/modules/organization/repositories/membership.repository.js";

import { projectRepository } from "@/modules/project/repositories/project.repository.js";

import { prisma } from "@/shared/database/prisma.js";

export class MeService {
    async execute(user: Express.User) {
        const memberships =
            await membershipRepository.findOrganizationsByUserId(
                user.id
            );

        const organizations = memberships.map((membership) => ({
            id: membership.organization.id,
            name: membership.organization.name,
            slug: membership.organization.slug,
            role: membership.role,
        }));

        const currentOrganization =
            memberships.find(
                (membership) => membership.role === "OWNER"
            )?.organization ?? null;

                const hasProjects = currentOrganization
            ? await projectRepository.existsByOrganizationId(
                prisma,
                currentOrganization.id
            )
            : false;

        const hasServices = currentOrganization
            ? (await prisma.service.findFirst({
                where: {
                    environment: {
                        project: {
                            organizationId: currentOrganization.id,
                        },
                    },
                },
                select: {
                    id: true,
                },
            })) !== null
            : false;

        return {
            user: {
                id: user.id,
                email: user.email,
                displayName: user.displayName,
                username: user.username,
                avatar: user.avatar,
                onboardingCompleted: user.onboardingCompleted,
                emailVerifiedAt: user.emailVerifiedAt,
                createdAt: user.createdAt,
            },

            currentOrganization: currentOrganization
                ? {
                    id: currentOrganization.id,
                    name: currentOrganization.name,
                    slug: currentOrganization.slug,
                    hasProjects,
                    hasServices,
                }
                : null,

            organizations,
        };
    }
}

export const meService = new MeService();