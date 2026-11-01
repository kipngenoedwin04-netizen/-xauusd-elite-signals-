
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const APP_URL = "https://xauusd-elite-signals-ckyc.vercel.app";

// CREATE ACCOUNT
export async function signUp(formData: FormData) {
  const displayName = String(
    formData.get("display_name") ?? ""
  ).trim();

  const email = String(
    formData.get("email") ?? ""
  ).trim().toLowerCase();

  const password = String(
    formData.get("password") ?? ""
  );

  if (
    displayName.length < 2 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    password.length < 8
  ) {
    redirect(
      "/auth/register?error=Check+your+details.+Password+must+be+at+least+8+characters."
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName },
    },
  });

  if (error) {
    redirect(
      `/auth/register?error=${encodeURIComponent(error.message)}`
    );
  }

  redirect(
    "/auth/login?message=Account+created.+Check+your+email+if+confirmation+is+enabled."
  );
}

// MEMBER LOGIN
export async function signIn(formData: FormData) {
  const email = String(
    formData.get("email") ?? ""
  ).trim().toLowerCase();

  const password = String(
    formData.get("password") ?? ""
  );

  if (!/^\S+@\S+\.\S+$/.test(email) || !password) {
    redirect("/auth/login?error=Enter+valid+login+details.");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(
      `/auth/login?error=${encodeURIComponent(error.message)}`
    );
  }

  redirect("/dashboard");
}

// LOGOUT
export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/");
}

// CHANGE PASSWORD
export async function changePassword(formData: FormData) {
  const password = String(
    formData.get("password") ?? ""
  );

  const confirmPassword = String(
    formData.get("confirm_password") ?? ""
  );

  if (password.length < 8) {
    redirect(
      "/settings?error=Password+must+be+at+least+8+characters."
    );
  }

  if (password !== confirmPassword) {
    redirect(
      "/settings?error=Passwords+do+not+match."
    );
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/auth/login");
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    redirect(
      `/settings?error=${encodeURIComponent(error.message)}`
    );
  }

  redirect(
    "/settings?message=Password+updated+successfully."
  );
}

// REQUEST PASSWORD RESET EMAIL
export async function requestPasswordReset(formData: FormData) {
  const email = String(
    formData.get("email") ?? ""
  ).trim().toLowerCase();

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    redirect(
      "/auth/forgot-password?error=Enter+a+valid+email+address."
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: `${APP_URL}/auth/reset-password`,
    }
  );

  if (error) {
    redirect(
      `/auth/forgot-password?error=${encodeURIComponent(error.message)}`
    );
  }

  redirect(
    "/auth/forgot-password?message=Check+your+email+for+the+password+reset+link."
  );
      }
