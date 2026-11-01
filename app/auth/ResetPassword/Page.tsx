
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password updated successfully. Redirecting to login...");

    await supabase.auth.signOut();

    setTimeout(() => {
      router.push("/auth/login?message=Password+updated+successfully");
    }, 1500);
  }

  return (
    <main className="dashboard-page">
      <section className="section" style={{ maxWidth: "500px", margin: "70px auto", padding: "25px" }}>
        <div className="eyebrow">ACCOUNT RECOVERY</div>
        <h1>Reset <em>Password</em></h1>

        <p>Create a new password for your account.</p>

        <form onSubmit={handleReset} style={{ marginTop: "25px" }}>
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            type="password"
            minLength={8}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            type="password"
            minLength={8}
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <button type="submit" className="btn btn-gold" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {message && <p style={{ marginTop: "20px" }}>{message}</p>}
      </section>
    </main>
  );
}
