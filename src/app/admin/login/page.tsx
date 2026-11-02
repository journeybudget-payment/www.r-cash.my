export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-cream px-5">
      <form action="/api/admin/login" method="post" className="w-full max-w-sm rounded-3xl border border-[#e1e6df] bg-white p-8 shadow-xl">
        <h1 className="mb-1 text-xl">Panel Admin</h1>
        <p className="mb-6 text-[.85rem] text-body">Masukkan kata laluan untuk meneruskan.</p>
        <input
          name="password"
          type="password"
          required
          autoFocus
          className="w-full rounded-xl border border-[#e1e6df] px-3.5 py-3 outline-none focus:border-brand-500"
          placeholder="Kata laluan"
        />
        {error && <p className="mt-2 text-[.78rem] text-[#c4321f]">Kata laluan salah.</p>}
        <button type="submit" className="mt-5 w-full rounded-full bg-brand-600 py-3.5 font-bold text-white">
          Log masuk
        </button>
      </form>
    </main>
  );
}