import type { DayItem } from "./home";

export type GuideDay = { n: string; img: string; alt?: string; title: string; items: DayItem[]; tip: string };

const D = {
  arrive: { n: "Day 1", img: "Banasura_Sagar_Dam", title: "Arrive and settle in", items: [
    { when: "1 pm", what: "Check in, unpack and get the kids into the pool." },
    { when: "4 pm", what: "Drive 2 km to Banasura Sagar Dam for the late-afternoon light over the reservoir." },
    { when: "Night", what: "Cook together in the villa kitchen, or order in. Evening swim with the pool lights on." } ],
    tip: "Keep day one short. The drive up the ghat is enough for the first day." },
  water: { n: "Day 2", img: "Pookode_Lake", alt: "Banasura_Sagar_Dam", title: "The dam and the lakes", items: [
    { when: "9 am", what: "Back to Banasura Sagar Dam for speed boats and the zipline before the queues build." },
    { when: "1 pm", what: "Lunch near the dam or a sadya at Olan in Kalpetta." },
    { when: "3 pm", what: "Karlad Lake for kayaking and the lake zipline. Home by sunset." } ],
    tip: "Weekends get busy at the dam. Arrive at opening if you can." },
  hills: { n: "Day 3", img: "Banasura_Hill", title: "Hills, or nothing at all", items: [
    { when: "6 am", what: "Banasura Hill trek with a forest guide, or sunrise at Kurumbalakotta for the older kids." },
    { when: "1 pm", what: "Long lunch back at the villa." },
    { when: "4 pm", what: "Pool, books and naps. Nobody has to go anywhere." } ],
    tip: "Treks need forest department permits. Ask us and we can point you to the counter." },
  south: { n: "Day 4", img: "Edakkal_Caves", title: "Caves and waterfalls", items: [
    { when: "9 am", what: "Edakkal Caves near Ambalavayal for 6,000-year-old rock carvings. Closed Mondays." },
    { when: "1 pm", what: "Lunch in Sulthan Bathery. Wilton is a family favourite." },
    { when: "3 pm", what: "Soochipara Falls or the bamboo raft crossing at Kuruva Island (seasonal)." } ],
    tip: "Edakkal involves a steep climb. Grandparents may prefer to wait at the café at the bottom." },
  leave: { n: "Last day", img: "Lakkidi", title: "One last swim", items: [
    { when: "8 am", what: "Morning swim and a slow breakfast." },
    { when: "11 am", what: "Check out. Stop at Pookode Lake and the Lakkidi viewpoint on the drive down." } ],
    tip: "Leave by noon to clear the ghat road before evening traffic." },
} satisfies Record<string, GuideDay>;

export const guidePlans = {
  "2 nights": { intro: "A full weekend: one day out, one slow evening, and a swim before you leave.", days: [D.arrive, D.water, D.leave] },
  "3 nights": { intro: "Our favourite. Two days of exploring with a lazy afternoon in between.", days: [D.arrive, D.water, D.hills, D.leave] },
  "4 nights": { intro: "Enough time to see the south of Wayanad too, without rushing.", days: [D.arrive, D.water, D.hills, D.south, D.leave] },
} as const;

export type GuidePlan = keyof typeof guidePlans;

export const seasons = [
  { months: "Jun – Sep", name: "Monsoon", d: "Green everywhere, mist on the dam and full waterfalls. Some treks and Kuruva close. Perfect for long afternoons indoors and swims between showers." },
  { months: "Oct – Nov", name: "After the rains", d: "Waterfalls still strong, skies clearing, treks reopening. Our favourite time." },
  { months: "Dec – Feb", name: "Cool and clear", d: "Crisp mornings, sunny days and the best trekking weather. Christmas and New Year book early." },
  { months: "Mar – May", name: "Summer", d: "Warm days and cool nights. Pool weather. Reservoir levels drop by late summer." },
];

export const tips = [
  { k: "Mondays", v: "Edakkal Caves and some attractions close on Mondays." },
  { k: "Permits", v: "Banasura Hill, Chembra and Muthanga need forest department entry or permits, with daily limits." },
  { k: "Adventure", v: "Ziplines and boats have age, height and weight limits. Carry ID." },
  { k: "Driving", v: "Hill roads are narrow. Avoid driving the ghat after dark." },
  { k: "Leeches", v: "Common on forest trails in the monsoon. Wear socks and carry salt." },
];
