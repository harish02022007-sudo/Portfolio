# Harish R — Interactive AI Portfolio & Personal CMS

> **Production-grade personal portfolio platform and secure private CMS for Harish R (Machine Learning Engineer, Coimbatore, Tamil Nadu, India).**
> Designed with a futuristic dark "AI Research Laboratory + Digital Universe" aesthetic built with Next.js 14 App Router, Three.js / React Three Fiber, GSAP, Tailwind CSS, Prisma ORM with PostgreSQL, JWT session security, and dynamic REST APIs.

---

## 🌟 Primary Features

### 🚀 Public Digital Universe & Portfolio
- **8 Cinematic Storytelling Scenes**:
  - **01 / INTRO**: Starfield activation, central glowing AI core, custom tagline, magnetic CTAs.
  - **02 / IDENTITY**: Harish R biography, B.Tech AI & ML details (Sri Shakthi Institute of Engineering and Technology, CGPA 7.8), research focus matrix, resume download.
  - **03 / JOURNEY**: Interactive education timeline and trajectory from 2022 to 2026.
  - **04 / SKILLS CONSTELLATION**: Filterable matrix categorized into Strong (Python, Machine Learning, OpenCV), Intermediate (Deep Learning, NLP), and Learning (LLMs, Agentic AI).
  - **05 / PROJECT CASE STUDIES**: Featured case study (**VideoSense AI**) with 7-stage interactive multimodal pipeline (`VIDEO` $\rightarrow$ `FRAME EXTRACTION` $\rightarrow$ `VISION MODEL` $\rightarrow$ `OCR` $\rightarrow$ `SPEECH PROCESSING` $\rightarrow$ `LLM` $\rightarrow$ `SEMANTIC SEARCH`).
  - **06 / TECHNICAL RESEARCH LAB**: Holographic research cards covering multimodal neural ingestion and agentic reasoning questions.
  - **07 / ACHIEVEMENTS & CERTIFICATIONS**: Wall of hackathon records and verified credentials.
  - **08 / MISSION CONTROL CONTACT**: High-tech transmission terminal with direct connection sequence and social links.
- **3D Interactive Environment**: Three.js + React Three Fiber starfields, pulsing AI energy core, floating neural section nodes with mouse parallax and smooth camera travel.
- **Micro-interactions & Aesthetics**: Custom dual-ring luminous cursor with trail and contextual state, magnetic spring buttons, HUD indicators (`01 / 07`), performance toggle (`VISUAL MODE` vs `PERFORMANCE MODE`).

### 🔐 Secure Admin CMS (`/admin`)
- **Protected Gateway**: Protected `/admin/login` interface with bcrypt password hashing, HTTP-Only JWT cookies, and IP rate limiting.
- **Full CRUD Management**: Profile, Projects (case studies & pipeline steps), Skills, Education, Research, Achievements, Hackathons, Certifications, Social Links, Site Settings, Media Uploads.
- **Ordering & Statuses**: Transaction-based drag-and-drop ordering, Draft / Published / Archived content visibility.
- **Security Center**: Forced first-login password update, session information, and password modification.
- **Live Preview Mode**: Modal drawer to inspect draft changes live before publishing.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router, Server Actions, Route Handlers, TypeScript) |
| **Styling & UI** | Tailwind CSS, Custom Glassmorphism, Monospace HUD Tokens, Lucide Icons |
| **3D & Animation** | Three.js, `@react-three/fiber`, `@react-three/drei`, GSAP, Framer Motion |
| **Database** | **PostgreSQL** schema managed with **Prisma ORM** (dual SQLite/PostgreSQL local dev adapter) |
| **Authentication** | bcrypt password hashing, HTTP-Only JWT cookies, Zod validation |
| **Testing** | Vitest unit and integration test runner |

---

## 📁 Repository Folder Structure

```
Portfolio/
├── docs/                      # Comprehensive technical SE documentation
│   ├── architecture.md
│   ├── database.md
│   ├── api.md
│   ├── authentication.md
│   ├── security.md
│   ├── ui-ux.md
│   ├── animations.md
│   ├── deployment.md
│   └── testing.md
├── prisma/
│   ├── schema.prisma          # PostgreSQL relational schema
│   └── seed.ts                # Database seed script for Harish R
├── src/
│   ├── app/
│   │   ├── admin/             # Admin CMS routes (/admin, /admin/login)
│   │   ├── api/               # Public & Admin REST API handlers
│   │   ├── globals.css        # Visual design tokens & glassmorphism
│   │   ├── layout.tsx         # SEO metadata & root layout
│   │   └── page.tsx           # Public storytelling homepage
│   ├── components/
│   │   ├── 3d/                # Three.js / R3F Canvas, StarField, AICore, NeuralNodes
│   │   ├── admin/             # Admin CMS Dashboard components
│   │   ├── sections/          # 8 Public Storytelling Scenes (Scene01 to Scene08)
│   │   └── ui/                # HUDLabel, MagneticButton, CustomCursor, Navigation, etc.
│   ├── lib/
│   │   ├── auth.ts            # JWT, bcrypt, rate limiter & session helpers
│   │   ├── db.ts              # Singleton Prisma client instance
│   │   └── validations.ts     # Zod validation schemas
├── tests/                     # Vitest unit tests
├── .env.example               # Environment variable specification template
├── next.config.js             # Next.js configuration
├── package.json
└── tsconfig.json
```

---

## ⚙️ Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Initialize & Seed Database
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public 3D portfolio and [http://localhost:3000/admin](http://localhost:3000/admin) for the Admin CMS.

*Default Admin Credentials:*
- **Username**: `harish_admin`
- **Password**: `AdminPassword123!` *(You will be prompted to update this upon first login)*

---

## 🧪 Testing

Run Vitest unit and validation tests:
```bash
npm test
```

---

## 🔒 Security Architecture
- Public REST APIs return only items with `status: "PUBLISHED"`.
- Admin endpoints strictly enforce session validation via `getAuthSession()`.
- Password hashes use bcrypt with 12 salt rounds.
- Brute-force protection limits failed login attempts to 5 per 15-minute window per IP.
