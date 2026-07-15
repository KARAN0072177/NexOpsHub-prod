import argon2 from "argon2";

import { pendingUserRepository } from "../repositories/pending-user.repository.js";
import { userRepository } from "../repositories/user.repository.js";

import {
    generateVerificationToken,
    hashVerificationToken,
} from "@/shared/utils/token.js";

import { addMinutes } from "@/shared/utils/date.js";

import { emailService } from "@/shared/email/index.js";

export class RegisterService {
    async execute(data: {
        email: string;
        password: string;
    }) {
        // Check if a verified user already exists
        const existingUser = await userRepository.findByEmail(data.email);

        if (existingUser) {
            return {
                success: true,
                message:
                    "If the information provided is valid, you'll receive an email shortly.",
            };
        }

        // Hash password
        const passwordHash = await argon2.hash(data.password);

        // Generate verification token
        const verificationToken = generateVerificationToken();

        const verificationTokenHash =
            hashVerificationToken(verificationToken);

        const verificationExpiresAt = addMinutes(
            Number(process.env.REGISTER_TOKEN_EXPIRES_MINUTES ?? 10)
        );

        const verificationUrl =
            `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

        // Check pending registration
        const pendingUser = await pendingUserRepository.findByEmail(data.email);

        if (pendingUser) {
            await pendingUserRepository.updateVerification({
                email: data.email,
                passwordHash,
                verificationTokenHash,
                expiresAt: verificationExpiresAt,
            });
        } else {
            await pendingUserRepository.create({
                email: data.email,
                passwordHash,
                verificationTokenHash,
                expiresAt: verificationExpiresAt,
            });
        }

        await emailService.sendVerificationEmail({
            email: data.email,
            verificationUrl,
        });

        return {
            success: true,
            message:
                "If the information provided is valid, you'll receive an email shortly.",
        };
    }
}

export const registerService = new RegisterService();