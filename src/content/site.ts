/**
 * Site-wide settings and the facts still to collect from the owner.
 *
 * Anything set to `null` shows as "[to confirm]" (or "₹ —" for prices) on the
 * site. Fill these in as the details are confirmed; nothing else needs to change.
 */

export const TBC = "[to confirm]";

export const site = {
  name: "Banasura Villas",
  locality: "Padinjarathara, Wayanad, Kerala",
  url: "https://banasuravillas.com", // [to confirm] used for SEO tags

  /** International format, digits only, e.g. "919876543210". Empty = WhatsApp opens without a recipient. */
  whatsappNumber: "",
  /** Where booking requests are emailed. Empty = email option is hidden. */
  email: "",
  phone: "",

  totalVillas: 6,
  villasPerCluster: 3,
  maxAdults: 6,
  maxChildren: 4,
  childAgeLimit: 11,

  address: null as string | null,
  mapUrl: null as string | null,
};

/** Rates per villa per night, in rupees. `null` shows "₹ —". */
export const rates: { name: string; when: string; price: number | null }[] = [
  { name: "Weekdays", when: "Sunday to Thursday nights", price: null },
  { name: "Weekends", when: "Friday and Saturday nights", price: null },
  { name: "Peak dates", when: "Christmas, New Year, Onam, long weekends", price: null },
  { name: "Stay 3 nights", when: "Optional offer, if you want one", price: null },
];

export const minimumStay: string | null = null;

export const policies: { k: string; v: string | null }[] = [
  { k: "Check-in", v: null },
  { k: "Check-out", v: null },
  { k: "Guests", v: "Up to 6 adults and 4 children under 11 per villa." },
  { k: "Cancellation", v: null },
  {
    k: "Pool",
    v: "Each pool serves a cluster of three villas. If the villas in a cluster are booked by different groups, the pool is shared or used on split timings. Book all three villas for exclusive use.",
  },
  { k: "House rules", v: null },
];

export const poolFacts: { k: string; v: string | null }[] = [
  { k: "Size", v: null },
  { k: "Depth", v: null },
  { k: "Pool hours", v: null },
  { k: "Night lights", v: "Yes" },
];

/** `true` = included, `false` = not offered (hidden), `null` = to confirm. */
export const included: { name: string; value: boolean | null }[] = [
  { name: "Swimming pool access", value: true },
  { name: "Full kitchen", value: true },
  { name: "Garden and swing", value: true },
  { name: "Parking", value: null },
  { name: "Wi-Fi", value: null },
  { name: "Cook on request", value: null },
  { name: "Campfire / barbecue", value: null },
  { name: "Power backup", value: null },
];

export const travel = [
  { from: "Kozhikode (Calicut) airport", d: "~90 km · 2.5 hrs" },
  { from: "Kannur airport", d: "~95 km · 2.5 hrs" },
  { from: "Kozhikode railway station", d: "~80 km · 2.5 hrs" },
  { from: "Bengaluru", d: "~280 km · 6.5 hrs" },
  { from: "Kalpetta", d: "~20 km · 35 min" },
];

export const poolFinePrint =
  "Each pool serves a cluster of three villas. Book all three villas in a cluster for exclusive use of its pool. Otherwise the pool is shared with the other guests in that cluster, or used on split timings.";

export function formatPrice(price: number | null) {
  return price == null ? "₹ —" : "₹ " + price.toLocaleString("en-IN");
}

export function lowestRate() {
  const prices = rates.map((r) => r.price).filter((p): p is number => p != null);
  return prices.length ? Math.min(...prices) : null;
}
