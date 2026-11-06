/**
 * Official exchange rate (córdobas per US dollar) published by the Banco
 * Central de Nicaragua, read from its public SOAP web service.
 *
 * Product prices are stored in dollars in Sanity and shown in córdobas at the
 * rate of the current day in Managua. Each day's rate is cached for 24 hours
 * (the date is part of the request, so a new day means a new lookup).
 */
export type ExchangeRate = {
  /** Córdobas per 1 US$. */
  rate: number;
  /** ISO date (America/Managua) the rate applies to. */
  date: string;
  /** "fallback" when the BCN service could not be reached. */
  source: "bcn" | "fallback";
};

const BCN_SERVICE = "https://servicios.bcn.gob.ni/Tc_Servicio/ServicioTC.asmx";
/** Last rate verified against the BCN service (2026-11-06). Used only if the
 * service fails for today and the previous days. */
export const FALLBACK_RATE = 36.6243;

export function managuaDateParts(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Managua",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

const iso = ({ year, month, day }: { year: number; month: number; day: number }) =>
  `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export function parseBcnResponse(xml: string): number | null {
  const match = /<RecuperaTC_DiaResult>\s*([\d.]+)\s*<\/RecuperaTC_DiaResult>/.exec(xml);
  const rate = match ? Number(match[1]) : NaN;
  // Sanity bounds: anything outside this range is not a valid C$/US$ rate.
  return Number.isFinite(rate) && rate > 1 && rate < 1000 ? rate : null;
}

async function fetchBcnRate(day: { year: number; month: number; day: number }) {
  const body = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><RecuperaTC_Dia xmlns="http://servicios.bcn.gob.ni/"><Ano>${day.year}</Ano><Mes>${day.month}</Mes><Dia>${day.day}</Dia></RecuperaTC_Dia></soap:Body></soap:Envelope>`;
  const response = await fetch(BCN_SERVICE, {
    method: "POST",
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: '"http://servicios.bcn.gob.ni/RecuperaTC_Dia"',
    },
    body,
    signal: AbortSignal.timeout(8000),
    // The rate for a given date never changes; keep it for a day.
    cache: "force-cache",
    next: { revalidate: 86_400, tags: ["bcn-exchange-rate"] },
  });
  if (!response.ok) throw new Error(`BCN respondió HTTP ${response.status}`);
  return parseBcnResponse(await response.text());
}

export async function getExchangeRate(now = new Date()): Promise<ExchangeRate> {
  // Today first; if the service has no data yet, use the most recent day.
  for (let back = 0; back < 3; back++) {
    const day = managuaDateParts(new Date(now.getTime() - back * 86_400_000));
    try {
      const rate = await fetchBcnRate(day);
      if (rate) return { rate, date: iso(day), source: "bcn" };
    } catch (error) {
      // `cause` carries the network/TLS reason (e.g. a certificate error).
      const cause = error instanceof Error ? (error.cause as { code?: string; message?: string } | undefined) : undefined;
      console.error(
        `Tipo de cambio BCN no disponible para ${iso(day)}:`,
        error instanceof Error ? error.message : error,
        cause ? `(${cause.code ?? ""} ${cause.message ?? ""})`.trim() : "",
      );
    }
  }
  console.error(`Usando tipo de cambio de respaldo ${FALLBACK_RATE}.`);
  return { rate: FALLBACK_RATE, date: iso(managuaDateParts(now)), source: "fallback" };
}

/** Converts US$ cents to córdoba centavos, rounding half up. */
export const usdCentsToNio = (cents: number, rate: number) => Math.round(cents * rate);

export function formatRateDate(date: string) {
  return new Intl.DateTimeFormat("es-NI", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date + "T12:00:00Z"));
}

/** "C$ 36.6243 por US$ 1 (BCN, 6 de noviembre de 2026)" */
export function describeRate(fx: ExchangeRate) {
  const rate = `C$ ${fx.rate.toFixed(4)} por US$ 1`;
  return fx.source === "bcn"
    ? `${rate} (tipo de cambio oficial del BCN, ${formatRateDate(fx.date)})`
    : `${rate} (tipo de cambio oficial de referencia del BCN)`;
}
