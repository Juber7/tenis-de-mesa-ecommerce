/**
 * Cookie and tracking consent, stored in localStorage on the visitor's device.
 * Necessary storage (cart, this preference) is always allowed. Any analytics
 * or advertising tool must be wrapped in <ConsentGate> so it only loads after
 * the visitor opts in.
 */
export type ConsentCategory = "analytics" | "marketing";
export type Consent = {
  version: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const CONSENT_STORAGE_KEY = "tm-consent";
/** Bump when categories or tools change so visitors are asked again. */
export const CONSENT_VERSION = 1;
/** Visitors are asked again after this many days. */
export const CONSENT_MAX_AGE_DAYS = 365;
const CHANGE_EVENT = "tm-consent-change";
const OPEN_EVENT = "tm-consent-open";

export function parseConsent(raw: string | null, now = Date.now()): Consent | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<Consent>;
    const updated = Date.parse(value.updatedAt ?? "");
    if (
      value.version !== CONSENT_VERSION ||
      typeof value.analytics !== "boolean" ||
      typeof value.marketing !== "boolean" ||
      !Number.isFinite(updated) ||
      now - updated > CONSENT_MAX_AGE_DAYS * 86_400_000
    )
      return null;
    return {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: value.analytics,
      marketing: value.marketing,
      updatedAt: value.updatedAt!,
    };
  } catch {
    return null;
  }
}

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

let cachedRaw: string | null | undefined;
let cachedConsent: Consent | null = null;
/** Stable snapshot for useSyncExternalStore. */
export function readConsent(): Consent | null {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedConsent = parseConsent(raw);
  }
  return cachedConsent;
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }) {
  const consent: Consent = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    updatedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Private browsing can block storage; the choice applies to this visit.
    cachedRaw = JSON.stringify(consent);
    cachedConsent = consent;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
  return consent;
}

export function subscribeConsent(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY) onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenConsentPreferences(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
