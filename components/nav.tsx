
import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import { getUserAndProfile } from "@/lib/auth";

export async function Nav() {
  const { user, profile } = await getUserAndProfile();

  // No navigation menu for visitors who are not logged in
  if (!user) return null;

  const isAdmin = profile?.role === "admin";

  return (
    <header className="site-header">
      <Link href="/dashboard" className="brand">
        <span className="brand-mark">X</span>
        <span>
          XAUUSD <b>ELITE</b>
          <small>SIGNALS · THE ELITES</small>
        </span>
      </Link>

      <details className="nav-menu">
        <summary
          aria-label="Open navigation menu"
          title="Menu"
        >
          <span>⠿</span>
        </summary>

        <nav className="nav-dropdown">
          <Link href="/dashboard">Home — Signals</Link>
          <Link href="/membership">Dashboard — Membership</Link>
          <Link href="/premium">Premium / VIP</Link>
          <Link href="/settings">App Settings</Link>
          <Link href="https://t.me/pixley021" target="_blank">
            Help & Support
          </Link>

          {isAdmin && (
            <Link href="/admin">Admin Panel</Link>
          )}

          <form action={signOut}>
            <button type="submit" className="nav-button">
              Sign out
            </button>
          </form>
        </nav>
      </details>
    </header>
  );
}
