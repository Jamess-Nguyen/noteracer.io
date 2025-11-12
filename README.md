# NoteRacer.io
A “TypeRacer-style” game for learning sight-reading music notes. Built with Next.js (App Router + TypeScript), Zustand (gameplay state), React Query (server state), Prisma + PostgreSQL (DB), and NextAuth (Google) for auth. Deploy-ready on Vercel.

Try it now @ NoteRacer.io !

## Tech Stack
- **Frontend:** Next.js 14+ (App Router), TypeScript, React 19, Tailwind CSS
- **Client State:** Zustand
- **Server State:** TanStack React Query
- **Auth:** NextAuth (Google OAuth)
- **Database/ORM:** PostgreSQL + Prisma
- **Ops/Hosting:** Docker (local Postgres), Vercel (deployment & hosting)

## Features
- Fast, minimal UI for 10-note rounds
- Local guest runs; authenticated runs (DB)
- Google sign-in
- Run history (basic pagination; infinite scroll planned)
- SSR/ISR where it helps SEO
- Portable schema via Prisma

## Env Vars
DATABASE_URL="postgresql url"
NEXTAUTH_URL="App URL"
NEXTAUTH_SECRET=">"
GOOGLE_ID=""
GOOGLE_SECRET=""