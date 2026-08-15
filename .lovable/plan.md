# Job Marketplace Build Plan

## Goal
A warm, minimal full-stack job marketplace where employers post jobs and candidates create profiles, with one-click discovery and application.

## Scope
- Full marketplace (not just a landing page).
- General audience: all industries and regions.
- Visual style: minimal & warm (orange primary, cream backgrounds, warm neutrals).

## Technical Foundation
1. Enable Lovable Cloud (Supabase) for auth, database, and storage.
2. Update `src/styles.css` with a warm semantic design system.
3. Replace the placeholder `src/routes/index.tsx` with a real landing page.
4. Build a shared site layout in `src/routes/__root.tsx` with navigation and footer.

## Database Schema
- `public.profiles` — user profiles with role (candidate/employer), name, headline, bio, skills, location, resume_url, avatar_url.
- `public.jobs` — job postings with title, description, requirements, location, type, salary, status, posted_by.
- `public.applications` — job applications linking candidate and job, with cover note and status.
- `public.user_roles` — role-based access control using `app_role` enum and `has_role` security definer.
- RLS policies so users can only read/write what they own, plus public read for active jobs and candidate public profiles.

## Routes & Features
- `/` — Landing page with hero, how it works, featured jobs, featured candidates, CTA.
- `/jobs` — Browse/search/filter active jobs.
- `/jobs/$id` — Job detail with one-click apply (for candidates) and edit/close (for owner).
- `/post-job` — Form for employers to create a job.
- `/candidates` — Browse candidate profiles with search/filter.
- `/candidates/$id` — Candidate profile detail.
- `/profile` — Create/edit own profile (candidate or employer).
- `/dashboard` — Overview of posted jobs and applications for the logged-in user.
- `/auth` — Sign up / log in.

## Server Functions
- CRUD for jobs, profiles, applications using `createServerFn`.
- Public read endpoints for active jobs and public profiles.
- Protected writes via `requireSupabaseAuth` middleware.

## Verification
- Build passes.
- Preview shows the landing page and navigation.
- Auth flow and at least one job/candidate CRUD path is smoke-tested.
