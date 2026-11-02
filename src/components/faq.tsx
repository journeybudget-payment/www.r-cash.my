"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  {
    q: "Siapa yang boleh memohon pinjaman?",
    a: (
      <>
        <p>R Cash menawarkan perkhidmatan pinjaman kepada pelanggan yang memenuhi kriteria berikut:</p>
        <ul className="mt-2 mb-4 list-disc pl-5">
          <li>Pemohon mestilah berumur antara 20 dan 60 tahun</li>
          <li>Pemohon sepatutnya sedang bekerja</li>
          <li>Pemohon mesti mempunyai alamat kediaman yang sah di Malaysia</li>
        </ul>
      </>
    )
  },
  { q: "Dokumen apa yang saya perlukan untuk permohonan pinjaman?", a: <p>Anda perlu menyediakan MyKad (NRIC) atau dokumen pengenalan lain seperti yang ditetapkan. Dokumen ini diperlukan untuk pengesahan identiti dan untuk memastikan anda memenuhi kriteria kelayakan.</p> },
  { q: "Bagaimana saya akan tahu jika pinjaman saya diluluskan?", a: <p>Sebaik sahaja pinjaman anda diluluskan, status akan dikemas kini terus di laman web kami. Log masuk ke akaun anda untuk melihat status terkini bersama arahan langkah seterusnya.</p> },
  { q: "Berapa lama masa yang diperlukan untuk menerima pinjaman?", a: <p>Selepas kelulusan, kami berhasrat untuk memproses dan mengeluarkan dana dalam masa 24 jam. Status akan dikemas kini sebaik sahaja pemindahan berjaya.</p> },
  { q: "Kaedah apa yang boleh saya gunakan untuk membayar balik pinjaman?", a: (<><p>Pilihan pembayaran:</p><ul className="mt-2 list-disc pl-5"><li>Pemindahan perbankan dalam talian</li><li>E-Wallet (Touch 'n Go, GrabPay)</li><li>Pemindahan DuitNow</li><li>Deposit kaunter bank</li></ul></>) },
  { q: "Bolehkah saya bayar awal pinjaman?", a: <p>Ya. Tiada penalti atau caj tambahan untuk pembayaran awal.</p> },
  { q: "Adakah terdapat kos dan caj lain?", a: (<><p>Terdapat yuran berkanun:</p><ul className="mt-2 list-disc pl-5"><li><strong>Duti Setem</strong> — yuran kerajaan atas perjanjian pinjaman</li><li><strong>Kos Undang-undang</strong> — dalam sesetengah kes</li></ul></>) },
  { q: "Bolehkah saya mengambil pinjaman lain?", a: <p>Boleh. Kami mengalu-alukan pinjaman berulang, terutamanya bagi peminjam dengan sejarah pembayaran yang baik.</p> }
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-14 md:py-24">
      <div className="mx-auto w-full max-w-[820px] px-5">
        <header className="mb-10">
          <p className="mb-4 text-[.78rem] font-bold uppercase tracking-[.13em] text-brand-700">FAQ</p>
          <h2 className="mb-3 text-[clamp(1.8rem,3.4vw,2.9rem)]">Soalan Lazim</h2>
          <p className="text-body">Bantuan tersedia bila-bila masa anda memerlukannya</p>
        </header>

        <div className="space-y-2.5">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={cn("overflow-hidden rounded-[14px] border bg-white transition-colors", isOpen ? "border-brand-500" : "border-[#e1e6df]")}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-baseline gap-3.5 px-5 py-4 text-left font-bold"
                >
                  <span className="text-[.72rem] font-extrabold tracking-[.1em] text-brand-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{item.q}</span>
                  <span className={cn("text-xl text-brand-600 transition-transform", isOpen && "rotate-45")}>+</span>
                </button>
                {isOpen && <div className="px-5 pb-5 pl-[3.1rem] text-[.92rem] text-body">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}