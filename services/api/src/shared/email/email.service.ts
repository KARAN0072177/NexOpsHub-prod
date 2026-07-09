import { Resend } from "resend";

import { verificationEmailTemplate } from "./templates/verification-email.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
  async sendVerificationEmail(
    email: string,
    token: string
  ): Promise<void> {
    const verificationUrl =
      `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "Verify your NexOpsHub account",
      html: verificationEmailTemplate(verificationUrl),
    });
  }
}

export const emailService = new EmailService();