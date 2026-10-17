import { bookings } from "@/content/bookings";
import { site } from "@/content/site";

const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Number of villas (0–6) free for the night starting on `date`, from real bookings only. */
export function freeVillas(date: Date) {
  const night = toISO(date);
  const taken = new Set(
    bookings
      .filter((b) => b.status !== "cancelled" && b.check_in <= night && night < b.check_out)
      .map((b) => b.villa_id),
  );
  return Math.max(0, site.totalVillas - taken.size);
}

/** Fewest villas free across every night of a stay. */
export function freeForStay(checkIn: Date, nights: number) {
  let min = site.totalVillas;
  for (let i = 0; i < nights; i++) {
    const d = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate() + i);
    min = Math.min(min, freeVillas(d));
  }
  return min;
}
