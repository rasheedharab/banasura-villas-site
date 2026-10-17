import type { WikiSource } from "./places";

export type DayItem = { when: string; what: string };
export type Day = { n: string; title: string; items: DayItem[] };

const D = {
  arrive: { n: "Day 1", title: "Arrive and settle in", items: [
    { when: "1 pm", what: "Check in. Kids straight into the pool." },
    { when: "5 pm", what: "Tea on the verandah, a turn on the garden swing." },
    { when: "Night", what: "Cook together, or order in. Late swim with the pool lights on." } ] },
  dam: { n: "Day 2", title: "The dam and the lakes", items: [
    { when: "9 am", what: "Banasura Sagar Dam, 2 km away. Go early for the speed boat and zipline before the queues." },
    { when: "1 pm", what: "Kerala meals near the dam, or back at the villa." },
    { when: "3 pm", what: "Karlad Lake for kayaking and its zipline." } ] },
  trek: { n: "Day 3", title: "Hills, or nothing at all", items: [
    { when: "7 am", what: "Banasura Hill trek with a forest guide, or sunrise at Kurumbalakotta." },
    { when: "1 pm", what: "A long lunch at the villa." },
    { when: "4 pm", what: "Pool, books, naps. Nobody needs to go anywhere." } ] },
  leave2: { n: "Day 3", title: "One last swim", items: [
    { when: "8 am", what: "Morning swim and a slow breakfast." },
    { when: "11 am", what: "Check out. Stop at Pookode Lake on the way home." } ] },
  leave3: { n: "Day 4", title: "One last swim", items: [
    { when: "8 am", what: "Morning swim and a slow breakfast." },
    { when: "11 am", what: "Check out. Stop at Pookode Lake or Lakkidi on the way home." } ] },
} satisfies Record<string, Day>;

export const homePlans = {
  "2 nights": [D.arrive, D.dam, D.leave2],
  "3 nights": [D.arrive, D.dam, D.trek, D.leave3],
} as const;

export type HomePlan = keyof typeof homePlans;

export const specs = [
  { v: "3", k: "Bedrooms" },
  { v: "2", k: "Bathrooms, 1 attached" },
  { v: "1", k: "Hall" },
  { v: "1", k: "Full kitchen" },
  { v: "6", k: "Adults" },
  { v: "4", k: "Children under 11" },
];

export const foods: { key: string; name: string; d: string; wiki: WikiSource; image?: string }[] = [
  { key: "f_sadya", name: "Sadya on a banana leaf", d: "The Kerala feast, served at lunch", wiki: { titles: ["Sadhya"], query: "Sadhya", must: "sad" } },
  { key: "f_biryani", name: "Biryani", d: "Malabar and Thalassery styles are local favourites", wiki: { titles: ["Malabar_biryani", "Biryani", "Thalassery_biryani"], query: "Malabar biryani", must: "biryani" } },
  { key: "f_appam", name: "Appam", d: "Lacy rice pancakes, a Kerala breakfast", wiki: { titles: ["Appam", "Palappam", "Vellayappam"], query: "Appam", must: "appam" } },
  { key: "f_puttu", name: "Puttu", d: "Steamed rice cylinders, eaten with kadala curry", wiki: { titles: ["Puttu"], query: "Puttu", must: "puttu" } },
  { key: "f_porotta", name: "Malabar porotta", d: "Flaky, layered, made for curry", wiki: { titles: ["Parotta"], query: "Parotta", must: "porotta" } },
];

export const restaurants = [
  { name: "Olan", where: "Muttil, Kalpetta", d: "Traditional Kerala restaurant known for its ila sadya, porotta and meat roasts. Won Best Kerala Cuisine at the 2026 Manorama Golden Clove Awards." },
  { name: "Wilton Restaurant", where: "Lakkidi, near Wayanad Gateway", d: "Popular family stop on the way in or out of Wayanad. Biryani, thalis, seafood and their kunafa. Also in Sulthan Bathery." },
  { name: "Saraswathy Mess", where: "Padinjarathara", d: "Simple homestyle Kerala meals." },
  { name: "Pristine chocolate factory", where: "Near the dam", d: "Live chocolate making. Children love it." },
  { name: "Southern Spice and Shamiana", where: "Taj Wayanad, ~3 km", d: "Fine dining for a special evening. Book ahead." },
  { name: "The Tamarind", where: "Thrikkaipetta", d: "Traditional Kerala cuisine on the way to the bamboo village." },
  { name: "Newform Bakes & Arabian", where: "Kalpetta", d: "Malabar biryani, Arabian grills and bakery." },
];
