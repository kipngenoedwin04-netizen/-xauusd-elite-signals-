import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
export const metadata: Metadata = { title: "XAUUSD Elite Signals | THE ELITES", description: "Manual XAUUSD trading ideas and market analysis from THE ELITES." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><Nav />{children}<footer className="global-footer"><span>© {new Date().getFullYear()} XAUUSD ELITE SIGNALS · THE ELITES</span><span>Trade with a plan. Protect your capital.</span></footer></body></html>; }
