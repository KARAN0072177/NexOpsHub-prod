import argon2 from "argon2";

import { userRepository } from "../repositories/user.repository.js";
import { accountRepository } from "../repositories/account.repository.js";

import { sessionService } from "./session.service.js";

const DUMMY_PASSWORD_HASH =
  process.env.DUMMY_PASSWORD_HASH!;

export class LoginService {
  async execute(data: {
    email: string;
    password: string;
  }) {
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
      await argon2.verify(
        DUMMY_PASSWORD_HASH,
        data.password
      ).catch(() => {});

      throw new Error("Invalid email or password.");
    }

    const account =
      await accountRepository.findCredentialsByUserId(
        user.id
      );

    if (!account || !account.passwordHash) {
      await argon2.verify(
        DUMMY_PASSWORD_HASH,
        data.password
      ).catch(() => {});

      throw new Error("Invalid email or password.");
    }

    const validPassword = await argon2.verify(
      account.passwordHash,
      data.password
    );

    if (!validPassword) {
      throw new Error("Invalid email or password.");
    }

    const session =
      await sessionService.create(user.id);

    return {
      user,
      session,
    };
  }
}

export const loginService = new LoginService();