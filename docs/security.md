# Security Engineering & Protection Guidelines

## Key Protections Implemented
1. **Password Hashing**: Passwords stored exclusively as bcrypt hashes (12 salt rounds).
2. **Brute-Force Rate Limiting**: `/api/auth/login` rate limiter restricts failed login attempts to 5 per 15-minute window per IP address.
3. **Zod Input Sanitization**: Server-side validation schema applied to all input payloads.
4. **Content Security & Isolation**: Public APIs strictly isolate draft/archived records.
5. **Media Upload Security**: Media handler (`/api/admin/media`) enforces strict MIME-type checking (`image/jpeg`, `image/png`, `image/webp`, `video/mp4`, `application/pdf`) and max 15MB file size limit. Executables are rejected.
6. **CSRF & Cookie Protection**: HTTP-Only cookies with `SameSite=Strict`.
7. **Secrets Management**: Credentials managed exclusively via environment variables (`.env`). No hardcoded secrets in source control.
