"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = { onComplete: (pin: string) => void; disabled?: boolean };

export function PinInput({ onComplete, disabled }: Props) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const commit = (next: string[]) => {
    setDigits(next);
    const joined = next.join("");
    if (joined.length === 6) onComplete(joined);
  };

  function handle(index: number, raw: string) {
    const clean = raw.replace(/\D/g, "");
    if (!clean) {
      const next = [...digits];
      next[index] = "";
      commit(next);
      return;
    }

    // tampal 6 digit sekali gus
    if (clean.length > 1) {
      const next = Array(6).fill("");
      clean.slice(0, 6).split("").forEach((d, i) => (next[i] = d));
      commit(next);
      refs.current[Math.min(clean.length, 5)]?.focus();
      return;
    }

    const next = [...digits];
    next[index] = clean;
    commit(next);
    if (index < 5) refs.current[index + 1]?.focus();
  }

  function onKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5) refs.current[index + 1]?.focus();
  }

  return (
    <div className="flex justify-center gap-2.5" role="group" aria-label="PIN 6 digit">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={d}
          onChange={(e) => handle(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          disabled={disabled}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          aria-label={`Digit ${i + 1}`}
          className={cn(
            "size-12 rounded-xl border border-[#e1e6df] bg-white text-center text-xl font-extrabold outline-none transition",
            "focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15",
            d && "border-brand-500"
          )}
        />
      ))}
    </div>
  );
}