import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import { getUserAndProfile } from "@/lib/auth";

export async function Nav() {
  const { user, profile } = await getUserAndProfile();
  return <header className="site-header"><Link href="/" className="brand"><span className="brand-mark">X</span><span>XAUUSD <b>ELITE</b><small>SIGNALS · THE ELITES</small></span></Link><nav><Link href="/">Home</Link>{user ? <><Link href="/dashboard">Dashboard</Link>{profile?.role === "admin" && <Link href="/admin">Admin</Link>}<form action={signOut}><button className="nav-button">Sign out</button></form></> : <><Link href="/auth/login">Login</Link><Link className="nav-join" href="/auth/register">Join free</Link></>}</nav></header>;
}
