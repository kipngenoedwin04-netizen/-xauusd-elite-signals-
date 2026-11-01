
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signUp(formData: FormData) {
  const displayName = String(formData.get("display_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (
    displayName.length < 2 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    password.length < 8
  ) {
    redirect("/auth/register?error=Check+your+details.+Password+must+be+at+least+8+characters.");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  });

  if (error) {
    redirect(`/auth/register?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/auth/login?message=Account+created.+Check+your+email+if+confirmation+is+enabled.");
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/auth/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

// Change password for an authenticated member
export async function changePassword(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  if (password.length < 8) {
    redirect("/settings?error=Password+must+be+at+least+8+characters.");
  }

  if (password !== confirmPassword) {
    redirect("/settings?error=Passwords+do+not+match.");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect(`/settings?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/settings?message=Password+updated+successfully.");
}

// Request a password reset email
export async function requestPasswordReset(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    redirect("/auth/forgot-password?error=Enter+a+valid+email+address.");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    redirect(`/auth/forgot-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/auth/forgot-password?message=If+the+account+exists,+a+reset+email+has+been+sent.");
}
