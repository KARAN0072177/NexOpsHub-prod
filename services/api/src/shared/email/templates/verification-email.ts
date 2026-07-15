export function verificationEmailTemplate(
  verificationUrl: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Email Verification</title>
</head>

<body style="font-family:Arial,sans-serif;background:#f8fafc;padding:40px;">

<div
style="
max-width:600px;
margin:auto;
background:white;
padding:32px;
border-radius:12px;
">

<h2>Welcome to NexOpsHub 👋</h2>

<p>
Please verify your email address to activate your account.
</p>

<p style="margin:32px 0;">

<a
href="${verificationUrl}"
style="
background:#2563eb;
color:white;
padding:14px 24px;
border-radius:8px;
text-decoration:none;
display:inline-block;
"
>
Verify Email
</a>

</p>

<p>
This verification link expires in
<strong>10 minutes</strong>.
</p>

<p>
If you didn't create this account,
you can safely ignore this email.
</p>

</div>

</body>
</html>
`;
}