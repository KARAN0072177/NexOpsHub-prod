export class MeService {
  execute(user: Express.User) {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      username: user.username,
      avatar: user.avatar,
      onboardingCompleted: user.onboardingCompleted,
      emailVerifiedAt: user.emailVerifiedAt,
      createdAt: user.createdAt,
    };
  }
}

export const meService = new MeService();