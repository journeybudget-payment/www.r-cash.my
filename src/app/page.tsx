import { ApplyForm } from "@/components/apply-form";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { CtaBand, Features, Marquee, Stats, Steps, UseCases } from "@/components/sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Ticker } from "@/components/ticker";

export default function Home() {
  return (
    <>
      <Ticker />
      <SiteHeader />
      <main id="top">
        <Hero />
        <Marquee />
        <ApplyForm />
        <Steps />
        <Features />
        <UseCases />
        <Stats />
        <CtaBand />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}