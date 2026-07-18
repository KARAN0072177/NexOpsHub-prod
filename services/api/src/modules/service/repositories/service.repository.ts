import {
  Prisma,
  PrismaClient,
} from "@prisma/client";

export class ServiceRepository {
  async findBySlug(
    db: PrismaClient | Prisma.TransactionClient,
    environmentId: string,
    slug: string
  ) {
    return db.service.findFirst({
      where: {
        environmentId,
        slug,
      },
    });
  }

  async create(
    db: PrismaClient | Prisma.TransactionClient,
    data: Prisma.ServiceCreateInput
  ) {
    return db.service.create({
      data,
    });
  }
}

export const serviceRepository =
  new ServiceRepository();