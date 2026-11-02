import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream text-center">
      <div>
        <p className="text-[.8rem] uppercase tracking-[.2em] text-brand-600">404</p>
        <h1 className="my-3 text-3xl">Halaman tidak dijumpai</h1>
        <Link href="/" className="rounded-full bg-brand-600 px-7 py-3.5 font-bold text-white">Kembali ke laman utama</Link>
      </div>
    </main>
  );
}