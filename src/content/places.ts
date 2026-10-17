/**
 * Attractions near the villas. Photos load from Wikipedia / Wikimedia Commons
 * at runtime. To self-host a photo, import it and set `image` (and `credit`,
 * keeping the author and licence for CC BY-SA images).
 */

export type PlaceCategory = "Water" | "Treks" | "Sights" | "Culture" | "Wildlife";

export type WikiSource = {
  /** Wikipedia article titles to try, in order. */
  titles: string[];
  /** Commons search fallback. */
  query: string;
  /** The chosen file name must contain this (guards against unrelated images). */
  must?: string;
};

export type Place = {
  key: string;
  category: PlaceCategory;
  name: string;
  time: string;
  /** Short description used on the homepage. Omit to keep the place off the homepage. */
  short?: string;
  /** Longer description used in the Wayanad guide. */
  d: string;
  who: string;
  tip: string;
  wiki: WikiSource;
  image?: string;
  credit?: string;
};

export const places: Place[] = [
  {
    key: "Banasura_Sagar_Dam", category: "Water", name: "Banasura Sagar Dam", time: "5 min",
    short: "India's largest earthen dam. Speed boats, zipline and a walk along the embankment.",
    d: "India's largest earthen dam, with island-dotted water and the Banasura hills behind.",
    who: "Everyone", tip: "Speed boats and zipline. Go at opening on weekends.",
    wiki: { titles: ["Banasura_Sagar_Dam"], query: "Banasura Sagar dam", must: "banasura" },
  },
  {
    key: "Karlad_Lake", category: "Water", name: "Karlad Lake", time: "20 min",
    short: "Kayaking, a zipline over the water and an easy lakeside walk.",
    d: "A quiet lake surrounded by forest, with kayaking and a zipline over the water.",
    who: "Families with older kids", tip: "Adventure activities depend on weight and age limits.",
    wiki: { titles: ["Karlad_Lake"], query: "Karlad lake Wayanad", must: "karlad" },
  },
  {
    key: "Banasura_Hill", category: "Treks", name: "Banasura Hill and Meenmutty Falls", time: "15 min",
    short: "Half-day trek through grassland and shola forest. Forest permit and a guide needed.",
    d: "Grassland and shola forest climbing above the reservoir, with Meenmutty Falls on the way.",
    who: "Fit adults and teens", tip: "Forest permit and guide required. Start early.",
    wiki: { titles: ["Meenmutty_Falls", "Banasura_Hill"], query: "Meenmutty falls", must: "meenmutty" },
  },
  {
    key: "Kurumbalakotta", category: "Treks", name: "Kurumbalakotta", time: "30 min",
    short: "Short hill climb popular for sunrise above the clouds.",
    d: "A short hill climb known for sunrise views over a sea of mist.",
    who: "Early risers", tip: "Leave by 5 am in the cooler months for the clouds.",
    wiki: { titles: ["Kurumbalakotta"], query: "Kurumbalakotta", must: "kurumbala" },
  },
  {
    key: "Chembra", category: "Treks", name: "Chembra Peak", time: "1 hr 15",
    d: "Wayanad's highest peak, famous for its heart-shaped lake partway up.",
    who: "Serious trekkers", tip: "Entry limited daily. Check whether it is open before you go.",
    wiki: { titles: ["Chembra_Peak"], query: "Chembra peak", must: "chembra" },
  },
  {
    key: "Pookode_Lake", category: "Sights", name: "Pookode Lake", time: "1 hr",
    short: "Freshwater lake in the forest with pedal boats and a walking path.",
    d: "A freshwater lake in evergreen forest with pedal boats and a walking path.",
    who: "Grandparents and small kids", tip: "Easy stop on the drive in or out.",
    wiki: { titles: ["Pookode_Lake"], query: "Pookode lake", must: "pookod" },
  },
  {
    key: "Lakkidi", category: "Sights", name: "Lakkidi Viewpoint and Chain Tree", time: "1 hr",
    short: "The gateway to Wayanad, looking down the hairpin bends of the ghat.",
    d: "The gateway to Wayanad, looking down the hairpin bends of the Thamarassery ghat.",
    who: "Everyone", tip: "Best on the clear mornings after rain.",
    wiki: { titles: ["Lakkidi", "Chain_Tree"], query: "Lakkidi Wayanad", must: "lakkidi" },
  },
  {
    key: "Edakkal_Caves", category: "Sights", name: "Edakkal Caves", time: "1 hr 15",
    short: "Neolithic rock carvings at the top of a steep climb. Closed Mondays.",
    d: "Neolithic petroglyphs inside a rock shelter at the top of Ambukuthi hill.",
    who: "Older kids and history lovers", tip: "Closed Mondays. Steep climb, wear good shoes.",
    wiki: { titles: ["Edakkal_Caves"], query: "Edakkal caves", must: "edakkal" },
  },
  {
    key: "Soochipara_Falls", category: "Water", name: "Soochipara Falls", time: "1 hr 15",
    short: "Tall waterfall reached by a forest walk. Best after the monsoon.",
    d: "A tall, three-tiered waterfall reached by a forest walk.",
    who: "Families", tip: "At its best just after the monsoon. Can close after heavy rain.",
    wiki: { titles: ["Soochipara_Falls"], query: "Soochipara falls", must: "soochipara" },
  },
  {
    key: "Kuruva_Island", category: "Wildlife", name: "Kuruva Island", time: "1 hr 15",
    short: "River islands crossed by bamboo raft. Opens seasonally.",
    d: "A cluster of river islands on the Kabini, crossed by bamboo raft.",
    who: "Kids who like adventure", tip: "Opens seasonally with daily visitor limits.",
    wiki: { titles: ["Kuruva_Island", "Kuruvadweep"], query: "Kuruva island", must: "kuruva" },
  },
  {
    key: "Muthanga", category: "Wildlife", name: "Muthanga Wildlife Sanctuary", time: "1 hr 30",
    d: "Jeep safaris through forest home to elephants, deer and the occasional big cat.",
    who: "Everyone", tip: "Safari slots are limited. Arrive early for morning entry.",
    wiki: { titles: ["Muthanga_Wildlife_Sanctuary", "Wayanad_Wildlife_Sanctuary"], query: "Muthanga wildlife" },
  },
  {
    key: "Uravu", category: "Culture", name: "Uravu Bamboo Village", time: "45 min",
    short: "Craft workshops making furniture and objects from local bamboo.",
    d: "A craft collective making furniture, lamps and objects from local bamboo.",
    who: "Curious minds", tip: "Good for gifts to take home.",
    wiki: { titles: ["Uravu_Bamboo_Village"], query: "Uravu bamboo Wayanad", must: "uravu" },
  },
  {
    key: "Thirunelli_Temple", category: "Culture", name: "Thirunelli Temple", time: "1 hr 45",
    short: "Ancient Vishnu temple deep in the Brahmagiri hills.",
    d: "An ancient Vishnu temple in the Brahmagiri hills, surrounded by forest.",
    who: "Pilgrims and grandparents", tip: "Dress code applies. Combine with a Kuruva visit.",
    wiki: { titles: ["Thirunelli_Temple"], query: "Thirunelli temple", must: "thirunell" },
  },
  {
    key: "Jain_Temple", category: "Culture", name: "Jain Temple, Sulthan Bathery", time: "1 hr",
    d: "A 13th-century granite temple at the heart of Sulthan Bathery.",
    who: "History lovers", tip: "Quick stop with lunch in town.",
    wiki: { titles: ["Jain_temple,_Sultan_Bathery", "Sultan_Bathery"], query: "Sultan Bathery Jain temple" },
  },
];

export const homeCategories = ["All", "Water", "Treks", "Sights", "Culture", "Wildlife"] as const;
export const guideCategories = ["All", "Water", "Treks", "Sights", "Wildlife", "Culture"] as const;

export const placeByKey = (key: string) => places.find((p) => p.key === key)!;
