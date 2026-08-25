# Testing & Verification Specification

## Test Suite Structure

The application uses **Vitest** for automated unit and integration tests.

### Executing Tests
```bash
npm test
```

## Test Coverage
1. **Password Hashing & Verification**:
   - Asserts `bcrypt` hashes passwords with 12 salt rounds.
   - Verifies match on correct password and rejection on invalid password.
2. **JWT Session Security**:
   - Verifies JWT signing with `SESSION_SECRET`.
   - Asserts token decode accuracy and expiration parameters.
3. **Zod Input Validation**:
   - Tests `/api/auth/login` payload schemas.
   - Tests `Project`, `Skill`, `Research`, `Education`, and `Profile` input validation rules.
4. **Build Verification**:
   - Asserts Next.js production build (`npx next build`) completes cleanly with 0 TypeScript or route errors.
