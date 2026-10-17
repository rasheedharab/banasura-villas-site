# Banasura Villas website

Marketing and booking site for Banasura Villas, Padinjarathara, Wayanad. Built from the design handoff
(`../README.md`) as a Lovable-compatible project: **Vite + React + TypeScript + Tailwind CSS + shadcn/ui**.

## Pages

| Route | Page |
| --- | --- |
| `/` | Homepage: hero, the villa, pool, plan your days, things to do, where to eat, getting here + booking |
| `/villa` | Villa: gallery, rooms, pool, inclusions, rates, policies, availability calendar, booking request |
| `/wayanad-guide` | Wayanad guide: itineraries (2/3/4 nights), 14 places, seasons, tips |

## Run locally

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # production build in dist/
```

## Put it in Lovable

1. Create an empty repository on GitHub and push this folder to it:
   ```sh
   git init && git add . && git commit -m "Banasura Villas site"
   git branch -M main
   git remote add origin https://github.com/<you>/banasura-villas-site.git
   git push -u origin main
   ```
2. In Lovable, create a project from that GitHub repository (Lovable's GitHub import), or open an
   existing Lovable project, connect GitHub, and push this code to the repository it creates.
3. Lovable keeps the repo in two-way sync, so edits made in Lovable land in GitHub and vice versa.

## Where to edit content (no design changes needed)

Everything marked `[to confirm]` or `₹ —` on the site comes from these files:

- `src/content/site.ts`: **WhatsApp number**, email, phone, address, **rates**, minimum stay, check-in/out,
  cancellation, house rules, pool size/depth/hours, inclusions (Wi-Fi, parking, cook, etc.).
  Set a value and the placeholder disappears.
- `src/content/bookings.ts`: confirmed bookings. The calendar counts free villas from this list, so it
  never shows invented scarcity. Replace with a Supabase table of the same shape when ready.
- `src/content/photos.ts`: villa photos. Hall, bedroom and Room 1–3 photos are placeholders until
  you add files to `src/assets/photos/` and set them here.
- `src/content/places.ts`, `home.ts`, `guide.ts`: itineraries, places, restaurants, seasons, tips.

## Notes

- **Pool wording**: there are 2 pools, each shared by a cluster of 3 villas. The site never says
  "private pool". The cluster fine print appears on the homepage booking card, the villa pool section,
  the policies list and the booking form.
- **Attraction and dish photos** load from Wikipedia / Wikimedia Commons in the visitor's browser.
  To self-host one, put the file in `src/assets/`, import it in `places.ts` / `home.ts` and set `image`
  and `credit` (keep the author and licence for CC BY-SA images). Karlad Lake and Lakkidi have no reliable
  image online, so owner photos are best there.
- **Booking requests** open WhatsApp with the dates and guests filled in (and email, if `site.email`
  is set). A database + owner email notification and a Razorpay deposit are the next steps
  (Lovable Cloud / Supabase).
- **Analytics**: `track()` in `src/lib/booking.ts` fires `check_dates`, `whatsapp` and
  `booking_submit` events to Google Analytics (`gtag`) or a `dataLayer` if one is on the page.
- **SEO**: per-page title/description, Open Graph image (`public/og-image.jpg`) and
  `LodgingBusiness` JSON-LD in `src/components/site/Seo.tsx`. Set `site.url` to the real domain.
- Brand tokens (butter, terracotta, mango, banana leaf, teak, bark, calendar colours) are in
  `tailwind.config.ts`; fonts are Petrona and Nunito Sans.
