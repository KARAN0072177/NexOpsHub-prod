import {
  EnvironmentType,
  Prisma,
  PrismaClient,
} from "@prisma/client";

type DbClient =
  | PrismaClient
  | Prisma.TransactionClient;

export class EnvironmentRepository {
  async create(
    db: DbClient,
    data: {
      projectId: string;
      name: string;
      slug: string;
      type: EnvironmentType;
    }
  ) {
    return db.environment.create({
      data,
    });
  }

  async findByIdWithProject(
    db: DbClient,
    id: string
  ) {
    return db.environment.findUnique({
      where: {
        id,
      },
      include: {
        project: {
          select: {
            organizationId: true,
          },
        },
      },
    });
  }

  async findDevelopmentByOrganizationId(
    db: DbClient,
    organizationId: string
  ) {
    return db.environment.findFirst({
      where: {
        type: EnvironmentType.DEVELOPMENT,
        project: {
          organizationId,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

}

export const environmentRepository =
  new EnvironmentRepository();