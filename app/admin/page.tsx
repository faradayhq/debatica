import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, getAdminSessionToken, isValidAdminKey, isValidAdminSession } from "@/lib/admin-auth";
import { fetchReports, type ReportRow } from "@/lib/supabase/data";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function hasAdminSession() {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

async function loginAdmin(formData: FormData) {
  "use server";
  const key = formData.get("key");
  if (typeof key !== "string" || !isValidAdminKey(key)) redirect("/admin?error=invalid");
  const token = getAdminSessionToken();
  if (!token) throw new Error("Admin access is not configured.");
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: 60 * 60 * 8
  });
  redirect("/admin");
}

async function requireAdminSession() {
  if (!await hasAdminSession()) throw new Error("Unauthorized admin action.");
}

async function deleteReportedComment(formData: FormData) {
  "use server";
  const reportId = formData.get("reportId");
  await requireAdminSession();
  if (typeof reportId !== "string") throw new Error("Invalid report.");
  const client = getSupabaseAdminClient();
  if (!client) throw new Error("Supabase admin access is not configured.");
  const { data: report, error: reportError } = await client.from("reports").select("comment_id, thread_id, target_type").eq("id", reportId).maybeSingle();
  if (reportError) throw reportError;
  if (!report || report.target_type !== "comment" || !report.comment_id) throw new Error("Reported comment was not found.");
  const { error } = await client.from("comments").delete().eq("id", report.comment_id);
  if (error) throw error;
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/categories");
  revalidatePath("/search");
  if (report.thread_id) revalidatePath(`/thread/${report.thread_id}`);
}

async function deleteReportedThread(formData: FormData) {
  "use server";
  const reportId = formData.get("reportId");
  await requireAdminSession();
  if (typeof reportId !== "string") throw new Error("Invalid report.");
  const client = getSupabaseAdminClient();
  if (!client) throw new Error("Supabase admin access is not configured.");
  const { data: report, error: reportError } = await client.from("reports").select("thread_id, target_type").eq("id", reportId).maybeSingle();
  if (reportError) throw reportError;
  if (!report || report.target_type !== "thread" || !report.thread_id) throw new Error("Reported thread was not found.");
  const { error } = await client.from("threads").delete().eq("id", report.thread_id);
  if (error) throw error;
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/categories");
  revalidatePath("/search");
  revalidatePath(`/thread/${report.thread_id}`);
}

async function dismissReport(formData: FormData) {
  "use server";
  const reportId = formData.get("reportId");
  await requireAdminSession();
  if (typeof reportId !== "string") throw new Error("Invalid report.");
  const client = getSupabaseAdminClient();
  if (!client) throw new Error("Supabase admin access is not configured.");
  const { error } = await client.from("reports").delete().eq("id", reportId);
  if (error) throw error;
  revalidatePath("/admin");
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  if (!await hasAdminSession()) {
    return (
      <div className="page inner-page admin-page">
        <header className="page-intro"><span className="section-index">RESTRICTED</span><h1>Moderator access</h1><p>Enter the administrator key to continue.</p></header>
        <form className="create-form admin-login-form" action={loginAdmin}>
          <label><span>Administrator key</span><input type="password" name="key" required autoComplete="current-password" /></label>
          {error === "invalid" && <p className="form-error" role="alert">The administrator key is invalid.</p>}
          <button className="primary-button" type="submit">Continue</button>
        </form>
      </div>
    );
  }

  const client = getSupabaseAdminClient();
  if (!client) {
    return <div className="page inner-page admin-page"><p className="data-status error" role="alert">Supabase admin access is not configured.</p></div>;
  }

  let reports: ReportRow[] = [];
  let loadError = "";
  try {
    reports = await fetchReports(client);
  } catch {
    loadError = "Could not load reports.";
  }

  return (
    <div className="page inner-page admin-page">
      <header className="page-intro"><span className="section-index">MODERATION</span><h1>Reports</h1><p>Review reports submitted by guest participants.</p></header>
      {loadError && <p className="data-status error" role="alert">{loadError}</p>}
      {!loadError && (
        <section aria-labelledby="reports-title">
          <div className="admin-section-heading"><span className="section-index">QUEUE</span><h2 id="reports-title">Recent reports</h2><p>{reports.length} report{reports.length === 1 ? "" : "s"}</p></div>
          <div className="admin-grid">
            {reports.map((report, index) => (
              <article className="admin-card report-admin-card" key={report.id}>
                <span className="admin-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{report.target_type} {report.target_id ? `#${report.target_id}` : "report"}</p>
                  <small>Guest #{report.guest_id} · {new Date(report.created_at).toLocaleString()}</small>
                </div>
                <div className="admin-report-actions">
                  {report.target_type === "thread" && report.thread_id && (
                    <form action={deleteReportedThread}>
                      <input type="hidden" name="reportId" value={report.id} />
                      <button className="comment-delete-button admin-delete-button" type="submit">Delete thread</button>
                    </form>
                  )}
                  {report.target_type === "comment" && report.comment_id && (
                    <form action={deleteReportedComment}>
                      <input type="hidden" name="reportId" value={report.id} />
                      <button className="comment-delete-button admin-delete-button" type="submit">Delete comment</button>
                    </form>
                  )}
                  <form action={dismissReport}>
                    <input type="hidden" name="reportId" value={report.id} />
                    <button className="admin-dismiss-button" type="submit">Dismiss</button>
                  </form>
                </div>
              </article>
            ))}
            {!reports.length && <div className="admin-note"><b>No reports</b><p>The moderation queue is currently empty.</p></div>}
          </div>
        </section>
      )}
    </div>
  );
}
