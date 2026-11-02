import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SECRET = process.env.ADMIN_SECRET ?? "dev-secret-change-me";
export const SESSION_COOKIE = "rcash_admin";
const TTL = 1000 * 60 * 60 * 8;

const sign = (value: string) => createHmac("sha256", SECRET).update(value).digest("hex");

export function createToken() {
  const exp = String(Date.now() + TTL);
  return `${exp}.${sign(exp)}`;
}

export function isValidToken(token?: string) {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  const want = sign(exp);
  if (sig.length !== want.length) return false;
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(want))) return false;
  return Number(exp) > Date.now();
}

export function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || input.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(input), Buffer.from(expected));
}

export async function isLoggedIn() {
  const jar = await cookies();
  return isValidToken(jar.get(SESSION_COOKIE)?.value);
}