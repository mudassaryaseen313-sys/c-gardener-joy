-- Role enum for RBAC
CREATE TYPE public.app_role AS ENUM ('admin', 'employer', 'candidate');

-- User roles table (separate from profiles per security guidance)
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

GRANT SELECT, INSERT, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can insert own roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Security definer helper to check roles without recursion
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Profiles table
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    role public.app_role NOT NULL DEFAULT 'candidate',
    full_name text,
    headline text,
    bio text,
    location text,
    skills text[] DEFAULT '{}',
    experience_years integer,
    expected_salary text,
    resume_url text,
    avatar_url text,
    is_public boolean DEFAULT true,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are readable by everyone"
ON public.profiles
FOR SELECT
TO anon, authenticated
USING (is_public = true);

CREATE POLICY "Users can read own profile even if private"
ON public.profiles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- Jobs table
CREATE TABLE public.jobs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    posted_by uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    company_name text,
    location text,
    type text NOT NULL DEFAULT 'full-time',
    salary_range text,
    description text NOT NULL,
    requirements text[] DEFAULT '{}',
    responsibilities text[] DEFAULT '{}',
    status text NOT NULL DEFAULT 'active',
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.jobs TO authenticated;
GRANT SELECT ON public.jobs TO anon;
GRANT ALL ON public.jobs TO service_role;

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active jobs are readable by everyone"
ON public.jobs
FOR SELECT
TO anon, authenticated
USING (status = 'active');

CREATE POLICY "Employers can read own inactive jobs"
ON public.jobs
FOR SELECT
TO authenticated
USING (posted_by = auth.uid());

CREATE POLICY "Employers can insert jobs"
ON public.jobs
FOR INSERT
TO authenticated
WITH CHECK (posted_by = auth.uid());

CREATE POLICY "Employers can update own jobs"
ON public.jobs
FOR UPDATE
TO authenticated
USING (posted_by = auth.uid())
WITH CHECK (posted_by = auth.uid());

CREATE POLICY "Employers can delete own jobs"
ON public.jobs
FOR DELETE
TO authenticated
USING (posted_by = auth.uid());

-- Applications table
CREATE TABLE public.applications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
    candidate_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    cover_note text,
    status text NOT NULL DEFAULT 'pending',
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE (job_id, candidate_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidates can read own applications"
ON public.applications
FOR SELECT
TO authenticated
USING (candidate_id = auth.uid());

CREATE POLICY "Employers can read applications for their jobs"
ON public.applications
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.jobs
        WHERE jobs.id = applications.job_id
          AND jobs.posted_by = auth.uid()
    )
);

CREATE POLICY "Candidates can apply to jobs"
ON public.applications
FOR INSERT
TO authenticated
WITH CHECK (candidate_id = auth.uid());

CREATE POLICY "Candidates can update own applications"
ON public.applications
FOR UPDATE
TO authenticated
USING (candidate_id = auth.uid())
WITH CHECK (candidate_id = auth.uid());

CREATE POLICY "Employers can update applications for their jobs"
ON public.applications
FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.jobs
        WHERE jobs.id = applications.job_id
          AND jobs.posted_by = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.jobs
        WHERE jobs.id = applications.job_id
          AND jobs.posted_by = auth.uid()
    )
);
