"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function DecisionPanel({ id, status }: { id: number; status: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  async function run(mode: "auto" | "manual", action?: "lulus" | "tolak") {
    setMsg(null);
    const res = await fetch(`/api/applications/${id}/decision`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mode, action })
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error ?? "Gagal");
      return;
    }
    start(() => router.refresh());
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        type="button"
        disabled={pending}
        onClick={() => run("auto")}
        className="rounded-full bg-brand-700 px-3 py-1.5 text-[.72rem] font-bold text-white disabled:opacity-50"
      >
        Nilai auto
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => run("manual", "lulus")}
        className="rounded-full bg-brand-500 px-3 py-1.5 text-[.72rem] font-bold text-white disabled:opacity-50"
      >
        Lulus
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => run("manual", "tolak")}
        className="rounded-full bg-[#c4321f] px-3 py-1.5 text-[.72rem] font-bold text-white disabled:opacity-50"
      >
        Tolak
      </button>
      {msg && <span className="text-[.68rem] text-[#c4321f]">{msg}</span>}
      <span className="sr-only">{status}</span>
    </div>
  );
}