/** Single source for the merchant's WhatsApp number (country code + digits). */
export const CONTACT_NUMBER = "50588174072";
/** "+505 8817 4072" */
export const CONTACT_NUMBER_DISPLAY = `+${CONTACT_NUMBER.slice(0, 3)} ${CONTACT_NUMBER.slice(3, 7)} ${CONTACT_NUMBER.slice(7)}`;
export function contactMessage(now = new Date()): string {
  const hour = Number(
    new Intl.DateTimeFormat("es-NI", {
      timeZone: "America/Managua",
      hour: "numeric",
      hourCycle: "h23",
    }).format(now),
  );
  const greeting =
    hour >= 5 && hour < 12
      ? "buenos días"
      : hour >= 12 && hour < 18
        ? "buenas tardes"
        : "buenas noches";
  return `Hola, ${greeting}, me gustaría obtener más información sobre...`;
}
export function contactLink(now = new Date()): string {
  return `https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(contactMessage(now))}`;
}
/** WhatsApp link with a fixed, purpose-specific message (no time greeting). */
export function whatsappTextLink(text: string): string {
  return `https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(text)}`;
}
