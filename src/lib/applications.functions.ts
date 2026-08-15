import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Application } from "./types";

const applySchema = z.object({
  job_id: z.string().uuid(),
  cover_note: z.string().optional(),
});

export const applyToJob = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => applySchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: application, error } = await context.supabase
      .from("applications")
      .insert({
        job_id: data.job_id,
        candidate_id: context.userId,
        cover_note: data.cover_note,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return application as Application;
  });

export const getMyApplications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: applications, error } = await context.supabase
      .from("applications")
      .select("*, jobs(*)")
      .eq("candidate_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return applications as Application[];
  });

const jobApplicationsSchema = z.object({ job_id: z.string().uuid() });

export const getApplicationsForJob = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => jobApplicationsSchema.parse(data))
  .handler(async ({ data, context }) => {
    // Verify ownership
    const { data: job, error: jobError } = await context.supabase
      .from("jobs")
      .select("posted_by")
      .eq("id", data.job_id)
      .single();
    if (jobError || job.posted_by !== context.userId) {
      throw new Error("Unauthorized");
    }

    const { data: applications, error } = await context.supabase
      .from("applications")
      .select("*")
      .eq("job_id", data.job_id)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return applications as Application[];
  });

const updateApplicationSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "reviewed", "accepted", "rejected"]),
});

export const updateApplicationStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => updateApplicationSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: application, error } = await context.supabase
      .from("applications")
      .update({ status: data.status })
      .eq("id", data.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return application as Application;
  });
