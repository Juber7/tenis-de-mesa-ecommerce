import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
export const money = (amount: number, currency = "USD", minorUnit = 2) => {
  // Browser and server locale data can disagree on the dollar symbol ($ or US$).
  // Keep the catalog's representation identical on both.
  if (currency === "USD") {
    return `$${new Intl.NumberFormat("en-US", {
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
