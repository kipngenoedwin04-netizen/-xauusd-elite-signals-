
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

async function uploadSignalImage(supabase: any, formData: FormData) {
  const image = formData.get("image");

  if (!(image instanceof File) || image.size === 0) return null;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(image.type)) {
    throw new Error("Only JPG, PNG and WEBP images are allowed.");
  }

  if (image.size > 12 * 1024 * 1024) {
    throw new Error("Image must not exceed 12MB.");
  }

  const extension = image.type.split("/")[1];
  const path = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${extension}`;

  const { error } = await supabase.storage
    .from("signal-images")
    .upload(path, image, {
      contentType: image.type,
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage
    .from("signal-images")
    .getPublicUrl(path);

  return data.publicUrl;
}

function signalInput(formData: FormData) {
  const post_type = String(formData.get("post_type") ?? "signal");
  const access = String(formData.get("access") ?? "free");
  const analysis = String(formData.get("analysis") ?? "").trim();
  const timeframe = String(formData.get("timeframe") ?? "").trim();

  if (!["signal", "analysis"].includes(post_type)) {
    throw new Error("Invalid post type.");
  }

  if (!["free", "premium"].includes(access)) {
    throw new Error("Invalid access level.");
  }

  if (analysis.length > 2000) {
    throw new Error("Analysis must not exceed 2000 characters.");
  }

  // Standalone market analysis
  if (post_type === "analysis") {
    if (!analysis) {
      throw new Error("Please enter your market analysis.");
    }

    return {
      post_type: "analysis",
      symbol: "XAUUSD",
      direction: null,
      access: "free",
      entry: null,
      stop_loss: null,
      tp1: null,
      tp2: null,
      timeframe: timeframe || null,
      analysis,
    };
  }

  // Normal trading signal
  const direction = String(formData.get("direction") ?? "");
  const entry = Number(formData.get("entry"));
  const stop_loss = Number(formData.get("stop_loss"));
  const tp1 = Number(formData.get("tp1"));
  const tp2 = Number(formData.get("tp2"));

  if (!["BUY", "SELL"].includes(direction)) {
    throw new Error("Select BUY or SELL.");
  }

  if (!timeframe || timeframe.length > 20) {
    throw new Error("Enter a valid timeframe.");
  }

  if (
    ![entry, stop_loss, tp1, tp2].every(Number.isFinite) ||
    [entry, stop_loss, tp1, tp2].some((v) => v <= 0)
  ) {
    throw new Error("Enter valid positive prices for Entry, SL and TP.");
  }

  return {
    post_type: "signal",
    symbol: "XAUUSD",
    direction,
    access,
    timeframe,
    analysis: analysis || null,
    entry,
    stop_loss,
    tp1,
    tp2,
  };
}

export async function createSignal(formData: FormData) {
  const { supabase, user } = await requireAdmin();

  try {
    const payload = signalInput(formData);
    const image_url = await uploadSignalImage(supabase, formData);

    const { error } = await supabase.from("signals").insert({
      ...payload,
      image_url,
      created_by: user.id,
      status: "OPEN",
    });

    if (error) throw new Error(error.message);
  } catch (e) {
    redirect(
      `/admin?error=${encodeURIComponent(
        e instanceof Error ? e.message : "Could not publish post"
      )}`
    );
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/admin");

  redirect("/admin?message=Post+published+successfully");
}

export async function editSignal(formData: FormData) {
  const { supabase } = await requireAdmin();

  try {
    const id = String(formData.get("id") ?? "");

    if (!id) {
      throw new Error("Missing post ID.");
    }

    const payload = signalInput(formData);
    const image_url = await uploadSignalImage(supabase, formData);

    const { error } = await supabase
      .from("signals")
      .update({
        ...payload,
        ...(image_url ? { image_url } : {}),
      })
      .eq("id", id);

    if (error) throw new Error(error.message);
  } catch (e) {
    redirect(
      `/admin?error=${encodeURIComponent(
        e instanceof Error ? e.message : "Could not edit post"
      )}`
    );
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/admin");

  redirect("/admin?message=Post+updated");
}

export async function updateSignalStatus(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (
    !["OPEN", "TP1 HIT", "TP2 HIT", "SL HIT", "CLOSED"].includes(status)
  ) {
    redirect("/admin?error=Invalid+status");
  }

  const { error } = await supabase
    .from("signals")
    .update({ status })
    .eq("id", id);

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/admin");

  redirect("/admin?message=Post+status+updated");
}

export async function deleteSignal(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") ?? "");

  const { error } = await supabase
    .from("signals")
    .delete()
    .eq("id", id);

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/admin");

  redirect("/admin?message=Post+deleted");
}

export async function setPremiumStatus(formData: FormData) {
  const { supabase } = await requireAdmin();

  const userId = String(formData.get("user_id") ?? "");
  const premium_status = String(
    formData.get("premium_status") ?? ""
  );

  if (!["approved", "pending", "suspended"].includes(premium_status)) {
    redirect("/admin?error=Invalid+membership+status");
  }

  const { error } = await supabase.rpc("admin_set_premium_status", {
    target_user_id: userId,
    new_status: premium_status,
  });

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin");
  revalidatePath("/dashboard");

  redirect("/admin?message=Membership+updated");
     }
