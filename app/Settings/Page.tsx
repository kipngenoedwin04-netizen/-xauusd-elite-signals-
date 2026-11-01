
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { changePassword } from "@/app/actions/auth";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { user } = await requireUser();
  const params = await searchParams;

  return (
    <main className="dashboard-page">
      <section
        className="section"
        style={{
          maxWidth: "700px",
          margin: "50px auto",
          padding: "20px",
        }}
      >
        <div className="eyebrow">ACCOUNT PREFERENCES</div>
        <h1>App <em>Settings</em></h1>

        <div className="member-summary" style={{ padding: "25px", marginTop: "25px" }}>
          <h2>Account Details</h2>
          <p style={{ marginTop: "12px" }}>Email: {user.email}</p>
        </div>

        <div className="member-summary" style={{ padding: "25px", marginTop: "25px" }}>
          <h2>Change Password</h2>
          <p>Choose a new password with at least 8 characters.</p>

          {params.error && (
            <p style={{ color: "#ff7777" }}>{params.error}</p>
          )}

          {params.message && (
            <p style={{ color: "#e9bb4e" }}>{params.message}</p>
          )}

          <form action={changePassword} style={{ marginTop: "20px" }}>
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              minLength={8}
              required
              autoComplete="new-password"
            />

            <label htmlFor="confirm_password">Confirm New Password</label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              minLength={8}
              required
              autoComplete="new-password"
            />

            <button type="submit" className="btn btn-gold">
              Update Password
            </button>
          </form>
        </div>

        <p style={{ marginTop: "25px" }}>
          <Link href="/auth/forgot-password">
            Forgot your password?
          </Link>
        </p>

        <p style={{ marginTop: "20px" }}>
          <Link href="/dashboard">← Back to Signals</Link>
        </p>
      </section>
    </main>
  );
}
