import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-brand-950 pt-14 pb-6 text-[.88rem] text-[#b9ccc1]">
      <div className="container-page grid gap-8 md:grid-cols-[1.6fr_repeat(3,1fr)]">
        <div>
          <Image src="/logo.png" alt="R Cash" width={120} height={36} className="mb-4 h-9 w-auto brightness-0 invert" />
          <p>Pemberi pinjaman dalam talian yang pantas, selamat dan telus untuk rakyat Malaysia.</p>
        </div>
        <nav className="flex flex-col gap-2">
          <h4 className="mb-1 text-[.82rem] uppercase tracking-[.12em] text-white">Syarikat</h4>
          <a href="#mengapa" className="hover:text-lime-accent">Tentang Kami</a>
          <a href="#cara" className="hover:text-lime-accent">Cara Ia Berfungsi</a>
          <Link href="/terms" className="hover:text-lime-accent">Terma</Link>
        </nav>
        <nav className="flex flex-col gap-2">
          <h4 className="mb-1 text-[.82rem] uppercase tracking-[.12em] text-white">Pinjaman</h4>
          <a href="#mohon" className="hover:text-lime-accent">Mohon Sekarang</a>
          <a href="#faq" className="hover:text-lime-accent">Bayaran Balik</a>
          <Link href="/privacy" className="hover:text-lime-accent">Privasi</Link>
        </nav>
        <div className="flex flex-col gap-2">
          <h4 className="mb-1 text-[.82rem] uppercase tracking-[.12em] text-white">Hubungi</h4>
          <a href="mailto:hello@r-cash.my" className="hover:text-lime-accent">hello@r-cash.my</a>
          <a href="tel:+60300000000" className="hover:text-lime-accent">+603-0000 0000</a>
          <span>Kuala Lumpur, Malaysia</span>
        </div>
      </div>
      <div className="container-page mt-10 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-5 text-[.78rem]">
        <p>© {new Date().getFullYear()} R Cash. Hak cipta terpelihara.</p>
        <p className="opacity-65">Klon demo. Bukan laman rasmi R Cash.</p>
      </div>
    </footer>
  );
}