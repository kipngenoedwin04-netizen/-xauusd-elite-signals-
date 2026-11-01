
import Link from "next/link";

export type Signal = {
  id: string;
  access: string;
  timeframe: string;
  status: string;
  created_at: string;
  direction?: string;
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
    return (
      <article className="signal-card vip-preview">
        <div className="signal-top">
          <span className="access-tag">VIP</span>
          <span className="status">{signal.status}</span>
        </div>

        <div className="signal-title">
          XAUUSD <small>GOLD</small>
        </div>

        <div className="analysis">
          <label>PREMIUM SIGNAL · {signal.timeframe}</label>
          <h3>Exclusive VIP signal published</h3>
          <p>
            This premium trade idea is available to approved members.
            Unlock premium access to view the complete setup.
          </p>
        </div>

        <Link
          href="https://t.me/pixley021"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Unlock Premium
        </Link>

        <footer className="signal-foot">
          Published {published}
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
