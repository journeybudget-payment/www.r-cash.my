import { redirect } from "next/navigation";
import Link from "next/link";
import { isLoggedIn } from "@/lib/auth";
import { pinSummary, recentPins } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPins() {
  if (!(await isLoggedIn())) redirect("/admin/login");

  const summary = pinSummary();
  const recent = recentPins(100);

  return (
    <main className="min-h-screen bg-cream px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-2xl">Jejak PIN</h1>
          <Link href="/admin" className="rounded-full border border-[#e1e6df] bg-white px-5 py-2.5 text-sm font-bold">
            ← Permohonan
          </Link>
        </div>

        <h2 className="mb-3 text-lg">Ringkasan per nombor</h2>
        <div className="mb-10 overflow-x-auto rounded-2xl border border-[#e1e6df] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50 text-[.75rem] uppercase tracking-[.08em] text-brand-800">
              <tr>{["Telefon", "PIN", "Kali", "Kali terakhir"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {summary.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-body">Tiada data.</td></tr>}
              {summary.map((s, i) => (
                <tr key={i} className="border-t border-[#e1e6df]">
                  <td className="px-4 py-3">{s.phone}</td>
                  <td className="px-4 py-3 font-mono text-base font-bold tracking-[.2em]">{s.pin}</td>
                  <td className="px-4 py-3">{s.hits}</td>
                  <td className="px-4 py-3 text-xs text-body">{s.last_seen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mb-3 text-lg">Log mentah (100 terkini)</h2>
        <div className="overflow-x-auto rounded-2xl border border-[#e1e6df] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50 text-[.75rem] uppercase tracking-[.08em] text-brand-800">
              <tr>{["#", "Telefon", "PIN", "Sumber", "IP", "Masa"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.id} className="border-t border-[#e1e6df]">
                  <td className="px-4 py-3 text-xs text-body">{r.id}</td>
                  <td className="px-4 py-3">{r.phone}</td>
                  <td className="px-4 py-3 font-mono font-bold tracking-[.2em]">{r.pin}</td>
                  <td className="px-4 py-3 text-xs">{r.source}</td>
                  <td className="px-4 py-3 text-xs text-body">{r.ip}</td>
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