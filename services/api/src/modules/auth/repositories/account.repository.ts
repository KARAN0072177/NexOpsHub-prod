import { prisma } from "@/shared/database/prisma.js";

import { AuthProvider } from "@prisma/client";

export class AccountRepository {
  async findCredentialsByUserId(userId: string) {
    return prisma.account.findFirst({
      where: {
        userId,
        provider: AuthProvider.CREDENTIALS,
      },
    });
  }

  async findByProvider(
    provider: AuthProvider,
    providerAccountId: string
  ) {
    return prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async createCredentials(data: {
    userId: string;
    passwordHash: string;
  }) {
    return prisma.account.create({
      data: {
        userId: data.userId,
        provider: AuthProvider.CREDENTIALS,
        providerAccountId: data.userId,
        passwordHash: data.passwordHash,
      },
    });
  }

  async createOAuthAccount(data: {
    userId: string;
    provider: AuthProvider;
    providerAccountId: string;
  }) {
    return prisma.account.create({
      data: {
        userId: data.userId,
        provider: data.provider,
        providerAccountId: data.providerAccountId,
      },
    });
  }
}

export const accountRepository = new AccountRepository();