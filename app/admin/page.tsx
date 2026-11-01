
import { SubmitButton } from "@/components/submit-button";
import { requireAdmin } from "@/lib/auth";
import {
  createSignal,
  deleteSignal,
  editSignal,
  setPremiumStatus,
  updateSignalStatus,
} from "@/app/actions/signals";
import { SignalCard, type Signal } from "@/components/signal-card";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;

  const [{ data: signals }, { data: users }] = await Promise.all([
    supabase
      .from("signals")
      .select(
        "id,post_type,direction,access,entry,stop_loss,tp1,tp2,timeframe,analysis,status,created_at,image_url"
      )
      .order("created_at", { ascending: false })
      .limit(100),

    supabase
      .from("profiles")
      .select("id,display_name,email,role,premium_status,created_at")
      .order("created_at", { ascending: false })
      .limit(200),
  ]);

  return (
    <main className="dashboard-page">
      <div className="dashboard-head">
        <div>
          <div className="eyebrow">CONTROL ROOM</div>
          <h1>
            Admin <em>dashboard</em>
          </h1>
          <p>
            Signed in with an administrator account. Changes are protected by
            database policies.
          </p>
        </div>

        <span className="membership-pill premium">
          PIXLEY021 · ADMIN
        </span>
      </div>

      {params.error && (
        <div className="notice error">{params.error}</div>
      )}

      {params.message && (
        <div className="notice">{params.message}</div>
      )}

      <div className="admin-layout">
        {/* TRADING SIGNAL FORM */}
        <section className="admin-box">
          <div className="eyebrow">PUBLISH NEW TRADE IDEA</div>
          <h2>Create trading signal</h2>

          <form action={createSignal} className="admin-form">
            <input type="hidden" name="post_type" value="signal" />

            <label>
              Direction
              <select name="direction" required>
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </label>

            <label>
              Access
              <select name="access">
                <option value="free">FREE</option>
                <option value="premium">PREMIUM</option>
              </select>
            </label>

            <label>
              Entry
              <input
                name="entry"
                type="number"
                step="0.01"
                min="0.01"
                required
              />
            </label>

            <label>
              Stop loss
              <input
                name="stop_loss"
                type="number"
                step="0.01"
                min="0.01"
                required
              />
            </label>

            <label>
              Take profit 1
              <input
                name="tp1"
                type="number"
                step="0.01"
                min="0.01"
                required
              />
            </label>

            <label>
              Take profit 2
              <input
                name="tp2"
                type="number"
                step="0.01"
                min="0.01"
                required
              />
            </label>

            <label className="span-two">
              Timeframe
              <input
                name="timeframe"
                placeholder="e.g. H1 / M15"
                required
                maxLength={20}
              />
            </label>

            <label className="span-two">
              Market analysis (optional)
              <textarea
                name="analysis"
                rows={4}
                maxLength={2000}
                placeholder="Optional: Explain market structure, key levels and confirmation..."
              />
            </label>

            <label className="span-two">
              Upload chart screenshot (optional)
              <input
                type="file"
                name="image"
                accept="image/jpeg,image/png,image/webp"
              />
              <small>JPG, PNG or WEBP · Maximum 12MB</small>
            </label>

            <SubmitButton
              className="btn btn-gold span-two"
              pendingLabel="Publishing..."
            >
              Publish XAUUSD signal
            </SubmitButton>
          </form>
        </section>

        {/* MEMBERSHIP MANAGEMENT */}
        <section className="admin-box">
          <div className="eyebrow">MEMBERSHIP MANAGEMENT</div>
          <h2>Registered users</h2>

          <div className="user-list">
            {users?.map((u) => (
              <div className="user-row" key={u.id}>
                <div>
                  <b>{u.display_name || "Member"}</b>
                  <small>
                    {u.email || "No email"} · {u.role.toUpperCase()} ·{" "}
                    {u.premium_status.toUpperCase()}
                  </small>
                </div>

                {u.role !== "admin" && (
                  <form action={setPremiumStatus}>
                    <input
                      type="hidden"
                      name="user_id"
                      value={u.id}
                    />

                    <select
                      name="premium_status"
                      defaultValue={u.premium_status}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approve premium</option>
                      <option value="suspended">Suspend</option>
                    </select>

                    <SubmitButton
                      className="mini-button"
                      pendingLabel="Saving..."
                    >
                      Save
                    </SubmitButton>
                  </form>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* STANDALONE MARKET ANALYSIS FORM */}
      <section className="section admin-box">
        <div className="eyebrow">MARKET INTELLIGENCE</div>
        <h2>Publish market analysis</h2>

        <p className="muted">
          Share your XAUUSD market outlook, fundamental analysis or technical
          breakdown without publishing a BUY or SELL signal.
        </p>

        <form action={createSignal} className="admin-form">
          <input type="hidden" name="post_type" value="analysis" />

          <input type="hidden" name="access" value="free" />

          <label className="span-two">
            Timeframe (optional)
            <input
              name="timeframe"
              placeholder="e.g. H4 / H1 / Daily"
              maxLength={20}
            />
          </label>

          <label className="span-two">
            Your market analysis
            <textarea
              name="analysis"
              rows={7}
              required
              maxLength={2000}
              placeholder="Example: Gold is showing bearish pressure on H4. Price is approaching a key support zone..."
            />
          </label>

          <label className="span-two">
            Upload chart screenshot (optional)
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp"
            />
            <small>JPG, PNG or WEBP · Maximum 12MB</small>
          </label>

          <SubmitButton
            className="btn btn-gold span-two"
            pendingLabel="Publishing..."
          >
            Publish market analysis
          </SubmitButton>
        </form>
      </section>

      {/* PUBLISHED POSTS */}
      <section className="section admin-signals">
        <div className="section-heading">
          <div>
            <div className="eyebrow">CONTENT MANAGEMENT</div>
            <h2>Published posts</h2>
          </div>

          <span className="muted">
            {signals?.length ?? 0} shown
          </span>
        </div>

        {signals?.length ? (
          <div className="admin-signal-list">
            {signals.map((s) => {
              const postType = s.post_type || "signal";
              const isAnalysis = postType === "analysis";

              return (
                <div className="admin-signal-item" key={s.id}>
                  <SignalCard signal={s as Signal} />

                  <div className="signal-actions">
                    <form action={updateSignalStatus}>
                      <input
                        type="hidden"
                        name="id"
                        value={s.id}
                      />

                      <select name="status" defaultValue={s.status}>
                        <option>OPEN</option>
                        <option>TP1 HIT</option>
                        <option>TP2 HIT</option>
                        <option>SL HIT</option>
                        <option>CLOSED</option>
                      </select>

                      <SubmitButton
                        className="mini-button"
                        pendingLabel="Updating..."
                      >
                        Update status
                      </SubmitButton>
                    </form>

                    <form action={deleteSignal}>
                      <input
                        type="hidden"
                        name="id"
                        value={s.id}
                      />

                      <SubmitButton
                        className="mini-button danger-button"
                        pendingLabel="Deleting..."
                      >
                        Delete
                      </SubmitButton>
                    </form>
                  </div>

                  <details className="edit-details">
                    <summary>
                      Edit {isAnalysis ? "market analysis" : "signal details"}
                    </summary>

                    <form
                      action={editSignal}
                      className="admin-form edit-form"
                    >
                      <input
                        type="hidden"
                        name="id"
                        value={s.id}
                      />

                      <input
                        type="hidden"
                        name="post_type"
                        value={postType}
                      />

                      {isAnalysis ? (
                        <>
                          <input
                            type="hidden"
                            name="access"
                            value="free"
                          />

                          <label className="span-two">
                            Timeframe (optional)
                            <input
                              name="timeframe"
                              defaultValue={s.timeframe ?? ""}
                              maxLength={20}
                            />
                          </label>

                          <label className="span-two">
                            Market analysis
                            <textarea
                              name="analysis"
                              rows={5}
                              defaultValue={s.analysis ?? ""}
                              required
                              maxLength={2000}
                            />
                          </label>
                        </>
                      ) : (
                        <>
                          <label>
                            Direction
                            <select
                              name="direction"
                              defaultValue={s.direction ?? "BUY"}
                            >
                              <option value="BUY">BUY</option>
                              <option value="SELL">SELL</option>
                            </select>
                          </label>

                          <label>
                            Access
                            <select
                              name="access"
                              defaultValue={s.access}
                            >
                              <option value="free">FREE</option>
                              <option value="premium">PREMIUM</option>
                            </select>
                          </label>

                          <label>
                            Entry
                            <input
                              name="entry"
                              type="number"
                              step="0.01"
                              min="0.01"
                              defaultValue={s.entry ?? ""}
                              required
                            />
                          </label>

                          <label>
                            Stop loss
                            <input
                              name="stop_loss"
                              type="number"
                              step="0.01"
                              min="0.01"
                              defaultValue={s.stop_loss ?? ""}
                              required
                            />
                          </label>

                          <label>
                            Take profit 1
                            <input
                              name="tp1"
                              type="number"
                              step="0.01"
                              min="0.01"
                              defaultValue={s.tp1 ?? ""}
                              required
                            />
                          </label>

                          <label>
                            Take profit 2
                            <input
                              name="tp2"
                              type="number"
                              step="0.01"
                              min="0.01"
                              defaultValue={s.tp2 ?? ""}
                              required
                            />
                          </label>

                          <label className="span-two">
                            Timeframe
                            <input
                              name="timeframe"
                              defaultValue={s.timeframe ?? ""}
                              required
                              maxLength={20}
                            />
                          </label>

                          <label className="span-two">
                            Market analysis (optional)
                            <textarea
                              name="analysis"
                              rows={3}
                              defaultValue={s.analysis ?? ""}
                              maxLength={2000}
                            />
                          </label>
                        </>
                      )}

                      <label className="span-two">
                        Replace chart screenshot (optional)
                        <input
                          type="file"
                          name="image"
                          accept="image/jpeg,image/png,image/webp"
                        />
                        <small>JPG, PNG or WEBP · Maximum 12MB</small>
                      </label>

                      <SubmitButton
                        className="mini-button span-two"
                        pendingLabel="Saving..."
                      >
                        Save changes
                      </SubmitButton>
                    </form>
                  </details>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            No posts yet. Publish your first signal or market analysis above.
          </div>
        )}
      </section>
    </main>
  );
        }
        
