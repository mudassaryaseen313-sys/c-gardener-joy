export type AppRole = "admin" | "employer" | "candidate";

export type Profile = {
  id: string;
  user_id: string;
  role: AppRole;
  full_name: string | null;
  headline: string | null;
  bio: string | null;
  location: string | null;
  skills: string[];
  experience_years: number | null;
  expected_salary: string | null;
  resume_url: string | null;
  avatar_url: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type Job = {
  id: string;
  posted_by: string;
  title: string;
  company_name: string | null;
  location: string | null;
  type: string;
  salary_range: string | null;
  description: string;
  requirements: string[];
  responsibilities: string[];
  status: "active" | "closed" | "draft";
  created_at: string;
  updated_at: string;
};

export type Application = {
  id: string;
  job_id: string;
  candidate_id: string;
  cover_note: string | null;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  created_at: string;
  updated_at: string;
  job?: Job;
};
