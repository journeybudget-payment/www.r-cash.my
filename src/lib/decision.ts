/**
 * Enjin keputusan pinjaman.
 * Dua lapis: (1) penolakan keras automatik, (2) skor 0-100 dengan sebab.
 * Semua ambang di THRESHOLDS — ubah di satu tempat.
 */

export type Employment = "tetap" | "kontrak" | "sendiri" | "tidak_bekerja";
export type CreditGrade = "A" | "B" | "C" | "D" | "E";

export type DecisionInput = {
  amount: number;
  tenure: number;
  age: number;
  income: number;
  employment: Employment;
  existingLoans: number;
  creditGrade: CreditGrade;
};

export type Verdict = "lulus" | "semak" | "tolak";

export type DecisionResult = {
  verdict: Verdict;
  score: number;
  reasons: string[];
  hardRejects: string[];
  instalment: number;
  dti: number;
  computedAt: string;
};

export const THRESHOLDS = {
  ageMin: 20,
  ageMax: 60,
  incomeMin: 1500,
  maxAmountToIncome: 5,      // jumlah pinjaman / pendapatan bulanan
  maxExistingLoans: 4,
  maxDti: 0.6,
  maxInstalmentRatio: 0.35,
  passScore: 70,
  reviewScore: 45,
  ratePerYear: 0.1
} as const;

const EMPLOYMENT_POINTS: Record<Employment, number> = {
  tetap: 25,
  kontrak: 15,
  sendiri: 12,
  tidak_bekerja: 0
};

const CREDIT_POINTS: Record<CreditGrade, number> = { A: 20, B: 16, C: 11, D: 6, E: 0 };

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export function evaluate(input: DecisionInput): DecisionResult {
  const hardRejects: string[] = [];
  const reasons: string[] = [];
  const T = THRESHOLDS;

  const income = Math.max(input.income, 1);
  const instalment = Math.round((input.amount * (1 + T.ratePerYear * (input.tenure / 12))) / input.tenure);

  // Komitmen sedia ada dianggarkan RM300 sebulan setiap pinjaman aktif
  const existingCommitment = input.existingLoans * 300;
  const dti = (existingCommitment + instalment) / income;

  // ---- Lapis 1: penolakan keras ----
  if (input.age < T.ageMin) hardRejects.push(`Umur ${input.age} di bawah minimum ${T.ageMin} tahun`);
  if (input.age > T.ageMax) hardRejects.push(`Umur ${input.age} melebihi had ${T.ageMax} tahun`);
  if (input.income < T.incomeMin) hardRejects.push(`Pendapatan RM${input.income} di bawah minimum RM${T.incomeMin}`);
  if (input.amount > income * T.maxAmountToIncome)
    hardRejects.push(`Jumlah dimohon melebihi ${T.maxAmountToIncome}x pendapatan bulanan`);
  if (input.existingLoans > T.maxExistingLoans)
    hardRejects.push(`${input.existingLoans} pinjaman aktif melebihi had ${T.maxExistingLoans}`);
  if (input.employment === "tidak_bekerja") hardRejects.push("Tiada pengesahan pekerjaan");

  // ---- Lapis 2: skor ----
  let score = 0;

  // Pendapatan (maks 25)
  if (input.income >= 5000) score += 25;
  else if (input.income >= 3500) score += 20;
  else if (input.income >= 2500) score += 14;
  else if (input.income >= 2000) score += 8;
  else score += 3;
  reasons.push(`Pendapatan RM${input.income}/bln → +${score <= 25 ? score : 25}`);

  // Pekerjaan (maks 25)
  const empPts = EMPLOYMENT_POINTS[input.employment];
  score += empPts;
  reasons.push(`Jenis pekerjaan "${input.employment}" → +${empPts}`);

  // Kredit (maks 20)
  const crPts = CREDIT_POINTS[input.creditGrade];
  score += crPts;
  reasons.push(`Gred kredit ${input.creditGrade} → +${crPts}`);

  // Nisbah ansuran (maks 20)
  const ratio = instalment / income;
  let ratioPts = 0;
  if (ratio <= 0.1) ratioPts = 20;
  else if (ratio <= 0.2) ratioPts = 15;
  else if (ratio <= THRESHOLDS.maxInstalmentRatio) ratioPts = 9;
  else if (ratio <= 0.5) ratioPts = 4;
  score += ratioPts;
  reasons.push(`Ansuran RM${instalment} = ${(ratio * 100).toFixed(1)}% pendapatan → +${ratioPts}`);

  // Tempoh (maks 10)
  const tenurePts = input.tenure >= 9 ? 10 : input.tenure >= 6 ? 6 : 3;
  score += tenurePts;
  reasons.push(`Tempoh ${input.tenure} bulan → +${tenurePts}`);

  // Penalti
  if (input.existingLoans >= 3) {
    score -= 8;
    reasons.push("3+ pinjaman aktif → −8");
  }
  if (dti > THRESHOLDS.maxDti) {
    score -= 10;
    reasons.push(`DTI ${(dti * 100).toFixed(0)}% melebihi ${THRESHOLDS.maxDti * 100}% → −10`);
  }
  if (ratio > THRESHOLDS.maxInstalmentRatio) {
    reasons.push(`Amaran: ansuran melebihi ${THRESHOLDS.maxInstalmentRatio * 100}% pendapatan`);
  }

  score = Math.round(clamp(score, 0, 100));

  let verdict: Verdict;
  if (hardRejects.length > 0) verdict = "tolak";
  else if (score >= THRESHOLDS.passScore) verdict = "lulus";
  else if (score >= THRESHOLDS.reviewScore) verdict = "semak";
  else verdict = "tolak";

  return {
    verdict,
    score,
    reasons,
    hardRejects,
    instalment,
    dti: Number(dti.toFixed(3)),
    computedAt: new Date().toISOString()
  };
}