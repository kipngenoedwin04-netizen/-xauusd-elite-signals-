"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home-page">

      <style jsx>{`
        .home-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 50% 25%, rgba(212, 155, 35, 0.17), transparent 45%),
            linear-gradient(145deg, #050505, #11100b 55%, #050505);
          color: #fff;
        }

        .gold-sun {
          position: absolute;
          top: 70px;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, #fff8c5 0%, #f8d66d 12%, #d99b20 35%, rgba(212,155,35,0.1) 68%, transparent 72%);
          filter: blur(3px);
          opacity: 0.8;
          box-shadow: 0 0 100px rgba(255, 190, 50, 0.3);
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
          background: linear-gradient(145deg, #fff1a8, #e8b52e, #9b6410);
          border: 2px solid #ffe28a;
          border-radius: 50%;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          font-weight: 900;
          box-shadow: 0 0 20px rgba(255, 193, 55, 0.35);
          animation: coinDrop linear infinite;
        }

        .coin:nth-child(1) { left: 8%; animation-duration: 9s; animation-delay: 0s; }
        .coin:nth-child(2) { left: 25%; animation-duration: 12s; animation-delay: 3s; }
        .coin:nth-child(3) { left: 48%; animation-duration: 10s; animation-delay: 1s; }
        .coin:nth-child(4) { left: 70%; animation-duration: 13s; animation-delay: 4s; }
        .coin:nth-child(5) { left: 88%; animation-duration: 11s; animation-delay: 2s; }

        @keyframes coinDrop {
          0% { transform: translateY(-80px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }

        .hero {
          position: relative;
          z-index: 2;
          min-height: 650px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 100px 20px 70px;
        }

        .hero-copy {
          max-width: 780px;
        }

        .eyebrow {
          color: #e8bd58;
          font-size: 12px;
          letter-spacing: 3px;
          font-weight: 800;
          margin-bottom: 25px;
        }

        .hero h1 {
          font-size: clamp(42px, 8vw, 78px);
          line-height: 1.05;
          font-weight: 900;
          margin: 0;
          letter-spacing: -2px;
          text-shadow: 0 0 35px rgba(255, 196, 70, 0.15);
        }

        .hero h1 em {
          color: #f5c451;
          font-style: normal;
          text-shadow: 0 0 25px rgba(245, 196, 81, 0.4);
        }

        .hero p {
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
          padding: 15px 25px;
          border-radius: 8px;
          font-weight: 800;
          text-decoration: none;
          transition: 0.25s;
        }

        .btn-gold {
          color: #171006;
          background: linear-gradient(135deg, #fff0a8, #e7b438, #bd8117);
          box-shadow: 0 0 25px rgba(231, 180, 56, 0.2);
        }

        .btn-gold:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 35px rgba(231, 180, 56, 0.5);
        }

        .btn-outline {
          color: #f5c451;
          border: 1px solid #b88b35;
          background: rgba(255,255,255,0.03);
        }

        .btn-outline:hover {
          background: rgba(245, 196, 81, 0.1);
        }

        .hero-note {
          margin-top: 22px;
          font-size: 12px;
          color: #aaa18c;
        }

        .stats-row {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          max-width: 900px;
          margin: 0 auto;
          padding: 25px 15px 55px;
          gap: 15px;
          text-align: center;
        }

        .stats-row div {
          padding: 20px 10px;
          border: 1px solid rgba(219, 173, 69, 0.2);
          background: rgba(255,255,255,0.025);
          border-radius: 12px;
        }

        .stats-row b {
          display: block;
          color: #e9bb4e;
          font-size: 25px;
          margin-bottom: 8px;
        }

        .stats-row span {
          color: #c3bba8;
          font-size: 13px;
          line-height: 1.6;
        }

        .section {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 0 auto;
          padding: 20px 20px 60px;
          text-align: center;
        }

        .section h2 {
          color: #f3c75b;
          font-size: 28px;
        }

        .section p {
          color: #bdb7a8;
          line-height: 1.8;
        }

        .risk-strip {
          position: relative;
          z-index: 2;
          border-top: 1px solid rgba(219, 173, 69, 0.2);
          padding: 25px 20px;
          text-align: center;
          color: #aaa18c;
          font-size: 12px;
          line-height: 1.7;
        }

        .risk-strip b {
          color: #e9bb4e;
          letter-spacing: 2px;
        }

        @media (max-width: 600px) {
          .hero { min-height: 580px; padding-top: 80px; }
          .gold-sun { width: 230px; height: 230px; top: 100px; }
          .stats-row { grid-template-columns: 1fr; max-width: 340px; }
          .hero p { font-size: 14px; }
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

      <section className="hero">
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
            Welcome to XAUUSD Elite Signals — a gold trading community
            focused on structured market analysis, clear entry levels,
            stop losses and take-profit targets. Join our community and
            trade with clarity and discipline.
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

      <section className="stats-row">
        <div>
          <b>01</b>
          <span>One focused market<br />XAUUSD Gold</span>
        </div>

        <div>
          <b>02</b>
          <span>Structured trade ideas<br />Entry · SL · TP</span>
        </div>

        <div>
          <b>03</b>
          <span>Two membership levels<br />Free + Premium</span>
        </div>
      </section>

      <section className="section">
        <div className="eyebrow">WELCOME TO THE COMMUNITY</div>
        <h2>Trade Gold With Discipline.</h2>
        <p>
          Create a free account to access your member dashboard and free
          signals. Premium members receive access to both free and premium
          signals after administrator approval.
        </p>
      </section>

      <section className="risk-strip">
        <b>RISK NOTICE</b>
        <p>
          Forex and gold trading involve substantial risk. Our signals are
          educational market ideas, not financial advice or guaranteed
          profits. Always manage your risk and make your own trading decisions.
        </p>
        © XAUUSD Elite Signals
      </section>

    </main>
  );
}
