
import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import { getUserAndProfile } from "@/lib/auth";

export async function Nav() {
  const { user, profile } = await getUserAndProfile();

  // Hide navigation before login
  if (!user) return null;

  const isAdmin = profile?.role === "admin";

  const itemStyle = {
    display: "block",
    padding: "14px 16px",
    textDecoration: "none",
    color: "#f5f5f5",
    borderBottom: "1px solid #333",
    fontSize: "14px",
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
      }}
    >
      {/* FOUR DOTS MENU - TOP LEFT */}
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
            padding: "12px",
            background: "#242424",
            border: "1px solid #b58b35",
            borderRadius: "10px",
          }}
        >
          <span style={{ width: 7, height: 7, background: "#e9bb4e", borderRadius: "50%" }} />
          <span style={{ width: 7, height: 7, background: "#e9bb4e", borderRadius: "50%" }} />
          <span style={{ width: 7, height: 7, background: "#e9bb4e", borderRadius: "50%" }} />
          <span style={{ width: 7, height: 7, background: "#e9bb4e", borderRadius: "50%" }} />
        </summary>

        {/* VERTICAL DROPDOWN */}
        <nav
          style={{
            position: "absolute",
            top: "calc(100% + 12px)",
            left: 0,
            width: "230px",
            display: "flex",
            flexDirection: "column",
            background: "#171717",
            border: "1px solid #8b6a2d",
            borderRadius: "12px",
            padding: "8px",
            zIndex: 1000,
            boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
          }}
        >
          <Link href="/dashboard" style={itemStyle}>
            Home — Signals
          </Link>

          <Link href="/membership" style={itemStyle}>
            Dashboard — Membership
          </Link>

          <Link href="/premium" style={itemStyle}>
            Premium / VIP
          </Link>

          <Link href="/settings" style={itemStyle}>
            App Settings
          </Link>

          <Link
            href="https://t.me/pixley021"
            target="_blank"
            rel="noopener noreferrer"
            style={itemStyle}
          >
            Help & Support
          </Link>

          {isAdmin && (
            <Link href="/admin" style={itemStyle}>
              Admin Panel
            </Link>
          )}

          <form action={signOut}>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px 16px",
                textAlign: "left",
                background: "transparent",
                border: "none",
                color: "#e9bb4e",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Sign Out
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
