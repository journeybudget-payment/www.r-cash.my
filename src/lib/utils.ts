export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const rm = (n: number) => "RM " + Math.round(n).toLocaleString("en-MY");

export function makeRef() {
  const t = Date.now().toString(36).toUpperCase().slice(-6);
  const r = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `RC${t}${r}`;
}