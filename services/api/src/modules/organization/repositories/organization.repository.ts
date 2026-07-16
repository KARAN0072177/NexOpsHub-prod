import { prisma } from "@/shared/database/prisma.js";

export class OrganizationRepository {
  async create(data: {
    name: string;
    slug: string;
  }) {
    return prisma.organization.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.organization.findUnique({
      where: {
        id,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.organization.findUnique({
      where: {
        slug,
      },
    });
  }

  async findByName(name: string) {
    return prisma.organization.findUnique({
      where: {
        name,
      },
    });
  }
}

export const organizationRepository =
  new OrganizationRepository();