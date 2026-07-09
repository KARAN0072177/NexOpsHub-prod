# Purpose

Define the technical implementation flow for manual user registration and email verification.

This document translates the authentication ADR into an implementation-ready workflow for the backend.

---

# Background

Authentication and user identity are treated as separate concerns.

A verified email proves ownership of an email address, while the platform identity is established later through username selection.

The system should avoid creating permanent user accounts before email ownership has been verified.

---

# Registration Flow

```
Register
        │
        ▼
Pending User
        │
        ▼
Verification Email
        │
        ▼
Verify Token
        │
        ▼
Create User
        │
        ▼
Username Setup
        │
        ▼
Create Personal Organization
        │
        ▼
Create OWNER Membership
        │
        ▼
Automatic Sign In
        │
        ▼
Dashboard
```

---

# Registration Form

The registration page collects only authentication credentials.

Fields:

- Email
- Password
- Confirm Password

Username is intentionally excluded from the registration form.

---

# Pending User

Before email verification, registration data is stored inside a temporary PendingUser entity.

Example fields:

- id
- email
- passwordHash
- verificationTokenHash
- expiresAt
- createdAt

Pending users are temporary records and never represent platform identities.

---

# Email Verification

After successful registration:

- A verification email is generated.
- Verification link expires after 10 minutes.
- Verification links are single-use.
- Expired or previously used links are rejected.

For security reasons, registration responses never reveal whether an email already exists.

Example response:

> If the information provided is valid, you'll receive an email shortly.

---

# User Creation

The permanent User record is created **only after** successful email verification.

This ensures the User table contains only verified identities.

---

# Username Setup

Immediately after verification, users complete identity onboarding.

Username requirements:

- Unique across the platform
- Lowercase
- 3–30 characters
- Letters, numbers and underscores only
- Reserved usernames prohibited

Username validation occurs before account onboarding continues.

---

# Organization Onboarding

After username selection:

- Personal Organization is automatically created.
- User becomes the OWNER of the organization.
- Initial membership is created.

This completes the onboarding process.

---

# Authentication

After onboarding completes successfully:

- User is automatically signed in.
- Active database session is created.
- User is redirected to the dashboard.

A second login is not required.

---

# Security Considerations

- Permanent users are never created before email verification.
- Pending registrations automatically expire.
- Verification tokens are single-use.
- Registration responses are intentionally generic to reduce user enumeration.
- Passwords are stored only as secure hashes.

---

# Outcome

The authentication system separates authentication from user identity while ensuring that only verified users become permanent platform accounts.

This design minimizes orphan accounts, improves security, and provides a clean onboarding experience aligned with the platform architecture.