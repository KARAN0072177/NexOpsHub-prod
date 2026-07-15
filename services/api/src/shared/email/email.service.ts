import { Resend } from "resend";

import { verificationEmailTemplate } from "./templates/verification-email.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
  async sendVerificationEmail(data: {
    email: string;
    verificationUrl: string;
  }): Promise<void> {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: data.email,
      subject: "Verify your NexOpsHub account",
      html: verificationEmailTemplate(data.verificationUrl),
    });
  }
}

export const emailService = new EmailService();