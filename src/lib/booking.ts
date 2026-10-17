import { site } from "@/content/site";

export type BookingDetails = {
  name?: string;
  phone?: string;
  checkIn?: Date | null;
  nights?: number;
  adults?: number;
  kids?: number;
  villas?: number;
};

const fmt = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

export function formatStay(checkIn: Date, nights: number) {
  const out = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate() + nights);
  const short = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  return `${short(checkIn)} → ${short(out)} · ${nights} night${nights === 1 ? "" : "s"}`;
}

export function bookingMessage(b: BookingDetails = {}) {
  const lines = ["Hi Banasura Villas, I'd like to check availability."];
  if (b.name) lines.push(`Name: ${b.name}`);
  if (b.phone) lines.push(`Phone: ${b.phone}`);
  if (b.checkIn) {
    const out = new Date(b.checkIn.getFullYear(), b.checkIn.getMonth(), b.checkIn.getDate() + (b.nights ?? 1));
    lines.push(`Check-in: ${fmt(b.checkIn)}`, `Check-out: ${fmt(out)} (${b.nights} night${b.nights === 1 ? "" : "s"})`);
  } else if (b.nights) {
    lines.push(`Nights: ${b.nights}`);
  }
  if (b.adults != null || b.kids != null)
    lines.push(`Guests: ${b.adults ?? 0} adults + ${b.kids ?? 0} children under ${site.childAgeLimit}`);
  if (b.villas && b.villas > 1) lines.push(`Villas: ${b.villas}`);
  return lines.join("\n");
}

export function whatsappUrl(b: BookingDetails = {}) {
  const text = encodeURIComponent(bookingMessage(b));
  return site.whatsappNumber ? `https://wa.me/${site.whatsappNumber}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function mailtoUrl(b: BookingDetails = {}) {
  if (!site.email) return null;
  return `mailto:${site.email}?subject=${encodeURIComponent("Booking request")}&body=${encodeURIComponent(bookingMessage(b))}`;
}

/** Analytics hook for the events named in the handoff. Wire to your analytics tool here. */
export function track(event: "check_dates" | "whatsapp" | "booking_submit", data?: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  if (w.gtag) w.gtag("event", event, data);
  else if (w.dataLayer) w.dataLayer.push({ event, ...data });
}
