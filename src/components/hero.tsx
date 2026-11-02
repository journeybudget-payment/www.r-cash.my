import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-14 md:pt-16 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[18%] -right-[10%] aspect-square w-[min(760px,80vw)] rounded-full bg-[radial-gradient(circle,rgb(18_160_95/.22),transparent_62%)] blur-2xl"
      />
      <div className="container-page relative grid items-center gap-10 md:grid-cols-[1.08fr_.92fr] md:gap-16">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 text-[.78rem] font-bold uppercase tracking-[.13em] text-brand-700">
            <span className="size-[7px] rounded-full bg-lime-accent shadow-[0_0_0_4px_rgb(182_242_74/.28)]" />
            Dapatkan Sehingga RM 5,000
          </p>

          <h1 className="mb-4 text-[clamp(2.3rem,5.2vw,4.1rem)] leading-[1.08]">
            Hari Yang Sama Pinjaman ke{" "}
            <em className="bg-[linear-gradient(transparent_62%,var(--color-lime-soft)_62%)] not-italic text-brand-600">
              Akaun Bank Anda
            </em>
          </h1>

          <p className="max-w-[52ch] text-[1.06rem] text-body">
            Kelulusan pantas dalam masa 5 minit sahaja. Tiada yuran tersembunyi, tiada kertas kerja
            yang rumit. Dapatkan wang tunai yang anda perlukan hari ini dengan pemberi pinjaman
            dalam talian yang paling dipercayai di Malaysia.
          </p>

          <ul className="my-7 flex gap-8 border-y border-[#e1e6df] py-5">
            {[
              { v: "5", u: "min", l: "Kelulusan" },
              { v: "50K", u: "+", l: "Pelanggan" },
              { v: "4.8", u: "★", l: "Penilaian" }
            ].map((s) => (
              <li key={s.l}>
                <strong className="block text-[1.75rem] leading-none">
                  {s.v}
                  <span className="ml-0.5 text-[.85rem] text-brand-600">{s.u}</span>
                </strong>
                <small className="mt-1.5 block text-[.74rem] uppercase tracking-[.12em] text-body">{s.l}</small>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <a href="#mohon" className="rounded-full bg-brand-600 px-8 py-4 font-bold text-white transition hover:-translate-y-0.5">
              Mohon Sekarang →
            </a>
            <a href="#cara" className="rounded-full border border-[#e1e6df] px-8 py-4 font-bold text-brand-800 transition hover:bg-white">
              Cara ia berfungsi
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[.82rem] text-body">
            <li>🔒 Data dilindungi keselamatan gred bank</li>
            <li>✅ Tiada yuran tersembunyi</li>
            <li>✅ Pemindahan hari yang sama</li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[440px]">
          <Image
            src="/hero-man.jpg"
            alt="Pelanggan R Cash tersenyum sambil memegang telefon"
            width={768}
            height={1024}
            priority
            className="aspect-[3/4] w-full rounded-[28px] object-cover shadow-[0_24px_60px_-28px_rgb(7_43_27/.45)]"
          />
          <div className="absolute top-[8%] -left-3 flex animate-bob items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-xl">
            <span>⚡</span>
            <div>
              <strong className="block text-[.85rem] leading-tight">Diluluskan</strong>
              <small className="text-[.72rem] text-body">RM 3,500 · 5 min</small>
            </div>
          </div>
          <div className="absolute right-0 bottom-[11%] flex animate-bob items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-xl [animation-delay:-2.5s]">
            <span>🏦</span>
            <div>
              <strong className="block text-[.85rem] leading-tight">Dana dihantar</strong>
              <small className="text-[.72rem] text-body">Ke akaun bank anda</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}