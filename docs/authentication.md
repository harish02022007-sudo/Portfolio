# Authentication & Session Architecture

## Overview
Administrative access is protected via a JWT session architecture backed by bcrypt password hashing.

## Workflow Sequence
1. **Credentials Input**: User submits username and password at `/admin/login`.
2. **Rate Limiting Check**: IP is checked against in-memory rate limiter (max 5 failed attempts per 15 minutes).
3. **Database Verification**: User record retrieved, password compared via `bcrypt.compare(password, user.passwordHash)`.
4. **JWT Issuance**: On match, a signed JWT containing `userId`, `username`, and `mustChangePassword` is created using `SESSION_SECRET`.
5. **HTTP-Only Cookie**: Token is attached to response as `harish_admin_session` cookie (`httpOnly: true`, `sameSite: 'strict'`, `secure` in production).
6. **Session Verification**: Route handlers and server components inspect `getAuthSession(req)` to validate access.
7. **Forced First-Login Change**: If `mustChangePassword` flag is true, user is alerted to set a custom password.
