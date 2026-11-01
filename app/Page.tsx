
import Link from "next/link";

export default function PremiumPage() {
  return (
    <main className="dashboard-page">
      <section className="section" style={{ maxWidth: "760px", margin: "60px auto", textAlign: "center" }}>
        <div className="eyebrow">THE ELITES · EXCLUSIVE MEMBERSHIP</div>

        <h1>
          Premium / <em>VIP Signals</em>
        </h1>

        <p>
          Unlock exclusive XAUUSD premium trading ideas,
          detailed market analysis and structured trade levels.
        </p>

        <div className="member-summary" style={{ display: "block", padding: "35px", marginTop: "35px" }}>
          <div className="eyebrow">LIFETIME MEMBERSHIP</div>

          <h2 style={{ fontSize: "64px", color: "#e9bb4e", margin: "15px 0" }}>
            $50
          </h2>

          <p>One-time payment · Lifetime access</p>

          <div style={{ textAlign: "left", margin: "30px auto", maxWidth: "400px" }}>
            <p>✓ Access to all FREE signals</p>
            <p>✓ Access to PREMIUM / VIP signals</p>
            <p>✓ XAUUSD market analysis</p>
            <p>✓ Entry, Stop Loss and Take Profit levels</p>
            <p>✓ Lifetime membership after approval</p>
          </div>

          <a
            href="https://t.me/pixley021"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
            style={{ display: "inline-block", marginTop: "15px" }}
          >
            Contact Admin for VIP Access ↗
          </a>

          <p style={{ fontSize: "12px", marginTop: "20px" }}>
            Contact @pixley021 on Telegram to agree on payment.
            VIP access is activated manually after payment verification
            and administrator approval.
          </p>
        </div>

        <p style={{ marginTop: "30px" }}>
          <Link href="/">← Back to Home</Link>
        </p>
      </section>
    </main>
  );
}
