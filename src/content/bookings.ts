/**
 * Confirmed bookings. The availability calendar counts free villas per night
 * from this list, so it never shows invented scarcity.
 *
 * Villas 1–3 share pool cluster A, villas 4–6 share pool cluster B.
 * Dates are ISO (YYYY-MM-DD); check_out is the morning the guests leave.
 *
 * Later this can be replaced by a database table with the same shape
 * (e.g. Supabase `bookings(villa_id, cluster_id, check_in, check_out, status)`).
 */

export type Booking = {
  villa_id: 1 | 2 | 3 | 4 | 5 | 6;
  cluster_id: "A" | "B";
  check_in: string;
  check_out: string;
  status: "confirmed" | "hold" | "cancelled";
};

export const bookings: Booking[] = [
  // { villa_id: 1, cluster_id: "A", check_in: "2026-12-24", check_out: "2026-12-27", status: "confirmed" },
];
