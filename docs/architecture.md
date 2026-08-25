# Software Architecture Document — Harish R Portfolio & CMS

## High-Level Architecture Overview

The system is constructed as a decoupled, monolithic full-stack application leveraging **Next.js 14 App Router** with TypeScript.

```
+-------------------------------------------------------------------+
|                        Client Browser                             |
|  +--------------------------------+  +-------------------------+  |
|  |  Public 3D Storytelling App    |  |  Admin CMS Dashboard    |  |
|  |  (React 18 + R3F + Three.js)   |  |  (Protected /admin)     |  |
|  +--------------------------------+  +-------------------------+  |
+---------------------------------|---------------------------------+
                                  | HTTP / JSON REST APIs
+---------------------------------v---------------------------------+
|                       Next.js Server API                          |
|  +-----------------------------+  +----------------------------+  |
|  | /api/public/* (Read-Only)   |  | /api/admin/* (Auth Req)    |  |
|  +-----------------------------+  +----------------------------+  |
|  +-----------------------------+  +----------------------------+  |
|  | Zod Validation Middleware   |  | JWT & bcrypt Auth Layer    |  |
|  +-----------------------------+  +----------------------------+  |
+---------------------------------|---------------------------------+
                                  | Prisma ORM
+---------------------------------v---------------------------------+
|                    PostgreSQL Database                            |
|  (AdminUser, Profile, Projects, Skills, Research, Credentials)    |
+-------------------------------------------------------------------+
```

## Key Modules
1. **Presentation Layer**: Next.js App Router (`src/app/page.tsx`, `src/app/admin/page.tsx`).
2. **3D Interactive Space**: `@react-three/fiber` canvas, procedural starfields (`StarField`), wireframe energy core (`AICore`), neural section nodes (`NeuralNodes`).
3. **Data Access Layer**: Prisma ORM singleton (`src/lib/db.ts`) interfacing with PostgreSQL.
4. **Security Layer**: `src/lib/auth.ts` providing bcrypt password hashing, JWT generation, HTTP-Only cookies, and rate-limiting.
