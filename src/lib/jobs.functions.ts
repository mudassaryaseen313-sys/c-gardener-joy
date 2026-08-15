import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Job } from "./types";

function createAnonClient() {
  const SUPABASE_URL = process.env["SUPABASE_URL"];
  const SUPABASE_PUBLISHABLE_KEY = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("Supabase environment variables are missing");
  }
  // Import dynamically to keep this module client-safe
  const { createClient } = require("@supabase/supabase-js");
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const jobFiltersSchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
});

export const getJobs = createServerFn({ method: "GET" })
  .inputValidator((data) => jobFiltersSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = createAnonClient();
    let query = supabase.from("jobs").select("*").eq("status", "active").order("created_at", { ascending: false });

    if (data.search) {
      query = query.or(`title.ilike.%${data.search}%,company_name.ilike.%${data.search}%`);
    }
    if (data.type && data.type !== "all") {
      query = query.eq("type", data.type);
    }
    if (data.location) {
      query = query.ilike("location", `%${data.location}%`);
    }

    const { data: jobs, error } = await query;
    if (error) throw new Error(error.message);
    return jobs as Job[];
  });

const jobIdSchema = z.object({ id: z.string().uuid() });

export const getJob = createServerFn({ method: "GET" })
  .inputValidator((data) => jobIdSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = createAnonClient();
    const { data: job, error } = await supabase.from("jobs").select("*").eq("id", data.id).single();
    if (error) throw new Error(error.message);
    return job as Job;
  });

const createJobSchema = z.object({
  title: z.string().min(2),
  company_name: z.string().min(1),
  location: z.string().min(1),
  type: z.string().min(1),
  salary_range: z.string().optional(),
  description: z.string().min(10),
  requirements: z.array(z.string()),
  responsibilities: z.array(z.string()).default([]),
});

export const createJob = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => createJobSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: job, error } = await context.supabase
      .from("jobs")
      .insert({
        posted_by: context.userId,
        title: data.title,
        company_name: data.company_name,
        location: data.location,
        type: data.type,
        salary_range: data.salary_range,
        description: data.description,
        requirements: data.requirements,
        responsibilities: data.responsibilities,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return job as Job;
  });

const updateJobSchema = createJobSchema.partial().extend({ id: z.string().uuid() });

export const updateJob = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => updateJobSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, ...updates } = data;
    const { data: job, error } = await context.supabase
      .from("jobs")
      .update(updates)
      .eq("id", id)
      .eq("posted_by", context.userId)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return job as Job;
  });

export const deleteJob = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => jobIdSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("jobs").delete().eq("id", data.id).eq("posted_by", context.userId);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const getMyJobs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: jobs, error } = await context.supabase
      .from("jobs")
      .select("*")
      .eq("posted_by", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return jobs as Job[];
  });
