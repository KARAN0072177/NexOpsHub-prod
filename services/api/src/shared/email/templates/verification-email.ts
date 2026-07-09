export function verificationEmailTemplate(
  verificationUrl: string
): string {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width:600px; margin:auto;">
      <h2>Verify your email</h2>

      <p>
        Thank you for registering with <strong>NexOpsHub</strong>.
      </p>

      <p>
        Click the button below to verify your email address.
      </p>

      <p style="margin:32px 0;">
        <a
          href="${verificationUrl}"
          style="
            background:#2563eb;
            color:white;
            text-decoration:none;
            padding:12px 24px;
            border-radius:8px;
            display:inline-block;
          "
        >
          Verify Email
        </a>
      </p>

      <p>
        This link expires in <strong>10 minutes</strong>.
      </p>

      <p>
        If you didn't create this account, you can safely ignore this email.
      </p>
    </div>
  `;
}