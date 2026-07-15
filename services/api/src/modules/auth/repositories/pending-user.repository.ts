import { prisma } from "@/shared/database/prisma.js";

export class PendingUserRepository {
  async findByEmail(email: string) {
    return prisma.pendingUser.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: {
    email: string;
    passwordHash: string;
    verificationTokenHash: string;
    expiresAt: Date;
  }) {
    return prisma.pendingUser.create({
      data,
    });
  }

  async updateVerification(data: {
    email: string;
    verificationTokenHash: string;
    expiresAt: Date;
    passwordHash: string;
  }) {
    return prisma.pendingUser.update({
      where: {
        email: data.email,
      },
      data: {
        passwordHash: data.passwordHash,
        verificationTokenHash: data.verificationTokenHash,
        expiresAt: data.expiresAt,
      },
    });
  }

  async deleteByEmail(email: string) {
    return prisma.pendingUser.delete({
      where: {
        email,
      },
    });
  }

  async findByVerificationTokenHash(tokenHash: string) {
    return prisma.pendingUser.findFirst({
      where: {
        verificationTokenHash: tokenHash,
      },
    });
  }

  async delete(id: string) {
    return prisma.pendingUser.delete({
      where: {
        id,
      },
    });
  }
}

export const pendingUserRepository = new PendingUserRepository();