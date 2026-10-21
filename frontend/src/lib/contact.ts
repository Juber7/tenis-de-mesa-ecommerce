export const CONTACT_NUMBER = "50588174072";
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
