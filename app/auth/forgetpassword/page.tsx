
import Link from "next/link";
import { requestPasswordReset } from "@/app/actions/auth";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="dashboard-page">
      <section
        className="section"
        style={{
          maxWidth: "500px",
          margin: "70px auto",
          padding: "25px",
        }}
      >
        <div className="eyebrow">ACCOUNT RECOVERY</div>

        <h1>Forgot <em>Password?</em></h1>

        <p>
          Enter your registered email address.
          We'll send you a password recovery link.
        </p>

        {params.error && (
          <p style={{ color: "#ff7777", marginTop: "20px" }}>
            {params.error}
          </p>
        )}

        {params.message && (
          <p style={{ color: "#e9bb4e", marginTop: "20px" }}>
            {params.message}
          </p>
        )}

        <form action={requestPasswordReset} style={{ marginTop: "25px" }}>
          <label htmlFor="email">Registered Email</label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
          />

          <button type="submit" className="btn btn-gold">
            Send Recovery Link
          </button>
        </form>

        <p style={{ marginTop: "25px" }}>
          <Link href="/auth/login">← Back to Login</Link>
        </p>
      </section>
    </main>
  );
}
