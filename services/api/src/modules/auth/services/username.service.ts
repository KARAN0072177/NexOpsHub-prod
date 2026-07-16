import { Prisma } from "@prisma/client";

import { prisma } from "@/shared/database/prisma.js";

import { userRepository } from "../repositories/user.repository.js";

const RESERVED_USERNAMES = [
  "admin",
  "root",
  "support",
  "help",
  "api",
  "auth",
  "login",
  "logout",
  "register",
  "dashboard",
  "settings",
];

export class UsernameService {
  async execute(data: {
    userId: string;
    username: string;
  }) {
    const username = data.username.trim().toLowerCase();

    /**
     * Reserved usernames
     */
    if (RESERVED_USERNAMES.includes(username)) {
      throw new Error("Username is unavailable.");
    }

    /**
     * User exists?
     */
    const user = await userRepository.findById(data.userId);

    if (!user) {
      throw new Error("User not found.");
    }

    /**
     * Already onboarded?
     */
    if (user.onboardingCompleted) {
      throw new Error("Onboarding already completed.");
    }

    /**
     * Username already taken?
     */
    const existingUser =
      await userRepository.findByUsername(username);

    if (existingUser) {
      throw new Error("Username is unavailable.");
    }

    /**
     * Personal organization
     */
    const organizationName =
      `${username}'s Workspace`;

    const organizationSlug = username;

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          username,
          onboardingCompleted: true,
        },
      });

      const organization =
        await tx.organization.create({
          data: {
            name: organizationName,
            slug: organizationSlug,
          },
        });

      await tx.membership.create({
        data: {
          userId: updatedUser.id,
          organizationId: organization.id,
          role: "OWNER",
        },
      });
    });

    return {
      success: true,
    };
  }
}

export const usernameService =
  new UsernameService();