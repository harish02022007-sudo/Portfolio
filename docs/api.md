# REST API Specification

## Public Endpoints (Unauthenticated, Read-Only)
Public endpoints return only content marked with `status: "PUBLISHED"`.

- `GET /api/public/profile`: Retrieves profile details (name, role, tagline, biography, location, focus areas).
- `GET /api/public/education`: Retrieves academic education entries sorted by `orderIndex`.
- `GET /api/public/timeline`: Retrieves learning trajectory timeline items.
- `GET /api/public/skills`: Retrieves neural skills constellation entries.
- `GET /api/public/projects`: Retrieves published project case studies.
- `GET /api/public/projects/[id]`: Retrieves single project details.
- `GET /api/public/research`: Retrieves active research lab entries.
- `GET /api/public/achievements`: Retrieves published achievements.
- `GET /api/public/hackathons`: Retrieves hackathon records.
- `GET /api/public/certifications`: Retrieves verified certification credentials.
- `GET /api/public/social-links`: Retrieves enabled social channels.
- `GET /api/public/settings`: Retrieves site visual and hero configurations.

## Admin Endpoints (Authenticated)
Require valid `harish_admin_session` HTTP-Only cookie.

- `POST /api/auth/login`: Authenticates username & password, returns JWT session cookie.
- `POST /api/auth/logout`: Clears session cookie.
- `POST /api/auth/change-password`: Updates admin password.
- `GET /api/auth/me`: Checks current session state.
- `GET/PUT /api/admin/profile`: Manage profile details.
- `GET/POST /api/admin/projects`: List or create projects.
- `GET/PUT/DELETE /api/admin/projects/[id]`: Manage single project.
- `GET/POST /api/admin/skills`: List or create skills.
- `GET/PUT/DELETE /api/admin/skills/[id]`: Manage single skill.
- `POST /api/admin/reorder`: Reorders items in database (`entity`: `projects`, `skills`, `education`, `research`, etc.).
- `POST /api/admin/media`: Uploads media file with MIME and size validation.
