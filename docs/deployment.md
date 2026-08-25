# Production Deployment Guide

## Overview
This Next.js application is ready for seamless deployment to Vercel, Netlify, Railway, Render, Fly.io, or VPS servers with a managed PostgreSQL database (Neon, Supabase, Railway, or AWS RDS).

## 1. Managed PostgreSQL Database Setup (Neon / Supabase)
1. Create a PostgreSQL database on Neon or Supabase.
2. Obtain connection string: `postgresql://user:password@ep-host.neon.tech/harish_portfolio?sslmode=require`.

## 2. Environment Variables Configuration
Set the following environment variables in your deployment dashboard:

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
SESSION_SECRET="your-strong-random-session-secret-min-32-chars"
ADMIN_USERNAME="harish_admin"
ADMIN_PASSWORD_HASH="$2a$12$KIXe8H4S6qKxR/43WzG87e9QJ.S/E7bX/2GZ0E7q7L4K7lP/Z9HqG"
NEXT_PUBLIC_API_URL="https://yourdomain.com"
```

## 3. Build & Migration Command
Configure deployment build command:
```bash
npx prisma generate && npx prisma db push && npm run build
```

## 4. Database Seeding (First Run)
To populate Harish R's initial portfolio content in production:
```bash
npx tsx prisma/seed.ts
```
