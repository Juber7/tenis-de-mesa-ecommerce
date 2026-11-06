import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
// Prefixes are fixed because browser and server locale data can disagree on
// currency symbols (for example "$" or "US$"); a no-break space keeps "C$"
// attached to the amount.
const PREFIX: Record<string, string> = { NIO: "C$ ", USD: "US$ " };
export const money = (amount: number, currency = "NIO", minorUnit = 2) => {
  if (PREFIX[currency]) {
    return `${PREFIX[currency]}${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: minorUnit,
      maximumFractionDigits: minorUnit,
    }).format(amount / 10 ** minorUnit)}`;
  }
  return new Intl.NumberFormat("es-NI", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
    minimumFractionDigits: minorUnit,
    maximumFractionDigits: minorUnit,
  }).format(amount / 10 ** minorUnit);
};
