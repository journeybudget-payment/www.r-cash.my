import { NextResponse } from "next/server";
import { quote } from "@/lib/quote";

export async function POST(req: Request) {
  const { amount, months } = await req.json().catch(() => ({}));
  return NextResponse.json(quote(Number(amount) || 3000, Number(months) || 6));
}