import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getUserAndProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, profile: null };
  const { data: profile } = await supabase.from("profiles").select("id, display_name, role, premium_status").eq("id", user.id).maybeSingle();
  return { supabase, user, profile };
}

export async function requireUser() {
  const result = await getUserAndProfile();
  if (!result.user) redirect("/auth/login");
  return result as typeof result & { user: NonNullable<typeof result.user> };
}

export async function requireAdmin() {
  const result = await requireUser();
  if (result.profile?.role !== "admin") redirect("/dashboard?error=admin-only");
  return result;
}
