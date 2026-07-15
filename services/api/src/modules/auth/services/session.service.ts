import { AUTH } from "@/shared/constants/auth.js";

import {
  generateSessionToken,
  hashSessionToken,
} from "@/shared/utils/session.js";

import { sessionRepository } from "../repositories/session.repository.js";

export class SessionService {
  async create(userId: string) {
    const sessionToken = generateSessionToken();

    const sessionTokenHash = hashSessionToken(sessionToken);

    const expiresAt = new Date();

    expiresAt.setDate(
      expiresAt.getDate() + AUTH.SESSION_DURATION_DAYS
    );

    await sessionRepository.create({
      sessionTokenHash,
      userId,
      expiresAt,
    });

    return {
      sessionToken,
      expiresAt,
    };
  }

  async validate(sessionToken: string) {
    const sessionTokenHash =
      hashSessionToken(sessionToken);

    const session =
      await sessionRepository.findByTokenHash(
        sessionTokenHash
      );

    if (!session) {
      return null;
    }

    if (session.expiresAt < new Date()) {
      await sessionRepository.delete(session.id);
      return null;
    }

    return session.user;
  }

  async destroy(sessionToken: string) {
    const sessionTokenHash =
      hashSessionToken(sessionToken);

    const session =
      await sessionRepository.findByTokenHash(
        sessionTokenHash
      );

    if (!session) {
      return;
    }

    await sessionRepository.delete(session.id);
  }
}

export const sessionService =
  new SessionService();