import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Profile } from "./types";

function createAnonClient() {
  const SUPABASE_URL = process.env["SUPABASE_URL"];
  const SUPABASE_PUBLISHABLE_KEY = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("Supabase environment variables are missing");
  }
  const { createClient } = require("@supabase/supabase-js");
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const profileFiltersSchema = z.object({
  search: z.string().optional(),
  role: z.enum(["candidate", "employer"]).optional(),
});

export const getProfiles = createServerFn({ method: "GET" })
  .inputValidator((data) => profileFiltersSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = createAnonClient();
    let query = supabase.from("profiles").select("*").eq("is_public", true).order("created_at", { ascending: false });

    if (data.role) {
      query = query.eq("role", data.role);
    }
    if (data.search) {
      query = query.or(
        `full_name.ilike.%${data.search}%,headline.ilike.%${data.search}%,skills.cs.{${data.search}}`
      );
    }

    const { data: profiles, error } = await query;
    if (error) throw new Error(error.message);
    return profiles as Profile[];
  });

const profileIdSchema = z.object({ id: z.string().uuid() });

export const getProfile = createServerFn({ method: "GET" })
  .inputValidator((data) => profileIdSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = createAnonClient();
    const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", data.id).single();
    if (error) throw new Error(error.message);
    return profile as Profile;
  });

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: profile, error } = await context.supabase
      .from("profiles")
      .select("*")
      .eq("user_id", context.userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return profile as Profile | null;
  });

const upsertProfileSchema = z.object({
  role: z.enum(["candidate", "employer"]),
  full_name: z.string().min(1),
  headline: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).default([]),
  experience_years: z.number().int().min(0).optional(),
  expected_salary: z.string().optional(),
  resume_url: z.string().url().optional(),
  avatar_url: z.string().url().optional(),
  is_public: z.boolean().default(true),
});

export const upsertProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => upsertProfileSchema.parse(data))
  .handler(async ({ data, context }) => {
    // Ensure user role exists
    const { error: roleError } = await context.supabase
      .from("user_roles")
      .upsert({ user_id: context.userId, role: data.role }, { onConflict: "user_id,role" });
    if (roleError) throw new Error(roleError.message);

    const { data: profile, error } = await context.supabase
      .from("profiles")
      .upsert(
        {
          user_id: context.userId,
          role: data.role,
          full_name: data.full_name,
          headline: data.headline,
          bio: data.bio,
          location: data.location,
          skills: data.skills,
          experience_years: data.experience_years,
          expected_salary: data.expected_salary,
          resume_url: data.resume_url,
          avatar_url: data.avatar_url,
          is_public: data.is_public,
        },
        { onConflict: "user_id" }
      )
      .select()
      .single();
    if (error) throw new Error(error.message);
    return profile as Profile;
  });
