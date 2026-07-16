import { prisma } from "@/shared/database/prisma.js";

import { OrganizationRole } from "@prisma/client";

export class MembershipRepository {
    async create(data: {
        userId: string;
        organizationId: string;
        role: OrganizationRole;
    }) {
        return prisma.membership.create({
            data,
        });
    }

    async findMembership(
        userId: string,
        organizationId: string
    ) {
        return prisma.membership.findUnique({
            where: {
                userId_organizationId: {
                    userId,
                    organizationId,
                },
            },
        });
    }

    async findByUserId(userId: string) {
        return prisma.membership.findMany({
            where: {
                userId,
            },
            include: {
                organization: true,
            },
        });
    }

    async delete(id: string) {
        return prisma.membership.delete({
            where: {
                id,
            },
        });
    }

    async findByUserAndOrganization(
        userId: string,
        organizationId: string
    ) {
        return prisma.membership.findUnique({
            where: {
                userId_organizationId: {
                    userId,
                    organizationId,
                },
            },
        });
    }

    async findOrganizationsByUserId(userId: string) {
        return prisma.membership.findMany({
            where: {
                userId,
            },
            include: {
                organization: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
    }

    async findOwnerOrganization(userId: string) {
        return prisma.membership.findFirst({
            where: {
                userId,
                role: "OWNER",
            },
            include: {
                organization: true,
            },
        });
    }


}

export const membershipRepository =
    new MembershipRepository();