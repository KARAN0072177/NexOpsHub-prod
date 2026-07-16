import { prisma } from "@/shared/database/prisma.js";
import { hashVerificationToken } from "@/shared/utils/token.js";

import { pendingUserRepository } from "../repositories/pending-user.repository.js";
import { userRepository } from "../repositories/user.repository.js";

import { accountRepository } from "../repositories/account.repository.js";

export class VerifyEmailService {
    async execute(token: string) {
        const verificationTokenHash = hashVerificationToken(token);

        const pendingUser =
            await pendingUserRepository.findByVerificationTokenHash(
                verificationTokenHash
            );

        if (!pendingUser) {
            throw new Error("Invalid or expired verification link.");
        }

        if (pendingUser.expiresAt < new Date()) {
            await pendingUserRepository.delete(pendingUser.id);

            throw new Error("Verification link has expired.");
        }

        await prisma.$transaction(async (tx) => {
            const user = await userRepository.create(
                {
                    email: pendingUser.email,
                    emailVerifiedAt: new Date(),
                }
            );

            await pendingUserRepository.delete(
                pendingUser.id
            );

            await accountRepository.createCredentials({
                userId: user.id,
                passwordHash: pendingUser.passwordHash,
            });

        });

        return {
            success: true,
            message: "Email verified successfully.",
        };
    }
}

export const verifyEmailService = new VerifyEmailService();