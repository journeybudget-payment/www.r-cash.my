import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "R Cash — Pinjaman Peribadi Pantas & Selamat di Malaysia",
  description:
    "Dapatkan pinjaman sehingga RM5,000 ke akaun bank anda hari yang sama. Kelulusan 5 minit, tiada yuran tersembunyi. Mohon dalam talian sekarang.",
  openGraph: {
    type: "website",
    locale: "ms_MY",
    url: site,
    title: "R Cash — Pinjaman Peribadi Pantas & Selamat",
    description: "Kelulusan 5 minit. Dana hari yang sama. Tiada yuran tersembunyi.",
    images: ["/hero-man.jpg"]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}