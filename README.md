# XAUUSD ELITE SIGNALS — Version 1.0

A responsive Next.js + Supabase app for manually published XAUUSD trade ideas. It includes email/password registration, member dashboard, free/premium signal feed, admin publishing, signal status updates, member premium approval/suspension, and database Row Level Security (RLS).

## Important security model

- A new account is always created as `member` with `premium_status = pending`.
- There is no client-side role switcher.
- Only the admin role stored in `public.profiles` can publish/edit/delete signals or approve memberships. Premium approval is performed through a guarded database function; normal users cannot change their own premium status.
- Supabase RLS filters premium signal rows in the database. Free members do not receive premium rows in their query results.
- The frontend uses only the Supabase public/anon key. Never put a Supabase service-role key in a `NEXT_PUBLIC_` variable or browser code.
- The initial admin is promoted manually in the SQL Editor after registering the intended admin email.

## 1. Create Supabase project

1. Visit https://supabase.com and create a project.
2. Save the database password somewhere safe.
3. Open **SQL Editor** → **New query**.
4. Copy all of `supabase/schema.sql` into the editor and run it.
5. Open **Project Settings → API** (or API Keys, depending on dashboard layout). Copy the Project URL and the public anon/publishable key.

## 2. Configure environment

1. Copy `.env.example` to `.env.local`.
2. Fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_OR_PUBLISHABLE_KEY
```

Use the public/anon key only. Do not add a service-role/secret key.

## 3. Install and run locally

Install Node.js 20.9+ (or the current Node version required by Next.js 16), then in this folder run:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## 4. Configure email authentication

In Supabase → **Authentication → URL Configuration**, add:

- Site URL: `http://localhost:3000` while testing.
- Redirect URL: `http://localhost:3000/**`.

For a live deployment, add the Vercel domain too. Email confirmation may be enabled; if enabled, users must confirm their email before login. Configure SMTP for reliable production email delivery.

## 5. Create PIXLEY021 administrator

1. Register the intended administrator email through the app's `/auth/register` page. Use the display name `PIXLEY021`.
2. Confirm the email if Supabase confirmation is enabled.
3. In Supabase → SQL Editor, run this statement after replacing the email with the exact account email:

```sql
update public.profiles p
set role = 'admin'::public.app_role, display_name = 'PIXLEY021'
from auth.users u
where p.id = u.id
  and lower(u.email) = lower('YOUR_VERIFIED_ADMIN_EMAIL');
```

4. Sign out and sign back in. The Admin link should now appear. The database remains the authority; changing browser code cannot grant admin access.

## 6. Publish your first signal

1. Sign in as PIXLEY021.
2. Open **Admin**.
3. Select BUY or SELL and FREE or PREMIUM.
4. Enter Entry, Stop Loss, TP1, TP2, timeframe and a clear analysis.
5. Publish. The server action and database RLS both check admin permissions.
6. Use the status selector to mark OPEN, TP1 HIT, TP2 HIT, SL HIT or CLOSED. Delete only if a signal was published by mistake.

Signals are manual trade ideas. No live market price feed or automated signal generation is included in v1.0.

## 7. Approve a premium member

In the Admin dashboard → Registered users, review the member's email and change their status to **Approve premium** and save. Choose **Suspend** to revoke premium access. RLS applies the new status to future signal reads.

## 8. Deploy to Vercel

1. Push this folder to a private or public GitHub repository.
2. Sign in at https://vercel.com and import that repository.
3. In Vercel project settings → Environment Variables, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for Production, Preview and Development as appropriate.
4. Deploy. Vercel will run the Next.js build.
5. In Supabase → Authentication → URL Configuration, set the Site URL to your Vercel domain (for example `https://your-project.vercel.app`) and add the Vercel callback/redirect URL.
6. Test registration, login, free signal visibility, premium approval, and admin publishing using separate test accounts.

## Current v1.0 scope

Included: registration/login, profile creation, dashboard, free and premium signal access, admin signal CRUD/status controls, member listing, manual premium approval/suspension, responsive black/gold UI, risk disclaimer.

Not included yet: payment collection/M-Pesa, Telegram, push notifications, automated trading, live gold prices, email alerts, detailed P/L analytics, password reset UI, avatar uploads, and formal automated RLS test suite. Add these in later releases after v1.0 is deployed and tested.

## Troubleshooting

- **No admin page:** verify the correct email was promoted in SQL, then sign out/in.
- **No profile row:** check that the SQL schema and `on_auth_user_created` trigger were installed; new signups should create a profile automatically.
- **Email confirmation link fails:** update Supabase Site URL and Redirect URLs to match your deployed domain.
- **Premium signal not visible:** confirm the member's `premium_status` is `approved`, then sign out/in and reload.
- **Build fails:** check the Vercel build log and verify the environment variables are set for the environment being deployed.

## Risk disclaimer

Forex and gold trading carry a high risk of loss. The platform provides educational market commentary and trade ideas only, not financial advice, portfolio management, or guaranteed results. Members are responsible for their own decisions, position sizing and risk controls.
