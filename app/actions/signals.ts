"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

function signalInput(formData: FormData) {
  const direction = String(formData.get("direction"));
  const access = String(formData.get("access"));
  const timeframe = String(formData.get("timeframe") ?? "").trim();
  const analysis = String(formData.get("analysis") ?? "").trim();
  const entry = Number(formData.get("entry"));
  const stop_loss = Number(formData.get("stop_loss"));
  const tp1 = Number(formData.get("tp1"));
  const tp2 = Number(formData.get("tp2"));
  if (!(["BUY", "SELL"].includes(direction)) || !(["free", "premium"].includes(access)) || !timeframe || !analysis || ![entry, stop_loss, tp1, tp2].every(Number.isFinite) || [entry, stop_loss, tp1, tp2].some((v) => v <= 0)) throw new Error("Please complete all signal fields with valid positive prices.");
  return { symbol: "XAUUSD", direction, access, timeframe, analysis, entry, stop_loss, tp1, tp2 };
}

export async function createSignal(formData: FormData) {
  const { supabase, user } = await requireAdmin();
  let payload;
  try { payload = signalInput(formData); } catch (e) { redirect(`/admin?error=${encodeURIComponent(e instanceof Error ? e.message : "Invalid signal")}`); }
  const { error } = await supabase.from("signals").insert({ ...payload, created_by: user.id, status: "OPEN" });
  if (error) redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/"); revalidatePath("/dashboard"); revalidatePath("/admin");
  redirect("/admin?message=Signal+published");
}

export async function editSignal(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id"));
  let payload;
  try { payload = signalInput(formData); } catch (e) { redirect(`/admin?error=${encodeURIComponent(e instanceof Error ? e.message : "Invalid signal")}`); }
  const { error } = await supabase.from("signals").update(payload).eq("id", id);
  if (error) redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/"); revalidatePath("/dashboard"); revalidatePath("/admin");
  redirect("/admin?message=Signal+edited");
}

export async function updateSignalStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  if (!(["OPEN", "TP1 HIT", "TP2 HIT", "SL HIT", "CLOSED"].includes(status))) redirect("/admin?error=Invalid+status");
  const { error } = await supabase.from("signals").update({ status }).eq("id", id);
  if (error) redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/"); revalidatePath("/dashboard"); revalidatePath("/admin");
  redirect("/admin?message=Signal+updated");
}

export async function deleteSignal(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id"));
  const { error } = await supabase.from("signals").delete().eq("id", id);
  if (error) redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/"); revalidatePath("/dashboard"); revalidatePath("/admin");
  redirect("/admin?message=Signal+deleted");
}

export async function setPremiumStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  const userId = String(formData.get("user_id"));
  const premium_status = String(formData.get("premium_status"));
  if (!(["approved", "pending", "suspended"].includes(premium_status))) redirect("/admin?error=Invalid+membership+status");
  const { error } = await supabase.rpc("admin_set_premium_status", { target_user_id: userId, new_status: premium_status });
  if (error) redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/admin"); revalidatePath("/dashboard");
  redirect("/admin?message=Membership+updated");
}
