
import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import { getUserAndProfile } from "@/lib/auth";

export async function Nav() {
  const { user, profile } = await getUserAndProfile();

  if (!user) return null;

  const isAdmin = profile?.role === "admin";

  const itemStyle = {
    display: "block",
    padding: "15px 16px",
    textDecoration: "none",
    color: "#FFE99A",
    borderBottom: "1px solid rgba(255,215,0,0.25)",
    fontSize: "14px",
    fontWeight: 650,
  };

  return (
    <header
      className="site-header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "18px",
        position: "relative",
        background: "linear-gradient(90deg,#080808,#191300,#080808)",
        borderBottom: "1px solid rgba(255,215,0,0.55)",
      }}
    >
      {/* FOUR DOTS MENU */}
      <details style={{ position: "relative" }}>
        <summary
          aria-label="Open navigation menu"
          title="Menu"
          style={{
            listStyle: "none",
            cursor: "pointer",
            display: "grid",
            gridTemplateColumns: "repeat(2, 7px)",
            gap: "5px",
            padding: "13px",
            background: "linear-gradient(135deg,#FFE98A,#FFD700,#E6A900)",
            border: "1px solid #FFF0A6",
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(255,215,0,0.25)",
          }}
        >
          <span style={{ width: 7, height: 7, background: "#171006", borderRadius: "50%" }} />
          <span style={{ width: 7, height: 7, background: "#171006", borderRadius: "50%" }} />
          <span style={{ width: 7, height: 7, background: "#171006", borderRadius: "50%" }} />
          <span style={{ width: 7, height: 7, background: "#171006", borderRadius: "50%" }} />
        </summary>

        {/* GOLD PREMIUM DROPDOWN */}
        <nav
          style={{
            position: "absolute",
            top: "calc(100% + 12px)",
            left: 0,
            width: "240px",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(145deg,#211B08,#11100B)",
            border: "1px solid #FFD700",
            borderRadius: "12px",
            padding: "8px",
            zIndex: 1000,
            boxShadow: "0 12px 35px rgba(0,0,0,0.7), 0 0 15px rgba(255,215,0,0.12)",
          }}
        >
          <Link href="/dashboard" style={itemStyle}>
            🏠 Home — Signals
          </Link>

          <Link href="/membership" style={itemStyle}>
            👤 Dashboard — Membership
          </Link>

          <Link href="/premium" style={itemStyle}>
            👑 Premium / VIP
          </Link>

          <Link href="/settings" style={itemStyle}>
            ⚙️ App Settings
          </Link>

          <Link
            href="https://t.me/pixley021"
            target="_blank"
            rel="noopener noreferrer"
            style={itemStyle}
          >
            💬 Help & Support
          </Link>

          {isAdmin && (
            <Link href="/admin" style={itemStyle}>
              🛡️ Admin Panel
            </Link>
          )}

          <form action={signOut}>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "15px 16px",
                textAlign: "left",
                background: "linear-gradient(90deg,rgba(255,215,0,0.12),transparent)",
                border: "none",
                color: "#FFD700",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 800,
              }}
            >
              ↪ Sign Out
            </button>
          </form>
        </nav>
      </details>

      {/* BRAND */}
      <Link href="/dashboard" className="brand">
        <span className="brand-mark">X</span>
        <span>
          XAUUSD <b>ELITE</b>
          <small>SIGNALS · THE ELITES</small>
        </span>
      </Link>
    </header>
  );
}
