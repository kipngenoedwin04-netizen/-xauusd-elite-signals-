
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("Verifying recovery session...");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    let active = true;

    async function verifySession() {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getUser();

      if (!active) return;

      if (error || !data.user) {
        setMessage(
          "Your recovery session is invalid or expired. Request a new password reset email."
        );
        setVerified(false);
        return;
      }

      setVerified(true);
      setMessage("");
    }

    verifySession();

    return () => {
      active = false;
    };
  }, []);

  async function handleReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!verified) {
      setMessage("Please use a valid password recovery link.");
      return;
    }

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

    router.replace(
      "/auth/login?message=Password+updated+successfully"
    );
  }

  return (
    <main className="dashboard-page">
      <section
        className="section"
        style={{
          maxWidth: "500px",
          margin: "50px auto",
          padding: "25px",
        }}
      >
        <div className="eyebrow">ACCOUNT RECOVERY · THE ELITES</div>

        <h1>
          Reset <em>Password</em>
        </h1>

        <p>Create a new password for your account.</p>

        {verified ? (
          <form onSubmit={handleReset} style={{ marginTop: "25px" }}>
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              minLength={8}
              required
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <label htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              minLength={8}
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
            />

            <button
              type="submit"
              className="btn btn-gold"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        ) : null}

        {message && (
          <p
            role="status"
            style={{
              marginTop: "20px",
              color: verified ? "#E9BB4E" : "#FFE99A",
            }}
          >
            {message}
          </p>
        )}

        {!verified && (
          <p style={{ marginTop: "20px" }}>
            <a href="/auth/forgot-password">
              Request a new recovery link →
            </a>
          </p>
        )}
      </section>
    </main>
  );
}
