# Core Domain Entities

This document defines the foundational business entities of NexOpsHub.

These definitions act as the source of truth before database schemas or APIs are implemented.

---

# User

Represents an individual account.

Fields:

```text
id
email
username
avatar
created_at
updated_at
```

Relationships:

```text
User
 └── Memberships
        └── Organizations
```

---

# Organization

Represents a workspace or company.

Examples:

```text
Acme Corp

DevLabs

AOIE Studio
```

Fields:

```text
id
name
slug
created_at
updated_at
```

Relationships:

```text
Organization
 ├── Members
 ├── Projects
 ├── Alert Rules
 └── Audit Logs
```

---

# Membership

Connects users to organizations.

Fields:

```text
user_id
organization_id
role
joined_at
```

Roles:

```text
OWNER

DEVELOPER

VIEWER
```

---

# Project

Represents a deployable application or service.

Fields:

```text
id
organization_id
name
description
created_at
```

Relationships:

```text
Project
 └── Servers
```

Examples:

```text
frontend-app

backend-api

worker-service
```

---

# Server

Represents infrastructure resources.

Examples:

```text
Production EC2

Staging VM

Docker Host
```

Fields:

```text
id
project_id
name
hostname
ip_address
environment
status
created_at
```

Environments:

```text
development

staging

production
```

---

# Deployment

Represents deployment activity.

Fields:

```text
id
server_id
version
commit_hash
triggered_by
status
started_at
completed_at
```

Statuses:

```text
PENDING

RUNNING

SUCCESS

FAILED
```

---

# Audit Log

Tracks important system events.

Examples:

```text
USER_INVITED

SERVER_DELETED

ROLE_CHANGED

DEPLOYMENT_STARTED

DEPLOYMENT_FAILED
```

Fields:

```text
id
organization_id
actor_id
event_type
metadata
created_at
```

---

# Future Entities

The following entities are intentionally postponed:

```text
AlertRule

AlertInstance

Container

MonitoringMetric

NotificationChannel

AgentRegistration
```

These belong to later phases of development.