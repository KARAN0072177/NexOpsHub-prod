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
}

export const membershipRepository =
    new MembershipRepository();