
import Link from "next/link";

export type Signal = {
  id: string;
  access: string;
  timeframe: string;
  status: string;
  created_at: string;
  direction?: string;
  bias?: string;
  entry?: number | string | null;
  stop_loss?: number | string | null;
  tp1?: number | string | null;
  tp2?: number | string | null;
  analysis?: string | null;
  image_url?: string | null;
};

export function SignalCard({ signal }: { signal: Signal }) {
  const isLockedPremium =
    signal.access === "premium" && !signal.direction;

  const formatPrice = (value?: number | string | null) =>
    value == null ? "—" : Number(value).toFixed(2);

  const published = new Date(signal.created_at).toLocaleString("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Nairobi",
  });

  if (isLockedPremium) {
    const bias =
      signal.bias === "BULLISH BIAS"
        ? "BULLISH BIAS"
        : signal.bias === "BEARISH BIAS"
        ? "BEARISH BIAS"
        : "MARKET UPDATE";

    const bullish = bias === "BULLISH BIAS";
    const biasColor = bullish ? "#35d49a" : "#ff7373";

    return (
      <article
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "22px",
          borderRadius: "20px",
          border: "1px solid rgba(255, 193, 7, 0.65)",
          background:
            "radial-gradient(ellipse at top right, rgba(255,193,7,0.15), transparent 55%), linear-gradient(145deg, #171717, #080808 75%)",
          boxShadow:
            "0 0 22px rgba(255,193,7,0.12), inset 0 0 25px rgba(255,193,7,0.035)",
          color: "#ffffff",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #ffe082, #d99b00)",
              color: "#171000",
              padding: "6px 13px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "1px",
            }}
          >
            👑 VIP SIGNAL
          </span>

          <span
            style={{
              color: "#f5c542",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            ● {signal.status}
          </span>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              color: "#ffd54f",
              fontSize: "25px",
              fontWeight: 900,
              letterSpacing: "1.5px",
            }}
          >
            XAUUSD UPDATE
          </div>
          <div
            style={{
              color: "#888",
              fontSize: "11px",
              letterSpacing: "3px",
              marginTop: "4px",
            }}
          >
            GOLD · PREMIUM MARKET INSIGHT
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              background: "#202020",
              border: "1px solid #343434",
              borderRadius: "12px",
              padding: "13px",
            }}
          >
            <div style={{ color: "#999", fontSize: "10px", marginBottom: "7px" }}>
              TIMEFRAME
            </div>
            <div style={{ color: "#fff", fontSize: "15px", fontWeight: 800 }}>
              {signal.timeframe}
            </div>
          </div>

          <div
            style={{
              background: "#202020",
              border: "1px solid #343434",
              borderRadius: "12px",
              padding: "13px",
            }}
          >
            <div style={{ color: "#999", fontSize: "10px", marginBottom: "7px" }}>
              MARKET BIAS
            </div>
            <div
              style={{
                color: biasColor,
                fontSize: "14px",
                fontWeight: 900,
              }}
            >
              {bias}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,193,7,0.2)",
            paddingTop: "22px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>
            🔒
          </div>

          <div
            style={{
              color: "#ffd54f",
              fontSize: "17px",
              fontWeight: 900,
              letterSpacing: "1.5px",
              marginBottom: "9px",
            }}
          >
            VIP SIGNAL LOCKED
          </div>

          <p
            style={{
              color: "#aaa",
              fontSize: "13px",
              lineHeight: 1.7,
              margin: "0 auto 20px",
              maxWidth: "310px",
            }}
          >
            The complete trading setup is reserved for VIP members.
            Unlock premium to access the entry, stop loss and take profit levels.
          </p>

          <Link
            href="https://t.me/pixley021"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              width: "100%",
              boxSizing: "border-box",
              padding: "15px 12px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #ffe082, #d99b00)",
              color: "#171000",
              fontSize: "13px",
              fontWeight: 900,
              letterSpacing: "0.5px",
              textDecoration: "none",
              boxShadow: "0 5px 20px rgba(255,193,7,0.2)",
            }}
          >
            👑 UNLOCK PREMIUM · @pixley021
          </Link>
        </div>

        <footer
          style={{
            borderTop: "1px solid #292929",
            marginTop: "20px",
            paddingTop: "13px",
            color: "#777",
            fontSize: "11px",
            textAlign: "center",
          }}
        >
          XAUUSD ELITE SIGNALS · Published {published}
        </footer>
      </article>
    );
  }

  return (
    <article className="signal-card">
      <div className="signal-top">
        <span
          className={`direction ${
            signal.direction === "BUY" ? "buy" : "sell"
          }`}
        >
          {signal.direction}
        </span>
        <span className="access-tag">{signal.access.toUpperCase()}</span>
        <span className="status">{signal.status}</span>
      </div>

      <div className="signal-title">
        XAUUSD <small>GOLD</small>
      </div>

      {signal.image_url && (
        <div className="signal-image">
          <img
            src={signal.image_url}
            alt="XAUUSD trading chart"
            loading="lazy"
          />
        </div>
      )}

      <div className="price-grid">
        <div>
          <label>ENTRY</label>
          <b>{formatPrice(signal.entry)}</b>
        </div>
        <div>
          <label>STOP LOSS</label>
          <b className="danger">{formatPrice(signal.stop_loss)}</b>
        </div>
        <div>
          <label>TAKE PROFIT 1</label>
          <b className="success">{formatPrice(signal.tp1)}</b>
        </div>
        <div>
          <label>TAKE PROFIT 2</label>
          <b className="success">{formatPrice(signal.tp2)}</b>
        </div>
      </div>

      <div className="analysis">
        <label>MARKET ANALYSIS · {signal.timeframe}</label>
        <p>{signal.analysis}</p>
      </div>

      <footer className="signal-foot">
        Published {published}
      </footer>
    </article>
  );
                }
