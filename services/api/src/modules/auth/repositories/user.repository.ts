import { prisma } from "@/shared/database/prisma.js";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: {
  email: string;
  emailVerifiedAt: Date;
}) {
  return prisma.user.create({
    data: {
      email: data.email,
      emailVerifiedAt: data.emailVerifiedAt,
    },
  });
}

}

export const userRepository = new UserRepository();