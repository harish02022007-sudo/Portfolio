# Database Architecture & Entity Relational Schema

## Database Provider
- **Production**: PostgreSQL (Neon, Supabase, Railway, Render, or VPS PostgreSQL instance).
- **Development**: Managed using **Prisma ORM** (`prisma/schema.prisma`).

## Relational Entities & Definitions

### 1. `AdminUser`
Stores administrator credentials securely.
- `id` (String, UUID primary key)
- `username` (String, unique)
- `passwordHash` (String, bcrypt 12 rounds)
- `mustChangePassword` (Boolean, default true)
- `lastLogin` (DateTime)

### 2. `Profile`
Stores primary profile details for Harish R.
- `name`, `role`, `tagline`, `biography`, `location`, `focusAreas` (JSON), `profileImage`, `resumeUrl`, `availability`.

### 3. `Education` & `TimelineEntry`
- `institution`, `degree`, `field`, `semester`, `startYear`, `endYear`, `cgpa`, `description`, `orderIndex`.

### 4. `SkillCategory` & `Skill`
- `name`, `category`, `level` (Strong, Intermediate, Learning), `icon`, `description`, `isFocusArea`, `relatedProjects`, `orderIndex`.

### 5. `Project`
Stores rich case studies and interactive pipeline steps.
- `title`, `subtitle`, `description`, `problem`, `solution`, `features` (JSON), `technology` (JSON), `architecture`, `results`, `githubUrl`, `liveDemoUrl`, `images` (JSON), `videos` (JSON), `pipeline` (JSON), `tags` (JSON), `status` (DRAFT / PUBLISHED / ARCHIVED), `isFeatured`, `orderIndex`.

### 6. `Research`
- `title`, `question`, `description`, `approach`, `currentStatus`, `futureDirection`, `tags`, `status`, `orderIndex`.

### 7. `Achievement`, `Hackathon`, `Certification`
- Competitions, credentials, issue dates, validation links, order indexes.

### 8. `SocialLink`, `MediaItem`, `SiteSetting`
- Site configuration JSON payloads, social platform URLs, file upload metadata.
