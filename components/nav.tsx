
import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import { getUserAndProfile } from "@/lib/auth";

export async function Nav() {
  const { user, profile } = await getUserAndProfile();

  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <span className="brand-mark">X</span>
        <span>
          XAUUSD <b>ELITE</b>
          <small>SIGNALS · THE ELITES</small>
        </span>
      </Link>

      <details className="nav-menu">
        <summary className="nav-menu-trigger" aria-label="Open navigation menu">
          <span className="dot-grid">
            <i /><i /><i /><i />
          </span>
        </summary>

        <div className="nav-dropdown">
          <div className="nav-dropdown-heading">
            <span>THE ELITES</span>
            <small>GOLD TRADING COMMUNITY</small>
          </div>

          <Link href="/" className="nav-menu-link">
            <span>⌂</span> Home
          </Link>

          <Link href="/dashboard" className="nav-menu-link">
            <span>▦</span> Dashboard
          </Link>

          <Link href="/premium" className="nav-menu-link premium-link">
            <span>♛</span> Premium / VIP Signals
            <small>$50</small>
          </Link>

          <Link href="/settings" className="nav-menu-link">
            <span>⚙</span> App Settings
          </Link>

          <a
            href="https://t.me/pixley021"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-menu-link"
          >
            <span>?</span> Help & Support
          </a>

          {profile?.role === "admin" && (
            <Link href="/admin" className="nav-menu-link">
              <span>♜</span> Admin Panel
            </Link>
          )}

          <div className="nav-dropdown-footer">
            {user ? (
              <form action={signOut}>
                <button className="nav-button">Sign out</button>
              </form>
            ) : (
              <>
                <Link href="/auth/login">Login</Link>
                <Link href="/auth/register">Create account</Link>
              </>
            )}
          </div>
        </div>
      </details>
    </header>
  );
}
