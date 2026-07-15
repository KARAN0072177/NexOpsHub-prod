import { prisma } from "@/shared/database/prisma.js";

export class SessionRepository {
  async create(data: {
    sessionTokenHash: string;
    userId: string;
    expiresAt: Date;
  }) {
    return prisma.session.create({
      data,
    });
  }

  async findByTokenHash(sessionTokenHash: string) {
    return prisma.session.findUnique({
      where: {
        sessionTokenHash,
      },
      include: {
        user: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.session.delete({
      where: {
        id,
      },
    });
  }

  async deleteAllByUserId(userId: string) {
    return prisma.session.deleteMany({
      where: {
        userId,
      },
    });
  }

  async deleteExpiredSessions() {
    return prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}

export const sessionRepository = new SessionRepository();