import { NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { getApplication, logDecision, saveDecision } from "@/lib/db";
import { evaluate } from "@/lib/decision";
import { decisionSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ ok: false, error: "Tidak dibenarkan" }, { status: 401 });
  }

  const id = Number((await params).id);
  const row = getApplication(id);
  if (!row) return NextResponse.json({ ok: false, error: "Permohonan tidak dijumpai" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const parsed = decisionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Input tidak sah" }, { status: 422 });
  }

  if (parsed.data.mode === "manual") {
    if (!parsed.data.action) {
      return NextResponse.json({ ok: false, error: "action diperlukan" }, { status: 422 });
    }
    saveDecision.run({
      id,
      status: parsed.data.action,
      score: row.score ?? null,
      reasons: row.reasons ?? "Keputusan manual",
      actor: "manual"
    });
    logDecision.run({ id, verdict: parsed.data.action, score: row.score ?? null, note: parsed.data.note, actor: "manual" });
    return NextResponse.json({ ok: true, status: parsed.data.action });
  }

  if (!row.income || !row.age || !row.employment || !row.credit_grade) {
    return NextResponse.json(
      { ok: false, error: "Data pemohon tidak lengkap untuk penilaian automatik (umur, pendapatan, pekerjaan, gred kredit)" },
      { status: 422 }
    );
  }

  const result = evaluate({
    amount: row.amount,
    tenure: row.tenure,
    age: row.age,
    income: row.income,
    employment: row.employment as never,
    existingLoans: row.existing_loans ?? 0,
    creditGrade: row.credit_grade as never
  });

  saveDecision.run({
    id,
    status: result.verdict,
    score: result.score,
    reasons: JSON.stringify({ score: result.score, reasons: result.reasons, rejects: result.hardRejects }),
    actor: "auto"
  });
  logDecision.run({ id, verdict: result.verdict, score: result.score, note: parsed.data.note, actor: "auto" });

  return NextResponse.json({ ok: true, ...result });
}