import { prisma } from "@/shared/database/prisma.js";

export class ProjectRepository {
    async findById(id: string) {
        return prisma.project.findUnique({
            where: {
                id,
            },
        });
    }

    async findBySlug(
        organizationId: string,
        slug: string
    ) {
        return prisma.project.findUnique({
            where: {
                organizationId_slug: {
                    organizationId,
                    slug,
                },
            },
        });
    }

    async create(data: {
        organizationId: string;
        name: string;
        slug: string;
        description?: string;
    }) {
        return prisma.project.create({
            data,
        });
    }

    async findByOrganizationId(organizationId: string) {
        return prisma.project.findMany({
            where: {
                organizationId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async existsByOrganizationId(
        organizationId: string
    ) {
        const project = await prisma.project.findFirst({
            where: {
                organizationId,
            },
            select: {
                id: true,
            },
        });

        return project !== null;
    }

}

export const projectRepository = new ProjectRepository();