
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { SignalCard, type Signal } from "@/components/signal-card";

export default async function DashboardPage() {
  const { supabase, user, profile } = await requireUser();

  const approved =
    profile?.premium_status === "approved" ||
    profile?.role === "admin";

  // Secure feed: the database decides which signal details
  // this signed-in member is allowed to receive.
  const { data: rawSignals, error } = await supabase.rpc(
    "get_dashboard_signals"
  );

  const signals = (rawSignals ?? []) as unknown as Signal[];

  return (
    <main className="dashboard-page">
      <div className="dashboard-head">
        <div>
          <div className="eyebrow">MEMBER SPACE · THE ELITES</div>
          <h1>
            Welcome,{" "}
            <em>
              {profile?.display_name || user.email?.split("@")[0]}
            </em>
          </h1>
          <p>Your account and latest eligible XAUUSD trade ideas.</p>
        </div>

        <span className={`membership-pill ${approved ? "premium" : "free"}`}>
          {profile?.role === "admin"
            ? "ADMIN"
            : approved
              ? "PREMIUM MEMBER"
              : "FREE MEMBER"}
        </span>
      </div>

      <div className="member-summary">
        <div>
          <label>MEMBERSHIP</label>
          <b>{approved ? "Premium access active" : "Free membership"}</b>
          <small>
            {approved
              ? "You can view complete free and premium signals."
              : "You can view free signals and VIP previews."}
          </small>
        </div>

        {!approved && (
          <div>
            <label>WANT PREMIUM ACCESS?</label>
            <b>Unlock full VIP signals</b>
            <small>
              Contact PIXLEY021 for manual premium approval.
            </small>
            <Link
              href="https://t.me/pixley021"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Unlock Premium
            </Link>
          </div>
        )}

        <div>
          <label>ACCOUNT EMAIL</label>
          <b>{user.email}</b>
          <small>
            Account verified according to your sign-in status.
          </small>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <div className="eyebrow">YOUR SIGNAL ACCESS</div>
          <h2>Latest signals</h2>
        </div>

        {profile?.role === "admin" && (
          <Link className="btn btn-outline" href="/admin">
            Open admin panel
          </Link>
        )}
      </div>

      {error ? (
        <div className="notice error">
          Could not load signals. Please refresh.
        </div>
      ) : signals.length > 0 ? (
        <div className="signal-grid">
          {signals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No signals published yet</h3>
          <p>
            New signals will appear here after the administrator publishes them.
          </p>
        </div>
      )}
    </main>
  );
}
