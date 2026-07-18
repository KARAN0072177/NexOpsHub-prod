import {
  Prisma,
  PrismaClient,
} from "@prisma/client";

type DbClient =
  | PrismaClient
  | Prisma.TransactionClient;

export class ProjectRepository {
  async findById(
    db: DbClient,
    id: string
  ) {
    return db.project.findUnique({
      where: {
        id,
      },
    });
  }

  async findBySlug(
    db: DbClient,
    organizationId: string,
    slug: string
  ) {
    return db.project.findUnique({
      where: {
        organizationId_slug: {
          organizationId,
          slug,
        },
      },
    });
  }

  async create(
    db: DbClient,
    data: {
      organizationId: string;
      name: string;
      slug: string;
      description?: string;
    }
  ) {
    return db.project.create({
      data,
    });
  }

  async findByOrganizationId(
    db: DbClient,
    organizationId: string
  ) {
    return db.project.findMany({
      where: {
        organizationId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async existsByOrganizationId(
    db: DbClient,
    organizationId: string
  ) {
    const project = await db.project.findFirst({
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

export const projectRepository =
  new ProjectRepository();