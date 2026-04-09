# Architecture

## System Overview

[2-3 sentences: what the system does at a high level and how it's structured]

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend   │────▶│   Backend   │────▶│  Database   │
│   [tech]     │◀────│   [tech]    │◀────│  [tech]     │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Route / Page Architecture

| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/` | [Landing / Home] | No |
| `/login` | [Authentication] | No |
| `/dashboard` | [Main app view] | Yes |
| `/[resource]` | [Resource management] | Yes |
| `/admin` | [Admin panel] | Yes (admin) |

## Database Schema

### [Table 1: e.g., users]

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK, default gen | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | |
| password_hash | VARCHAR(255) | NOT NULL | bcrypt |
| name | VARCHAR(255) | NOT NULL | |
| role | ENUM | DEFAULT 'user' | user, admin |
| created_at | TIMESTAMP | DEFAULT NOW() | |

### [Table 2: e.g., resources]

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | |
| [field] | [type] | [constraints] | [notes] |

### Relationships

```
users 1──▶ N resources     (user_id FK)
users 1──▶ N sessions      (user_id FK)
[entity] N──▶ N [entity]   (join table: [name])
```

## Component Architecture

### Shared / Layout Components
- `Layout` — App shell with nav, sidebar, footer
- `AuthGuard` — Route protection wrapper
- [Component] — [Purpose]

### Feature Components
- `[FeatureName]` — [What it does, where it's used]
- `[FeatureName]` — [What it does, where it's used]

### UI Primitives
- `Button`, `Input`, `Card`, `Modal` — [Library or custom]

## Authentication Flow

```
1. User submits credentials → POST /api/auth/login
2. Server validates → creates session/JWT
3. Token stored in [httpOnly cookie / localStorage]
4. Protected routes check token via [middleware/guard]
5. Token refresh: [strategy]
```

## API Design

### Convention
- REST / [other pattern]
- Base path: `/api/v1/`
- Auth: [Bearer token / Cookie / etc.]
- Errors: `{ error: string, code: string, details?: object }`

### Key Endpoints

| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| POST | `/api/auth/login` | Authenticate user | No |
| POST | `/api/auth/register` | Create account | No |
| GET | `/api/[resource]` | List resources | Yes |
| POST | `/api/[resource]` | Create resource | Yes |
| PUT | `/api/[resource]/:id` | Update resource | Yes |
| DELETE | `/api/[resource]/:id` | Delete resource | Yes |

## Deployment Architecture

```
[Hosting provider]
├── [Web server / reverse proxy]
│   └── [App runtime]
├── [Database service]
└── [Other services: cache, queue, etc.]
```

### Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `DATABASE_URL` | DB connection string | Yes |
| `[SECRET_KEY]` | [Purpose] | Yes |
| `[API_KEY]` | [Purpose] | [Yes/No] |

## Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| [ORM vs raw SQL] | [Choice] | [Why] |
| [Auth strategy] | [Choice] | [Why] |
| [Styling approach] | [Choice] | [Why] |
| [State management] | [Choice] | [Why] |

## Control Panel (if applicable)

### Convention Files
| File | Purpose | Maintained By |
|------|---------|--------------|
| `deployment.json` | Service registry with health endpoints | AI coder (on deploy changes) |
| `static-data/*.json` | Option sets for forms and dropdowns | Human (via dashboard) or AI |
| `[flow-registry-path]` | Automation flow declarations | AI coder (on new automations) |
| `USER_JOURNEYS.json` | Interactive test checklists | AI coder (on new features) |

### Control Panel Routes
| Route | Purpose | Auth |
|-------|---------|------|
| `/admin/control-panel` | Dashboard with tabs | Admin |
| `/api/health` | App health check | None |
| `/api/control-panel/deployment` | Service health aggregator | Admin |
| `/api/control-panel/schema` | Database introspection | Admin |
| `/api/control-panel/data/[collection]` | Data browser CRUD | Admin |
| `/api/control-panel/security` | Security scan runner | Admin |
| `/api/control-panel/automations` | Flow execution logs | Admin |
| `/api/control-panel/journeys` | Test journey definitions | Admin |

### Registered Automation Flows
| Flow ID | Trigger | Steps | File |
|---------|---------|-------|------|
| [flow-id] | [trigger description] | [count] | [source file path] |
