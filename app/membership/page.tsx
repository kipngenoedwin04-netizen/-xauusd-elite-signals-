
import Link from "next/link";
import { requireUser } from "@/lib/auth";

export default async function MembershipPage() {
  const { user, profile } = await requireUser();

  const isAdmin = profile?.role === "admin";
  const isPremium = profile?.premium_status === "approved";
  const isPending = profile?.premium_status === "pending";

  const status = isAdmin
    ? "ADMIN"
    : isPremium
    ? "PREMIUM APPROVED"
    : isPending
    ? "PREMIUM PENDING"
    : "FREE MEMBER";

  return (
    <main className="dashboard-page">
      <section
        className="section"
        style={{
          maxWidth: "850px",
          margin: "50px auto",
          padding: "20px",
        }}
      >
        <div className="eyebrow">MEMBER ACCOUNT</div>

        <h1>
          Membership <em>Dashboard</em>
        </h1>

        <p>View your account and membership status.</p>

        <div
          className="member-summary"
          style={{
            marginTop: "30px",
            padding: "30px",
          }}
        >
          <div className="eyebrow">YOUR MEMBERSHIP STATUS</div>

          <h2
            style={{
              color: isPremium || isAdmin ? "#e9bb4e" : "#ffffff",
              marginTop: "15px",
            }}
          >
            {status}
          </h2>

          <p style={{ marginTop: "15px" }}>
            Account: {user.email}
          </p>

          {isAdmin ? (
            <p>You have full administrator access.</p>
          ) : isPremium ? (
            <p>
              Your VIP membership is approved.
              You can access FREE and PREMIUM signals.
            </p>
          ) : isPending ? (
            <p>
              Your VIP request is awaiting administrator approval.
              You can currently access FREE signals.
            </p>
          ) : (
            <p>
              You currently have FREE membership.
              You can access FREE signals.
            </p>
          )}
        </div>

        {!isPremium && !isAdmin && (
          <div style={{ marginTop: "30px" }}>
            <h2>Want VIP access?</h2>
            <p>
              Upgrade to lifetime PREMIUM membership for $50.
            </p>
            <Link href="/premium" className="btn btn-gold">
              View Premium Membership
            </Link>
          </div>
        )}

        <div style={{ marginTop: "30px" }}>
          <Link href="/dashboard" className="btn">
            Go to Signals
          </Link>
        </div>
      </section>
    </main>
  );
}
