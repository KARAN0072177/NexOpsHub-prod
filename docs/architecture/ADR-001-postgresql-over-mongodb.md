# ADR-001: PostgreSQL Over MongoDB

Status: Accepted

Date: 2026-07-05

---

# Context

NexOpsHub contains strongly-related entities:

```text
Organizations
    │
    ├── Members
    ├── Projects
    │      └── Servers
    │              └── Deployments
    │
    ├── Alert Rules
    │
    └── Audit Logs
```

The system requires:

- RBAC
- Multi-tenancy
- Relationships
- Reporting
- Aggregations
- Consistency guarantees

---

# Decision

NexOpsHub will use:

- PostgreSQL
- Prisma ORM

instead of MongoDB.

---

# Rationale

## Advantages

### Strong Relational Modeling

Organizations, memberships, projects, and servers have explicit relationships.

SQL models these naturally.

---

### Better RBAC Queries

Examples:

```sql
SELECT *
FROM memberships
WHERE user_id = ?
AND organization_id = ?;
```

---

### Better Reporting

Examples:

- Deployment statistics
- Audit reports
- Team activity
- Infrastructure summaries

---

### ACID Transactions

Operations like:

```text
Invite User
↓

Create Membership
↓

Create Audit Log
```

should either succeed together or fail together.

PostgreSQL provides this capability.

---

# Alternatives Considered

## MongoDB

Advantages:

- Flexible schemas
- Faster prototyping
- Familiarity from previous projects

Disadvantages:

- Poor relational modeling
- More complicated RBAC queries
- Harder reporting and analytics
- Weaker fit for operational systems

---

# Consequences

The project will adopt:

- SQL-first thinking
- Explicit migrations
- Relational design principles
- Strong entity relationships

Future documentation and implementations should align with this decision.