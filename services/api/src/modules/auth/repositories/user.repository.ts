import { prisma } from "@/shared/database/prisma.js";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.users.findUnique({
      where: {
        email,
      },
    });
  }
}

export const userRepository = new UserRepository();