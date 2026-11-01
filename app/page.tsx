
import Link from "next/link";
import { getUserAndProfile } from "@/lib/auth";

export default async function HomePage() {
  const { user, profile } = await getUserAndProfile();

  const username =
    profile?.display_name ||
    user?.user_metadata?.display_name ||
    user?.email?.split("@")[0] ||
    "Trader";

  return (
    <main className="home-page">
      <style>{`
        * { box-sizing: border-box; }

        .home-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 50% 15%, rgba(212,155,35,.13), transparent 45%),
            linear-gradient(145deg,#050505,#11100b 55%,#050505);
          color: #fff;
          padding-bottom: 40px;
        }

        .gold-sun {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle,#fff8c5 0%,#f8d66d 12%,#d99b20 35%,rgba(212,155,35,.1) 68%,transparent 72%);
          filter: blur(3px);
          opacity: .35;
          pointer-events: none;
        }

        .coin-rain {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .coin {
          position: absolute;
          top: -70px;
          color: #171006;
          background: linear-gradient(145deg,#fff1a8,#e8b52e,#9b6410);
          border: 2px solid #ffe28a;
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
          font-weight: 900;
          animation: coinDrop linear infinite;
          opacity: .5;
        }

        .coin:nth-child(1) { left: 8%; animation-duration: 9s; }
        .coin:nth-child(2) { left: 25%; animation-duration: 12s; animation-delay: 3s; }
        .coin:nth-child(3) { left: 48%; animation-duration: 10s; animation-delay: 1s; }
        .coin:nth-child(4) { left: 70%; animation-duration: 13s; animation-delay: 4s; }
        .coin:nth-child(5) { left: 88%; animation-duration: 11s; animation-delay: 2s; }

        @keyframes coinDrop {
          0% { transform: translateY(-80px) rotate(0deg); opacity: 0; }
          10% { opacity: .5; }
          90% { opacity: .5; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }

        .public-hero {
          position: relative;
          z-index: 2;
          min-height: 650px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 100px 20px 70px;
        }

        .hero-copy { max-width: 780px; }

        .eyebrow {
          color: #e8bd58;
          font-size: 12px;
          letter-spacing: 3px;
          font-weight: 800;
          margin-bottom: 25px;
        }

        .public-hero h1 {
          font-size: clamp(42px,8vw,78px);
          line-height: 1.05;
          font-weight: 900;
          margin: 0;
          letter-spacing: -2px;
          text-shadow: 0 0 35px rgba(255,196,70,.15);
        }

        .public-hero h1 em {
          color: #f5c451;
          font-style: normal;
        }

        .public-hero p {
          max-width: 590px;
          margin: 25px auto;
          color: #c4c0b4;
          line-height: 1.8;
          font-size: 16px;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 30px;
        }

        .btn {
          display: inline-block;
          padding: 15px 25px;
          border-radius: 8px;
          font-weight: 800;
          text-decoration: none;
          transition: .25s;
        }

        .btn-gold {
          color: #171006;
          background: linear-gradient(135deg,#fff0a8,#e7b438,#bd8117);
        }

        .btn-outline {
          color: #f5c451;
          border: 1px solid #b88b35;
          background: rgba(255,255,255,.03);
        }

        .hero-note {
          margin-top: 22px;
          font-size: 12px;
          color: #aaa18c;
        }

        /* MEMBER LEARNING DASHBOARD */

        .learning-dashboard {
          position: relative;
          z-index: 2;
          max-width: 1050px;
          margin: 0 auto;
          padding: 35px 18px 60px;
        }

        .welcome-box {
          border: 1px solid rgba(219,173,69,.35);
          background: linear-gradient(135deg,rgba(212,155,35,.13),rgba(255,255,255,.025));
          border-radius: 16px;
          padding: 27px 22px;
          margin-bottom: 28px;
          box-shadow: 0 10px 35px rgba(0,0,0,.2);
        }

        .welcome-box .eyebrow { margin-bottom: 10px; }

        .welcome-box h1 {
          font-size: clamp(26px,5vw,38px);
          margin: 0 0 12px;
          line-height: 1.2;
          overflow-wrap: anywhere;
        }

        .welcome-box h1 span { color: #f5c451; }

        .welcome-box p {
          color: #c4c0b4;
          line-height: 1.7;
          margin: 8px 0;
          font-size: 14px;
        }

        .menu-hint {
          display: inline-block;
          margin-top: 12px;
          border: 1px solid rgba(245,196,81,.35);
          color: #f5c451;
          background: rgba(245,196,81,.07);
          padding: 10px 13px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.6;
        }

        .learning-heading {
          margin: 30px 0 18px;
        }

        .learning-heading h2 {
          color: #f3c75b;
          font-size: 23px;
          margin: 0 0 8px;
        }

        .learning-heading p {
          color: #aaa18c;
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
        }

        .lesson-grid {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 15px;
        }

        .lesson-card {
          border: 1px solid rgba(219,173,69,.22);
          background: rgba(255,255,255,.035);
          border-radius: 13px;
          padding: 20px;
          min-width: 0;
        }

        .lesson-number {
          color: #e9bb4e;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .lesson-card h3 {
          color: #f5d681;
          font-size: 18px;
          margin: 10px 0;
        }

        .lesson-card p {
          color: #c3bba8;
          font-size: 13px;
          line-height: 1.75;
          margin: 0;
        }

        .lesson-card ul {
          color: #d1c9b7;
          font-size: 13px;
          line-height: 1.9;
          padding-left: 19px;
          margin: 12px 0 0;
        }

        .lesson-card li::marker { color: #e9bb4e; }

        .strategy-card {
          border-color: rgba(245,196,81,.4);
          background: linear-gradient(135deg,rgba(212,155,35,.09),rgba(255,255,255,.025));
        }

        .important-note {
          margin-top: 22px;
          padding: 18px;
          border-left: 3px solid #e9bb4e;
          background: rgba(245,196,81,.06);
          border-radius: 5px;
          color: #cfc5ad;
          font-size: 13px;
          line-height: 1.8;
        }

        .important-note strong { color: #f5c451; }

        .footer-note {
          position: relative;
          z-index: 2;
          border-top: 1px solid rgba(219,173,69,.2);
          padding: 25px 18px;
          text-align: center;
          color: #aaa18c;
          font-size: 12px;
          line-height: 1.8;
        }

        .footer-note strong {
          color: #e9bb4e;
          letter-spacing: 2px;
        }

        @media(max-width:650px) {
          .public-hero { min-height: 580px; padding-top: 80px; }
          .lesson-grid { grid-template-columns: 1fr; }
          .learning-dashboard { padding-top: 25px; }
          .welcome-box { padding: 22px 17px; }
        }
      `}</style>

      <div className="gold-sun" />

      <div className="coin-rain">
        <div className="coin">$</div>
        <div className="coin">$</div>
        <div className="coin">$</div>
        <div className="coin">$</div>
        <div className="coin">$</div>
      </div>

      {!user ? (
        /* PUBLIC HOMEPAGE - LOGGED OUT */
        <>
          <section className="public-hero">
            <div className="hero-copy">
              <div className="eyebrow">
                ☀ THE ELITES · GOLD MARKET COMMUNITY
              </div>

              <h1>
                XAUUSD
                <br />
                <em>ELITE SIGNALS</em>
              </h1>

              <p>
                A gold trading community focused on structured market
                analysis, trading education, clear trade ideas and
                disciplined risk management.
              </p>

              <div className="hero-actions">
                <Link className="btn btn-gold" href="/auth/register">
                  Create Free Account
                </Link>

                <Link className="btn btn-outline" href="/auth/login">
                  Member Login
                </Link>
              </div>

              <div className="hero-note">
                FREE MEMBERSHIP AVAILABLE · PREMIUM ACCESS BY APPROVAL
              </div>
            </div>
          </section>
        </>
      ) : (
        /* MEMBER AND ADMIN HOMEPAGE - LOGGED IN */
        <section className="learning-dashboard">

          <div className="welcome-box">
            <div className="eyebrow">XAUUSD ELITE SIGNALS · TRADING ACADEMY</div>

            <h1>
              Welcome, <span>{username}</span> 👋
            </h1>

            <p>
              Your trading education starts here. Learn how to read the
              market, identify quality setups, protect your capital and
              build consistency.
            </p>

            <div className="menu-hint">
              ☰ To access your Dashboard, Membership, Premium and Settings:
              tap the four-dot menu at the top-left corner.
            </div>
          </div>

          <div className="learning-heading">
            <h2>Trading Knowledge & Strategies</h2>
            <p>
              Study these important concepts before taking any trade.
              Understand the market first; execute only when your setup is confirmed.
            </p>
          </div>

          <div className="lesson-grid">

            <article className="lesson-card">
              <div className="lesson-number">LESSON 01</div>
              <h3>Understanding Candlesticks</h3>
              <p>
                Every candle tells a story about the battle between buyers
                and sellers during a selected timeframe.
              </p>
              <ul>
                <li>Open, High, Low and Close (OHLC).</li>
                <li>Bullish and bearish candles.</li>
                <li>Candle bodies and upper/lower wicks.</li>
                <li>Pin bars and rejection candles.</li>
                <li>Bullish and bearish engulfing patterns.</li>
                <li>Why candle closing matters.</li>
              </ul>
            </article>

            <article className="lesson-card">
              <div className="lesson-number">LESSON 02</div>
              <h3>Trend Identification</h3>
              <p>
                Identify the direction of the market before looking
                for an entry.
              </p>
              <ul>
                <li>Uptrend: Higher Highs (HH) and Higher Lows (HL).</li>
                <li>Downtrend: Lower Highs (LH) and Lower Lows (LL).</li>
                <li>Sideways market and consolidation.</li>
                <li>Higher timeframe trend analysis.</li>
                <li>Support and resistance zones.</li>
                <li>Using multiple timeframes together.</li>
              </ul>
            </article>

            <article className="lesson-card">
              <div className="lesson-number">LESSON 03</div>
              <h3>Market Structure</h3>
              <p>
                Understand how price moves and how traders identify
                possible changes in market direction.
              </p>
              <ul>
                <li>Market structure and swing highs/lows.</li>
                <li>Break of Structure (BOS).</li>
                <li>Change of Character (CHoCH).</li>
                <li>Liquidity and liquidity sweeps.</li>
                <li>Displacement and Fair Value Gaps (FVG).</li>
                <li>Order Blocks and retests.</li>
              </ul>
            </article>

            <article className="lesson-card strategy-card">
              <div className="lesson-number">LESSON 04</div>
              <h3>Popular Trading Strategies</h3>
              <p>
                Learn these commonly used approaches. No strategy
                guarantees profits; wait for confirmation.
              </p>
              <ul>
                <li>Support and Resistance trading.</li>
                <li>Breakout and Retest strategy.</li>
                <li>Trend Continuation strategy.</li>
                <li>Supply and Demand zones.</li>
                <li>Liquidity Sweep + CHoCH setup.</li>
                <li>FVG and Order Block confluence.</li>
              </ul>
            </article>

            <article className="lesson-card">
              <div className="lesson-number">LESSON 05</div>
              <h3>Risk Management</h3>
              <p>
                Protecting your trading capital is more important
                than chasing a big profit.
              </p>
              <ul>
                <li>Always define your Stop Loss (SL).</li>
                <li>Calculate lot size before entering.</li>
                <li>Understand risk-to-reward (RR).</li>
                <li>Avoid risking too much on one trade.</li>
                <li>Never increase lot size emotionally.</li>
                <li>Respect daily and maximum loss limits.</li>
              </ul>
            </article>

            <article className="lesson-card">
              <div className="lesson-number">LESSON 06</div>
              <h3>Trading Discipline</h3>
              <p>
                A good trading plan needs patience, consistency
                and emotional control.
              </p>
              <ul>
                <li>Follow a written trading plan.</li>
                <li>Avoid revenge trading.</li>
                <li>Do not chase missed entries (FOMO).</li>
                <li>Avoid overtrading.</li>
                <li>Keep a trading journal.</li>
                <li>Accept losses and learn from mistakes.</li>
              </ul>
            </article>

          </div>

          <div className="important-note">
            <strong>THE ELITE TRADER'S RULE:</strong>
            <br />
            Analyse the higher timeframe, identify market direction,
            mark important levels, wait for lower-timeframe confirmation,
            calculate your risk, then execute. If there is no clear setup,
            there is no need to trade.
          </div>

        </section>
      )}

      <section className="footer-note">
        <strong>RISK NOTICE</strong>
        <p>
          Forex and gold trading involve substantial risk. Educational
          information and trade ideas are not financial advice or guaranteed
          profits. Always manage your risk and make independent decisions.
        </p>
        © XAUUSD Elite Signals
      </section>
    </main>
  );
}
