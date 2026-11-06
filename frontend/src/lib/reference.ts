// Unambiguous characters (no 0/O, 1/I/L) for references read aloud or typed.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

/** Date in Managua as YYMMDD, so references sort by local day. */
export function managuaDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Managua",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return `${get("year")}${get("month")}${get("day")}`;
}

/** e.g. "P-261105-7KQ2" for orders, "R-261105-7KQ2" for complaints. */
export function createReference(
  prefix: "P" | "R",
  now = new Date(),
  random: (bytes: Uint8Array) => Uint8Array = (b) => crypto.getRandomValues(b),
) {
  const bytes = random(new Uint8Array(4));
  const code = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
  return `${prefix}-${managuaDate(now)}-${code}`;
}
