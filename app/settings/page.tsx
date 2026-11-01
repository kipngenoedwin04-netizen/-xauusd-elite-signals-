
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { changePassword } from "@/app/actions/auth";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { user, profile } = await requireUser();
  const params = await searchParams;

  const cardStyle = {
    background: "linear-gradient(145deg,#211B08,#11100B)",
    border: "1px solid rgba(255,215,0,0.3)",
    borderRadius: "16px",
    padding: "24px",
    marginTop: "18px",
  };

  const labelStyle = {
    display: "block",
    color: "#FFE99A",
    fontSize: "13px",
    fontWeight: 700,
    marginBottom: "9px",
  };

  const inputStyle = {
    width: "100%",
    padding: "13px",
    marginBottom: "18px",
    borderRadius: "9px",
    border: "1px solid rgba(255,215,0,0.35)",
    background: "#090909",
    color: "#FFFFFF",
    outline: "none",
  };

  return (
    <main className="dashboard-page">
      <section
        style={{
          maxWidth: "700px",
          margin: "35px auto",
          padding: "16px",
        }}
      >
        <div className="eyebrow">THE ELITES · ACCOUNT CENTER</div>
        <h1>
          My <em>Profile</em>
        </h1>
        <p>Manage your account, security and support.</p>

        {/* ACCOUNT DETAILS */}
        <div style={cardStyle}>
          <div className="eyebrow">01 · PERSONAL ACCOUNT</div>
          <h2>Account Details</h2>

          <p style={{ marginTop: "18px" }}>
            <span style={{ color: "#D9B84F" }}>Display Name</span>
            <br />
            <strong>{profile?.display_name || "Member"}</strong>
          </p>

          <p style={{ marginTop: "15px" }}>
            <span style={{ color: "#D9B84F" }}>Email Address</span>
            <br />
            <strong>{user.email}</strong>
          </p>

          <p style={{ marginTop: "15px" }}>
            <span style={{ color: "#D9B84F" }}>Account Type</span>
            <br />
            <strong>
              {profile?.role === "admin"
                ? "Administrator"
                : profile?.premium_status === "approved"
                  ? "Premium Member"
                  : "Free Member"}
            </strong>
          </p>
        </div>

        {/* PASSWORD CHANGE */}
        <div style={cardStyle}>
          <div className="eyebrow">02 · ACCOUNT SECURITY</div>
          <h2>Change Password</h2>
          <p style={{ marginTop: "8px", marginBottom: "20px" }}>
            Create a new password with at least 8 characters.
          </p>

          {params.error && (
            <p style={{ color: "#ff7777", marginBottom: "15px" }}>
              {params.error}
            </p>
          )}

          {params.message && (
            <p style={{ color: "#e9bb4e", marginBottom: "15px" }}>
              {params.message}
            </p>
          )}

          <form action={changePassword}>
            <label htmlFor="password" style={labelStyle}>
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              minLength={8}
              required
              autoComplete="new-password"
              style={inputStyle}
            />

            <label htmlFor="confirm_password" style={labelStyle}>
              Confirm New Password
            </label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              minLength={8}
              required
              autoComplete="new-password"
              style={inputStyle}
            />

            <button type="submit" className="btn btn-gold">
              Update Password
            </button>
          </form>

          <div style={{ marginTop: "20px" }}>
            <Link href="/auth/forgot-password">
              Forgot your password? Reset here →
            </Link>
          </div>
        </div>

        {/* HELP AND SUPPORT */}
        <div style={cardStyle}>
          <div className="eyebrow">03 · MEMBER ASSISTANCE</div>
          <h2>Help & Support</h2>
          <p style={{ marginTop: "10px", marginBottom: "18px" }}>
            Need help with your account, premium access or the signals platform?
            Contact our support team.
          </p>

          <Link
            href="https://t.me/pixley021"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            Contact Support →
          </Link>
        </div>

        {/* NAVIGATION */}
        <div style={{ marginTop: "25px", textAlign: "center" }}>
          <Link href="/dashboard">← Back to Signals</Link>
        </div>
      </section>
    </main>
  );
}
