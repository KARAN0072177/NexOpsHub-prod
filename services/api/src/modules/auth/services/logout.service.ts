import { sessionService } from "./session.service.js";

export class LogoutService {
  async execute(sessionToken: string) {
    await sessionService.destroy(sessionToken);
  }
}

export const logoutService = new LogoutService();