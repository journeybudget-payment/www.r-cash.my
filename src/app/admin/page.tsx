import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { listApplications, statsSummary } from "@/lib/db";
import { rm } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isLoggedIn())) redirect("/admin/login");

  const rows = listApplications();
  const stats = statsSummary();

  return (
    <main className="min-h-screen bg-cream px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl">Permohonan</h1>
          <form action="/api/admin/logout" method="post">
            <button className="rounded-full border border-[#e1e6df] bg-white px-5 py-2.5 text-sm font-bold">Log keluar</button>
          </form>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {[
            { l: "Jumlah permohonan", v: String(stats.total) },
            { l: "Hari ini", v: String(stats.today ?? 0) },
            { l: "Nilai dimohon", v: rm(stats.volume) }
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-[#e1e6df] bg-white p-5">
              <small className="text-[.72rem] uppercase tracking-[.1em] text-body">{s.l}</small>
              <strong className="mt-1 block text-xl">{s.v}</strong>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#e1e6df] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50 text-[.75rem] uppercase tracking-[.08em] text-brand-800">
              <tr>
                {["Rujukan", "Nama", "Telefon", "Jumlah", "Tempoh", "Status", "Masa"].map((h) => (
                  <th key={h} className="px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-body">Tiada permohonan lagi.</td></tr>
              )}
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-[#e1e6df]">
                  <td className="px-4 py-3 font-mono text-xs">{r.ref}</td>
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3">{r.phone}</td>
                  <td className="px-4 py-3">{rm(r.amount)}</td>
                  <td className="px-4 py-3">{r.tenure} bln</td>
                  <td className="px-4 py-3">{r.status}</td>
                  <td className="px-4 py-3 text-xs text-body">{r.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}