import { NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validation";
import { insertApplication, listApplications, statsSummary } from "@/lib/db";
import { makeRef } from "@/lib/utils";
import { isLoggedIn } from "@/lib/auth";

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const window = 60_000;
  const list = (hits.get(ip) ?? []).filter((t) => now - t < window);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Terlalu banyak permohonan. Cuba semula sebentar." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON tidak sah" }, { status: 400 });
  }

  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Data tidak lengkap", fields: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const ref = makeRef();
  insertApplication.run({
    ref,
    amount: parsed.data.amount,
    tenure: parsed.data.tenure,
    name: parsed.data.name,
    ic: parsed.data.ic,
    phone: parsed.data.phone,
    email: parsed.data.email,
    utm: parsed.data.utm ?? ""
  });

  return NextResponse.json({ ok: true, ref }, { status: 201 });
}

export async function GET() {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ ok: false, error: "Tidak dibenarkan" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, rows: listApplications(), stats: statsSummary() });
}