export const RATE_PER_YEAR = 0.1;
export const MIN_AMOUNT = 500;
export const MAX_AMOUNT = 5000;
export const TENURES = [3, 6, 9, 12] as const;

export function quote(amount: number, months: number) {
  const a = Math.min(Math.max(amount, MIN_AMOUNT), MAX_AMOUNT);
  const m = TENURES.includes(months as never) ? months : 6;
  const total = a * (1 + RATE_PER_YEAR * (m / 12));
  return { amount: a, months: m, instalment: Math.round(total / m), total: Math.round(total) };
}