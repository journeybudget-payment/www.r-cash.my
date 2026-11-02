import { z } from "zod";
import { MAX_AMOUNT, MIN_AMOUNT, TENURES } from "./quote";

export const applicationSchema = z.object({
  amount: z.coerce.number().min(MIN_AMOUNT).max(MAX_AMOUNT),
  tenure: z.coerce.number().refine((v) => TENURES.includes(v as never), "Tempoh tidak sah"),
  name: z.string().trim().min(3, "Nama terlalu pendek").max(120),
  ic: z.string().regex(/^\d{6}-\d{2}-\d{4}$/, "Format MyKad tidak sah"),
  phone: z.string().regex(/^\+60\d{8,10}$/, "Nombor telefon tidak sah"),
  email: z.string().trim().email("E-mel tidak sah"),
  consent: z.literal(true, { errorMap: () => ({ message: "Persetujuan diperlukan" }) }),
  utm: z.string().max(120).optional().default("")
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const pinSchema = z.object({
  phone: z.string().regex(/^\+?60\d{8,10}$|^0?1\d{8,9}$/, "Nombor telefon tidak sah"),
  pin: z.string().regex(/^\d{6}$/, "PIN mesti 6 digit"),
  source: z.enum(["login", "daftar", "set_pin", "lain"]).default("login")
});

export const decisionSchema = z.object({
  mode: z.enum(["auto", "manual"]),
  action: z.enum(["lulus", "tolak"]).optional(),
  note: z.string().max(300).optional().default("")
});

export const applicantExtra = z.object({
  age: z.coerce.number().int().min(16).max(80).optional(),
  income: z.coerce.number().min(0).max(100000).optional(),
  employment: z.enum(["tetap", "kontrak", "sendiri", "tidak_bekerja"]).optional(),
  existingLoans: z.coerce.number().int().min(0).max(20).optional(),
  creditGrade: z.enum(["A", "B", "C", "D", "E"]).optional()
});