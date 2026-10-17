import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Accent } from "@/components/site/Heading";
import { AvailabilityCalendar } from "@/components/site/AvailabilityCalendar";
import { BookingRequestDialog } from "@/components/site/BookingRequestDialog";
import { PhotoPlaceholder } from "@/components/site/PhotoPlaceholder";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { photos } from "@/content/photos";
import { TBC, formatPrice, included, lowestRate, minimumStay, policies, poolFacts, rates, site } from "@/content/site";
import { formatStay, track } from "@/lib/booking";
import { cn } from "@/lib/utils";

const rooms = [
  { photo: photos.room1, name: "Room 1", d: "With attached bathroom" },
  { photo: photos.room2, name: "Room 2", d: "Bedroom" },
  { photo: photos.room3, name: "Room 3", d: "Bedroom" },
];

const spaces = [
  { name: "Hall", d: "To gather in" },
  { name: "Kitchen", d: "To cook together" },
  { name: "Common bathroom", d: "Shared by rooms 2 and 3" },
];

const h2 = "m-0 font-serif text-h2-sm font-semibold";

export default function Villa() {
  const [params] = useSearchParams();
  const initial = parseDate(params.get("checkin"));
  const today = new Date();
  const [month, setMonth] = useState(() =>
    initial ? { y: initial.getFullYear(), m: initial.getMonth() } : { y: today.getFullYear(), m: today.getMonth() },
  );
  const [checkIn, setCheckIn] = useState<Date | null>(initial);
  const [nights, setNights] = useState(() => Math.min(4, Math.max(1, Number(params.get("nights")) || 3)));
  const [requestOpen, setRequestOpen] = useState(false);

  const from = lowestRate();
  const barTitle = checkIn ? formatStay(checkIn, nights) : `Your villa, from ${formatPrice(from)} / night`;
  const bookingDetails = { checkIn, nights, adults: site.maxAdults, kids: site.maxChildren };

  return (
    <>
      <Seo
        title="The villa · Banasura Villas, Wayanad"
        description="A house for ten, steps from the pool. Three bedrooms, a hall, a full kitchen and two bathrooms for up to 6 adults and 4 children. Check dates and rates."
        path="/villa"
      />
      <Nav
        links={[
          { label: "Rooms", to: "/villa#rooms" },
          { label: "Pool", to: "/villa#pool" },
          { label: "Rates", to: "/villa#rates" },
          { label: "Dates", to: "/villa#dates" },
        ]}
        cta={{ label: "Check your dates", to: "/villa#dates" }}
      />

      <header className="mx-auto flex max-w-content flex-col gap-7 px-gutter pt-[clamp(32px,5vw,64px)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[720px] flex-col gap-3.5">
            <div className="eyebrow">The villa · 6 identical villas</div>
            <h1 className="m-0 font-serif text-[clamp(42px,5.6vw,72px)] font-semibold leading-none">
              A house for ten, <Accent>steps from the pool.</Accent>
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-[20px] border border-teak/[.15] bg-white px-3.5 py-2 text-sm font-bold">3 bedrooms</span>
            <span className="rounded-[20px] border border-teak/[.15] bg-white px-3.5 py-2 text-sm font-bold">6 adults + 4 kids</span>
            <span className="rounded-[20px] bg-mango px-3.5 py-2 text-sm font-bold">Swimming pool</span>
          </div>
        </div>

        {/* Gallery: 4-col grid, horizontal snap strip below 720px */}
        <div
          className={cn(
            "no-scrollbar -mx-gutter grid snap-x snap-mandatory auto-cols-[84%] grid-flow-col grid-rows-[280px] gap-2.5 overflow-x-auto px-gutter",
            "nav:mx-0 nav:auto-cols-auto nav:grid-flow-row nav:grid-cols-4 nav:grid-rows-none nav:auto-rows-[clamp(150px,18vw,230px)] nav:overflow-visible nav:px-0",
          )}
        >
          <GalleryTile src={photos.poolDay} alt="The pool by day" position="center 80%" className="nav:col-span-2 nav:row-span-2" />
          <GalleryTile src={photos.poolNight} alt="The pool at night" />
          <GalleryTile src={photos.hall} alt="The hall" placeholder="Hall photo coming soon" />
          <GalleryTile src={photos.bedroom} alt="A bedroom" placeholder="Bedroom photo coming soon" />
          <GalleryTile src={photos.gardenSwing} alt="The garden swing" position="60% center" />
        </div>
      </header>

      <main className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(min(100%,520px),1fr))] items-start gap-[clamp(40px,5vw,64px)] px-gutter pt-[clamp(56px,7vw,88px)] pb-[140px]">
        <div className="flex min-w-0 flex-col gap-[clamp(56px,7vw,80px)]">
          <section id="rooms" className="flex flex-col gap-5">
            <h2 className={h2}>Who sleeps where</h2>
            <p className="m-0 text-[17px] leading-[1.65] text-bark">
              Three bedrooms around one hall, so everyone wakes up under the same roof. The kitchen is yours for family
              breakfasts and long dinners.
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-3">
              {rooms.map((r) => (
                <div key={r.name} className="flex flex-col overflow-hidden rounded-[8px] border border-teak/10 bg-white">
                  <div className="relative h-[140px]">
                    {r.photo ? (
                      <img src={r.photo} alt={r.name} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <PhotoPlaceholder label={`${r.name} photo coming soon`} className="text-[15px]" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 px-4 py-3.5">
                    <strong className="font-serif text-xl">{r.name}</strong>
                    <span className="text-sm text-bark">{r.d}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-3">
              {spaces.map((s) => (
                <div key={s.name} className="flex flex-col gap-0.5 rounded-[8px] border border-dashed border-teak/30 px-4 py-3.5">
                  <strong>{s.name}</strong>
                  <span className="text-sm text-bark">{s.d}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="pool" className="flex flex-col overflow-hidden rounded-[12px] bg-teak text-butter">
            <img
              src={photos.poolNightSteam}
              alt="The pool at night"
              loading="lazy"
              className="h-[clamp(220px,28vw,320px)] w-full object-cover"
              style={{ objectPosition: "center 65%" }}
            />
            <div className="flex flex-col gap-[18px] p-[clamp(22px,3vw,32px)]">
              <h2 className={h2}>
                The pool. <Accent dark>Morning to moonlight.</Accent>
              </h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-2.5">
                {poolFacts.map((f) => (
                  <div key={f.k} className="flex flex-col gap-0.5 rounded-[6px] bg-butter/[.08] p-3.5">
                    <span className="text-xs text-muted-dark">{f.k}</span>
                    <strong className={cn("text-base", f.v ? "text-butter" : "text-mango")}>{f.v ?? TBC}</strong>
                  </div>
                ))}
              </div>
              <span className="text-sm leading-[1.55] text-cream">Children should be supervised in the pool at all times.</span>
              <span className="text-xs leading-normal text-muted-dark">
                Each pool serves a cluster of three villas. It is shared, or used on split timings, when the villas in a
                cluster are booked by different groups. Book all three villas for exclusive use.
              </span>
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <h2 className={h2}>In every villa</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-2.5">
              {included
                .filter((i) => i.value !== false)
                .map((i) => (
                  <div key={i.name} className="flex justify-between gap-2.5 rounded-[6px] border border-teak/[.08] bg-white px-4 py-3.5 text-[15px]">
                    <span>{i.name}</span>
                    <span className={cn("text-xs font-bold", i.value ? "text-leaf" : "text-terracotta")}>
                      {i.value ? "Included" : TBC}
                    </span>
                  </div>
                ))}
            </div>
          </section>

          <section id="rates" className="flex flex-col gap-5">
            <h2 className={h2}>Rates, per villa per night</h2>
            <div className="overflow-hidden rounded-[10px] border border-teak/10 bg-white">
              {rates.map((r) => (
                <div key={r.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 border-b border-teak/[.08] px-5 py-4">
                  <div className="flex flex-col gap-0.5">
                    <strong>{r.name}</strong>
                    <span className="text-sm text-bark">{r.when}</span>
                  </div>
                  <span className="font-serif text-[22px] font-semibold text-terracotta">{formatPrice(r.price)}</span>
                </div>
              ))}
              <div className="bg-butter px-5 py-4 text-sm leading-[1.55] text-bark">
                The rate covers the whole villa for up to 6 adults and 4 children under 11. Minimum stay:{" "}
                <strong className="text-teak">{minimumStay ?? TBC}</strong>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <h2 className={h2}>Good to know</h2>
            <div className="flex flex-col">
              {policies.map((p) => (
                <div key={p.k} className="grid grid-cols-[minmax(110px,180px)_minmax(0,1fr)] gap-4 border-b border-line py-3.5 text-[15px] leading-normal">
                  <strong>{p.k}</strong>
                  <span className="text-bark">{p.v ?? TBC}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside id="dates" className="static top-[84px] flex min-w-0 flex-col gap-4 aside:sticky">
          <AvailabilityCalendar
            month={month}
            onMonthChange={setMonth}
            checkIn={checkIn}
            onCheckIn={setCheckIn}
            nights={nights}
            onNights={setNights}
          />
          <div className="grid grid-cols-2 gap-2">
            <Button size="block" onClick={() => setRequestOpen(true)}>
              Request booking
            </Button>
            <WhatsAppButton size="block" from="villa_calendar" details={bookingDetails} />
          </div>
          <span className="text-[11px] text-bark">We confirm every request personally by phone or WhatsApp.</span>
        </aside>
      </main>

      <Footer />

      {/* Fixed bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 bg-teak text-butter">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-2.5 px-[clamp(14px,4vw,48px)] pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))]">
          <div className="hidden flex-col gap-0.5 nav:flex">
            <strong className="font-serif text-lg">{barTitle}</strong>
            <span className="text-[13px] text-cream">Whole villa · up to 6 adults + 4 kids · swimming pool</span>
          </div>
          <div className="flex flex-1 justify-end gap-2">
            <Button asChild size="md" className="flex-1 nav:flex-none">
              <a href="#dates" onClick={() => track("check_dates", { from: "villa_bar" })}>
                Check your dates
              </a>
            </Button>
            <WhatsAppButton size="md" label="WhatsApp" from="villa_bar" details={bookingDetails} className="flex-1 nav:flex-none" />
          </div>
        </div>
      </div>

      <BookingRequestDialog open={requestOpen} onOpenChange={setRequestOpen} checkIn={checkIn} nights={nights} />
    </>
  );
}

function GalleryTile({
  src,
  alt,
  position = "center",
  placeholder,
  className,
}: {
  src: string | null;
  alt: string;
  position?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative snap-center overflow-hidden rounded-[10px]", className)}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" style={{ objectPosition: position }} />
      ) : (
        <PhotoPlaceholder label={placeholder ?? alt} />
      )}
    </div>
  );
}

function parseDate(s: string | null) {
  if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const [y, m, d] = s.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const t = new Date();
  return date < new Date(t.getFullYear(), t.getMonth(), t.getDate()) ? null : date;
}
