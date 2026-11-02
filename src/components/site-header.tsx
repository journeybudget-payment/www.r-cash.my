"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#cara", label: "Cara Ia Berfungsi" },
  { href: "#mengapa", label: "Mengapa R Cash" },
  { href: "#faq", label: "FAQ" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md transition-colors",
        stuck ? "border-[#e1e6df] bg-cream/95" : "border-transparent bg-cream/80"
      )}
    >
      <div className="container-page flex items-center justify-between gap-4 py-3.5">
        <Link href="#top" aria-label="R Cash — laman utama">
          <Image src="/logo.png" alt="R Cash" width={132} height={40} priority className="h-10 w-auto" />
        </Link>

        <nav
          id="nav"
          className={cn(
            "max-md:fixed max-md:inset-x-0 max-md:top-16 max-md:flex-col max-md:border-b max-md:border-[#e1e6df] max-md:bg-white max-md:px-5 max-md:pb-6 max-md:shadow-xl max-md:transition-transform",
            "flex items-center gap-7 max-md:gap-0",
            open ? "max-md:translate-y-0" : "max-md:-translate-y-[130%]"
          )}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-body transition-colors hover:text-brand-800 max-md:border-b max-md:border-[#e1e6df] max-md:py-3.5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#mohon"
            onClick={() => setOpen(false)}
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 max-md:mt-4 max-md:text-center"
          >
            Mohon Sekarang
          </a>
        </nav>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="hidden h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-[#e1e6df] bg-white max-md:flex"
        >
          <span className={cn("h-0.5 w-4 bg-brand-800 transition", open && "translate-y-2 rotate-45")} />
          <span className={cn("h-0.5 w-4 bg-brand-800 transition", open && "opacity-0")} />
          <span className={cn("h-0.5 w-4 bg-brand-800 transition", open && "-translate-y-2 -rotate-45")} />
        </button>
      </div>
    </header>
  );
}