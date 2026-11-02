import { Counter } from "./counter";
import { Reveal } from "./reveal";

const head = "mb-10 max-w-[640px]";

export function Marquee() {
  const items = ["✔ Selamat", "·", "⚡ Pantas", "·", "👁 Telus", "·", "🔒 Tiada Yuran Tersembunyi", "·"];
  return (
    <div aria-hidden className="overflow-hidden bg-brand-800 py-3.5 font-bold text-[.9rem] text-lime-soft">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

const steps = [
  {
    no: "01",
    title: "Mohon Dalam Talian Dalam Minit",
    body: "Isi borang permohonan mudah kami dengan maklumat asas anda. Tiada kertas kerja yang rumit diperlukan.",
    tags: ["📱 Aplikasi mesra mudah alih", "🔒 Penyulitan data selamat"]
  },
  {
    no: "02",
    title: "Semakan Bertenaga AI Segera",
    body: "Sistem AI canggih kami menganalisis permohonan anda dengan serta-merta dan memberikan keputusan kelulusan segera.",
    tags: ["⏱ 5 min masa semakan purata", "📈 95% kadar kelulusan"]
  },
  {
    no: "03",
    title: "Terima Dana Segera",
    body: "Sebaik sahaja diluluskan, jumlah pinjaman anda dipindahkan terus ke akaun bank anda dalam beberapa minit.",
    tags: ["⚡ Pemindahan hari yang sama", "🏦 Terus ke akaun bank"]
  }
];

export function Steps() {
  return (
    <section id="cara" className="py-14 md:py-24">
      <div className="container-page">
        <header className={head}>
          <p className="mb-4 text-[.78rem] font-bold uppercase tracking-[.13em] text-brand-700">Proses Mudah</p>
          <h2 className="mb-3 text-[clamp(1.8rem,3.4vw,2.9rem)]">Cara Memohon Pinjaman Anda</h2>
          <p className="text-body">
            Dapatkan pinjaman anda diluluskan dalam 3 langkah mudah sahaja. Proses yang diperkemas kami
            memastikan anda mendapat dana yang diperlukan dengan cepat dan cekap.
          </p>
        </header>
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <Reveal as="li" key={s.no} className="rounded-[18px] border border-[#e1e6df] bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="mb-4 block text-[.8rem] font-extrabold tracking-[.14em] text-brand-600">{s.no}</span>
              <h3 className="text-[1.15rem]">{s.title}</h3>
              <p className="text-[.95rem] text-body">{s.body}</p>
              <ul className="mt-4 space-y-1.5 text-[.8rem] text-body">
                {s.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const features = [
  { ico: "⚡", t: "Pantas Kilat", d: <>Dapatkan kelulusan dalam masa <strong>5 minit</strong> sahaja dengan sistem penilaian bertenaga AI kami.</>, tags: ["✔ 5min masa kelulusan", "✔ 24/7 tersedia"] },
  { ico: "📲", t: "Permohonan Mudah", d: <>Hanya <strong>MyKad</strong> anda — itu sahaja yang anda perlukan. Tiada kertas kerja tidak perlu.</>, tags: ["✔ Hanya MyKad diperlukan", "✔ Tiada dokumen pendapatan"] },
  { ico: "🛡", t: "Keselamatan Gred Bank", d: <>Data anda dilindungi dengan <strong>256-bit SSL</strong> dan protokol keselamatan canggih.</>, tags: ["✔ SSL selamat", "✔ Disulitkan hujung ke hujung"] },
  { ico: "👁", t: "Ketelusan Penuh", d: <>Tiada yuran tersembunyi atau caj mengejut. Anda tahu tepat apa yang perlu dibayar sebelum memohon.</>, tags: ["✔ Struktur yuran jelas", "✔ Tiada caj kejutan"] },
  { ico: "👥", t: "Untuk Semua Orang", d: <>Kriteria kelayakan fleksibel bermakna lebih ramai boleh mengakses dana yang diperlukan.</>, tags: ["✔ Umur 20–60", "✔ Sedang bekerja"] },
  { ico: "🕒", t: "Tersedia 24/7", d: <>Mohon bila-bila masa, di mana-mana sahaja. Platform kami tidak pernah tidur.</>, tags: ["✔ Dioptimumkan mudah alih", "✔ Sokongan berterusan"] }
];

export function Features() {
  return (
    <section id="mengapa" className="bg-brand-900 py-14 text-[#eaf3ec] md:py-24">
      <div className="container-page">
        <header className={head}>
          <p className="mb-4 text-[.78rem] font-bold uppercase tracking-[.13em] text-lime-accent">Mengapa Pilih R Cash?</p>
          <h2 className="mb-3 text-[clamp(1.8rem,3.4vw,2.9rem)] text-white">Alami Masa Depan Pinjaman Dalam Talian</h2>
          <p className="text-[#a8bfb1]">
            Sertai ribuan pelanggan yang berpuas hati yang mempercayai R Cash untuk keperluan kewangan mereka.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <Reveal key={f.t} className="rounded-[18px] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-lime-accent/35 hover:bg-white/10">
              <span className="mb-4 grid size-[46px] place-items-center rounded-[13px] bg-lime-accent/15 text-xl">{f.ico}</span>
              <h3 className="text-[1.15rem] text-white">{f.t}</h3>
              <p className="text-[.94rem] text-[#a8bfb1]">{f.d}</p>
              <ul className="mt-4 space-y-1 text-[.78rem] text-lime-soft">
                {f.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const uses = [
  { ico: "🏥", t: "Kecemasan Perubatan", d: "Tampung bil perubatan yang tidak dijangka dengan segera." },
  { ico: "🔧", t: "Pembaikan Rumah", d: "Selesaikan masalah rumah yang mendesak tanpa tekanan." },
  { ico: "🎓", t: "Yuran Pendidikan", d: "Bayar yuran pendidikan tepat pada masanya." },
  { ico: "📈", t: "Peluang Perniagaan", d: "Rebut peluang perniagaan tanpa terlepas." }
];

export function UseCases() {
  return (
    <section className="py-14 md:py-24">
      <div className="container-page">
        <header className={head}>
          <p className="mb-4 text-[.78rem] font-bold uppercase tracking-[.13em] text-brand-700">Penyelesaian Wang Tunai Pantas</p>
          <h2 className="mb-3 text-[clamp(1.8rem,3.4vw,2.9rem)]">
            Perlukan Wang <em className="not-italic text-brand-600">Hari Ini?</em>
          </h2>
          <p className="text-body">
            Sama ada untuk kecemasan, perbelanjaan tidak dijangka, atau peluang yang baik — dapatkan wang
            tunai yang anda perlukan dalam akaun bank anda dalam beberapa minit.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {uses.map((u) => (
            <Reveal key={u.t} className="rounded-[18px] border border-[#e1e6df] bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="mb-3.5 grid size-11 place-items-center rounded-xl bg-cream text-xl">{u.ico}</span>
              <h3 className="text-[1.05rem]">{u.t}</h3>
              <p className="text-[.9rem] text-body">{u.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="bg-cream py-14 md:py-24">
      <div className="container-page">
        <header className={`${head} mx-auto text-center`}>
          <h2 className="mb-3 text-[clamp(1.8rem,3.4vw,2.9rem)]">Bersedia untuk Mengalami Perbezaan R Cash?</h2>
          <p className="text-body">Sertai ribuan pelanggan yang berpuas hati yang memilih cara yang lebih bijak untuk meminjam</p>
        </header>
        <div className="grid gap-4 text-center md:grid-cols-3">
          {[
            { to: 50000, suffix: "+", l: "Pelanggan Gembira" },
            { to: 95, suffix: "%", l: "Kadar Kelulusan" },
            { to: 4.8, suffix: "/5", decimals: 1, l: "Penilaian Pelanggan" }
          ].map((s) => (
            <div key={s.l} className="rounded-[18px] border border-[#e1e6df] bg-white px-4 py-8">
              <strong className="block text-[clamp(1.9rem,4vw,2.8rem)] leading-none tracking-tight text-brand-700">
                <Counter to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </strong>
              <small className="text-[.76rem] uppercase tracking-[.12em] text-body">{s.l}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="bg-brand-700 py-12 text-white md:py-16">
      <div className="container-page flex flex-wrap items-center justify-between gap-8">
        <div>
          <p className="mb-1.5 text-[.8rem] uppercase tracking-[.14em] text-lime-accent">Perlukan Wang Hari Ini? Kami Ada untuk Anda!</p>
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] text-white">Mohon Sekarang — Mulakan dalam 2 Minit</h2>
        </div>
        <a href="#mohon" className="rounded-full bg-lime-accent px-8 py-4 font-bold text-brand-900 transition hover:-translate-y-0.5">
          Mohon Sekarang →
        </a>
      </div>
    </section>
  );
}