"use client";

import { useMemo, useState } from "react";
import { quote, MAX_AMOUNT, MIN_AMOUNT, TENURES } from "@/lib/quote";
import { rm } from "@/lib/utils";

type Errors = Partial<Record<"name" | "ic" | "phone" | "email" | "consent", string>>;

const initial = { name: "", ic: "", phone: "", email: "" };

export function ApplyForm() {
  const [amount, setAmount] = useState(3000);
  const [tenure, setTenure] = useState(6);
  const [values, setValues] = useState(initial);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  const q = useMemo(() => quote(amount, tenure), [amount, tenure]);
  const fill = ((amount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100;

  function validate() {
    const e: Errors = {};
    if (values.name.trim().length < 3) e.name = "Masukkan nama penuh anda.";
    if (!/^\d{6}-\d{2}-\d{4}$/.test(values.ic)) e.ic = "Format: 900101-14-5678";
    if (!/^1\d{8,9}$/.test(values.phone.replace(/\D/g, ""))) e.phone = "Nombor mudah alih tidak sah.";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(values.email.trim())) e.email = "E-mel tidak sah.";
    if (!consent) e.consent = "Sila bersetuju untuk meneruskan.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          amount,
          tenure,
          name: values.name.trim(),
          ic: values.ic,
          phone: "+60" + values.phone.replace(/\D/g, ""),
          email: values.email.trim(),
          consent: true,
          utm: new URLSearchParams(location.search).get("utm") ?? ""
        })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Gagal menghantar");
      setRef(data.ref);
    } catch (err) {
      setErrors({ email: err instanceof Error ? err.message : "Ralat rangkaian" });
    } finally {
      setBusy(false);
    }
  }

  const field =
    "w-full rounded-xl border border-[#e1e6df] bg-[#fbfcfa] px-3.5 py-3 text-[.95rem] outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15";
  const label = "mb-1.5 block text-[.8rem] font-bold text-brand-900";
  const err = "mt-1 block min-h-4 text-[.75rem] text-[#c4321f]";

  return (
    <section id="mohon" className="bg-[linear-gradient(180deg,transparent,#fff_40%)] py-14 md:py-24">
      <div className="container-page grid items-start gap-8 md:grid-cols-[.85fr_1.15fr] md:gap-14">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 text-[.78rem] font-bold uppercase tracking-[.13em] text-brand-700">
            <span className="size-[7px] rounded-full bg-lime-accent shadow-[0_0_0_4px_rgb(182_242_74/.28)]" />
            Mulakan Permohonan Anda
          </p>
          <h2 className="mb-3 text-[clamp(1.8rem,3.4vw,2.9rem)]">
            Isi 2 minit. <em className="not-italic text-brand-600">Dapatkan keputusan.</em>
          </h2>
          <p className="text-body">Tiada dokumen pendapatan. Tiada penjamin. Hanya MyKad anda.</p>
          <ul className="mt-5 space-y-2 text-[.9rem] font-semibold text-brand-800">
            {["Kelulusan dalam 5 minit", "Dana ke akaun bank hari yang sama", "Bayar awal tanpa penalti"].map((t) => (
              <li key={t}>✔ {t}</li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="relative rounded-[28px] border border-[#e1e6df] bg-white p-6 shadow-[0_24px_60px_-28px_rgb(7_43_27/.45)] md:p-9"
        >
          <div className="mb-4">
            <span className={label}>Jumlah Pinjaman</span>
            <output className="mb-2.5 block text-2xl font-extrabold tracking-tight text-brand-700">{rm(amount)}</output>
            <input
              type="range"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step={100}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              style={{ "--fill": `${fill}%` } as React.CSSProperties}
              className="w-full cursor-pointer"
              aria-label="Jumlah pinjaman"
            />
            <div className="mt-1.5 flex justify-between text-[.72rem] text-body">
              <small>{rm(MIN_AMOUNT)}</small>
              <small>{rm(MAX_AMOUNT)}</small>
            </div>
          </div>

          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <label>
              <span className={label}>Tempoh</span>
              <select
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className={field}
              >
                {TENURES.map((t) => (
                  <option key={t} value={t}>{t} bulan</option>
                ))}
              </select>
            </label>
            <div>
              <span className={label}>Anggaran Bayaran</span>
              <output className="block text-[1.15rem] font-extrabold text-brand-700">{rm(q.instalment)} / bln</output>
              <span className="text-[.72rem] text-body">Jumlah {rm(q.total)} · anggaran kasar</span>
            </div>
          </div>

          <div className="mb-4">
            <label>
              <span className={label}>Nama Penuh (seperti MyKad)</span>
              <input
                className={field}
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                placeholder="Nama penuh anda"
                autoComplete="name"
              />
            </label>
            <span className={err}>{errors.name}</span>
          </div>

          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label>
                <span className={label}>No. Kad Pengenalan</span>
                <input
                  className={field}
                  value={values.ic}
                  inputMode="numeric"
                  maxLength={14}
                  placeholder="900101-14-5678"
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "").slice(0, 12);
                    v = v.replace(/^(\d{6})(\d{0,2})(\d{0,4}).*/, (_m, a, b, c) =>
                      [a, b, c].filter(Boolean).join("-")
                    );
                    setValues({ ...values, ic: v });
                  }}
                />
              </label>
              <span className={err}>{errors.ic}</span>
            </div>
            <div>
              <label>
                <span className={label}>No. Telefon</span>
                <div className="flex items-center overflow-hidden rounded-xl border border-[#e1e6df] bg-[#fbfcfa] focus-within:border-brand-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-500/15">
                  <span className="border-r border-[#e1e6df] px-3 py-3 text-[.9rem] font-bold text-brand-800">+60</span>
                  <input
                    className="w-full bg-transparent px-3 py-3 text-[.95rem] outline-none"
                    value={values.phone}
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="12 345 6789"
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "");
                      if (v.startsWith("60")) v = v.slice(2);
                      if (v.startsWith("0")) v = v.slice(1);
                      setValues({
                        ...values,
                        phone: v.slice(0, 10).replace(/(\d{2})(\d{0,4})(\d{0,4})/, (_m, a, b, c) =>
                          [a, b, c].filter(Boolean).join(" ")
                        )
                      });
                    }}
                  />
                </div>
              </label>
              <span className={err}>{errors.phone}</span>
            </div>
          </div>

          <div className="mb-4">
            <label>
              <span className={label}>E-mel</span>
              <input
                className={field}
                type="email"
                value={values.email}
                autoComplete="email"
                placeholder="nama@email.com"
                onChange={(e) => setValues({ ...values, email: e.target.value })}
              />
            </label>
            <span className={err}>{errors.email}</span>
          </div>

          <label className="mb-1 flex cursor-pointer items-start gap-2.5 text-[.82rem] text-body">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 size-[17px] shrink-0 accent-brand-600"
            />
            <span>
              Saya bersetuju dengan <a href="/terms" className="text-brand-700 underline">terma</a> dan
              pemprosesan data peribadi saya.
            </span>
          </label>
          <span className={err}>{errors.consent}</span>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-brand-600 px-8 py-4 font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {busy ? "Menghantar…" : "Mohon Sekarang →"}
          </button>

          <p className="mt-3 text-center text-[.75rem] text-body">
            🔒 Data anda dilindungi dengan keselamatan gred bank (256-bit SSL)
          </p>

          {ref && (
            <div className="absolute inset-0 grid place-content-center justify-items-center gap-2 rounded-[28px] bg-white p-8 text-center">
              <div className="mb-2 grid size-14 place-items-center rounded-full bg-lime-soft text-2xl font-extrabold text-brand-800">✓</div>
              <h3>Permohonan diterima</h3>
              <p className="text-body">
                Rujukan <strong>{ref}</strong>. Kami akan hubungi anda dalam masa 5 minit bekerja.
              </p>
              <button
                type="button"
                onClick={() => {
                  setRef(null);
                  setValues(initial);
                  setConsent(false);
                  setErrors({});
                }}
                className="mt-2 rounded-full border border-[#e1e6df] px-6 py-3 font-bold text-brand-800"
              >
                Mohon lagi
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}