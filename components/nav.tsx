
import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import { getUserAndProfile } from "@/lib/auth";

export async function Nav() {
  const { user, profile } = await getUserAndProfile();

  if (!user) return null;

  const isAdmin = profile?.role === "admin";

  const navButton = {
    flex: "1 1 0",
    minWidth: "0",
    maxWidth: "180px",
    minHeight: "52px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    padding: "10px 8px",
    border: "1px solid rgba(255,215,0,0.35)",
    borderRadius: "12px",
    background: "linear-gradient(145deg,#211B08,#11100B)",
    color: "#FFE99A",
    textDecoration: "none",
    fontSize: "clamp(11px, 2.8vw, 14px)",
    fontWeight: 800,
    whiteSpace: "nowrap" as const,
  };

  return (
    <header
      className="site-header"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "18px",
        padding: "14px 12px",
        background: "linear-gradient(90deg,#080808,#191300,#080808)",
        borderBottom: "1px solid rgba(255,215,0,0.55)",
      }}
    >
      {/* BRAND */}
      <Link
        href="/dashboard"
        className="brand"
        style={{
          alignSelf: "center",
          textDecoration: "none",
        }}
      >
        <span className="brand-mark">X</span>
        <span>
          XAUUSD <b>ELITE</b>
          <small>SIGNALS · THE ELITES</small>
        </span>
      </Link>

      {/* TOP HORIZONTAL NAVIGATION */}
      <nav
        aria-label="Main navigation"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          width: "100%",
          maxWidth: "620px",
          margin: "0 auto",
        }}
      >
        <Link href="/dashboard" style={{
          ...navButton,
          background: "linear-gradient(135deg,#FFE98A,#FFD700,#E6A900)",
          color: "#171006",
          border: "1px solid #FFF0A6",
          boxShadow: "0 0 14px rgba(255,215,0,0.2)",
        }}>
          <span>📊</span>
          <span>SIGNALS</span>
        </Link>

        <Link href="/premium" style={navButton}>
          <span>👑</span>
          <span>PREMIUM</span>
        </Link>

        <Link href="/settings" style={navButton}>
          <span>👤</span>
          <span>PROFILE</span>
        </Link>
      </nav>

      {/* ACCOUNT ACTIONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "16px",
          maxWidth: "620px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {isAdmin && (
          <Link
            href="/admin"
            style={{
              color: "#FFE99A",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            🛡️ Admin Panel
          </Link>
        )}

        <form action={signOut}>
          <button
            type="submit"
            style={{
              background: "transparent",
              border: "1px solid rgba(255,215,0,0.35)",
              borderRadius: "8px",
              padding: "7px 12px",
              color: "#FFD700",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            ↪ Sign Out
          </button>
        </form>
      </div>
    </header>
  );
}
