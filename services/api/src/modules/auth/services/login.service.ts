import argon2 from "argon2";

import { accountRepository } from "../repositories/account.repository.js";
import { userRepository } from "../repositories/user.repository.js";

import { sessionService } from "./session.service.js";

export class LoginService {
  async execute(data: {
    email: string;
    password: string;
  }) {
    const dummyPasswordHash = process.env.DUMMY_PASSWORD_HASH || "";

    const invalidCredentialsError = new Error(
      "Invalid email or password."
    );

    /**
     * Find user
     */
    const user = await userRepository.findByEmail(data.email);

    /**
     * Timing attack protection
     */
    if (!user) {
      await argon2
        .verify(dummyPasswordHash, data.password)
        .catch(() => {});

      throw invalidCredentialsError;
    }

    /**
     * Find credentials account
     */
    const account =
      await accountRepository.findCredentialsByUserId(
        user.id
      );

    if (!account || !account.passwordHash) {
      await argon2
        .verify(dummyPasswordHash, data.password)
        .catch(() => {});

      throw invalidCredentialsError;
    }

    /**
     * Verify password
     */
    const passwordValid = await argon2.verify(
      account.passwordHash,
      data.password
    );

    if (!passwordValid) {
      throw invalidCredentialsError;
    }

    /**
     * Create session
     */
    const session = await sessionService.create(
      user.id
    );

    return {
      user,
      session,
    };
  }
}

export const loginService = new LoginService();