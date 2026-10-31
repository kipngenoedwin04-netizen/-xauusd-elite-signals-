
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { SignalCard, type Signal } from "@/components/signal-card";

export default async function DashboardPage() {
  const { supabase, user, profile } = await requireUser();

  const approved =
    profile?.premium_status === "approved" ||
    profile?.role === "admin";

  let signalsQuery = supabase
    .from("signals")
    .select(
      "id,direction,access,entry,stop_loss,tp1,tp2,timeframe,analysis,status,created_at,image_url"
    )
    .order("created_at", { ascending: false })
    .limit(50);

  // FREE members must never receive premium signals.
  if (!approved) {
    signalsQuery = signalsQuery.eq("access", "free");
  }

  const { data: signals, error } = await signalsQuery;

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
              ? "You can view free and premium signals."
              : "You can view free signals only."}
          </small>
        </div>

        {!approved && (
          <div>
            <label>WANT PREMIUM ACCESS?</label>
            <b>Request manual approval</b>
            <small>
              Contact PIXLEY021 through your community channel.
            </small>
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
      ) : signals?.length ? (
        <div className="signal-grid">
          {signals.map((s) => (
            <SignalCard key={s.id} signal={s as Signal} />
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
