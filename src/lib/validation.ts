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