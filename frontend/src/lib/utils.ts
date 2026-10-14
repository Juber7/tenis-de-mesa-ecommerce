import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
export const money = (amount: number, currency = "NIO", minorUnit = 2) => {
  // Browser and server locale data can disagree on the NIO symbol.
  // Keep the Nicaraguan córdoba representation identical on both.
  if (currency === "NIO") {
    return `C$${new Intl.NumberFormat("en-US", {
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
