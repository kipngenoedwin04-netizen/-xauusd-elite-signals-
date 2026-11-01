
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { RegisterSW } from "@/components/register-sw";

export const metadata: Metadata = {
  title: "XAUUSD Elite Signals",
  description:
    "XAUUSD trading education, market strategies, signals and risk management.",
  applicationName: "XAUUSD Elite Signals",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "XAUUSD Elite",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RegisterSW />
        <Nav />
        {children}

        <footer className="global-footer">
          <span>
            © {new Date().getFullYear()} XAUUSD ELITE SIGNALS · THE ELITES
          </span>
          <span>Trade with a plan. Protect your capital.</span>
        </footer>
      </body>
    </html>
  );
}
