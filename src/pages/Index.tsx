import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { AlbumFrame } from "@/components/site/AlbumFrame";
import { Accent, SectionHeading } from "@/components/site/Heading";
import { FilterPills, SegmentedTabs } from "@/components/site/PillTabs";
import { PlaceImageCard } from "@/components/site/PlaceImageCard";
import { PhotoPlaceholder } from "@/components/site/PhotoPlaceholder";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { photos } from "@/content/photos";
import { foods, homePlans, restaurants, specs, type HomePlan } from "@/content/home";
import { homeCategories, places } from "@/content/places";
import { poolFinePrint, site } from "@/content/site";
import { useWikiImages } from "@/lib/wikimedia";
import { track } from "@/lib/booking";
import { cn } from "@/lib/utils";
import { TravelList } from "@/components/site/TravelList";

const homePlaces = places.filter((p) => p.short);

export default function Index() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<HomePlan>("3 nights");
  const [cat, setCat] = useState<(typeof homeCategories)[number]>("All");
  const [checkIn, setCheckIn] = useState("");
  const imgs = useWikiImages([...homePlaces, ...foods]);

  const nights = plan === "2 nights" ? 2 : 3;
  const shown = cat === "All" ? homePlaces : homePlaces.filter((p) => p.category === cat);
  const checkInDate = checkIn ? new Date(checkIn + "T00:00:00") : null;

  const goToDates = () => {
    track("check_dates", { from: "home_booking" });
    navigate(`/villa?${new URLSearchParams({ nights: String(nights), ...(checkIn ? { checkin: checkIn } : {}) })}#dates`);
  };

  return (
    <>
      <Seo
        title="Banasura Villas · Pool villas in Wayanad for the whole family"
        description="Six three-bedroom villas around two swimming pools in Padinjarathara, Wayanad, 2 km from Banasura Sagar Dam. Room for 6 adults and 4 children per villa."
      />
      <Nav
        links={[
          { label: "The villa", to: "/#villa" },
          { label: "Plan your days", to: "/#plan" },
          { label: "Nearby", to: "/#nearby" },
          { label: "Wayanad guide", to: "/wayanad-guide" },
        ]}
        cta={{ label: "Check your dates", to: "/#book" }}
      />

      {/* Hero */}
      <header
        id="top"
        className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(40px,6vw,72px)] px-gutter pt-[clamp(40px,7vw,88px)] pb-[clamp(48px,7vw,96px)]"
      >
        <div className="flex flex-col gap-6">
          <div className="eyebrow">Padinjarathara · Wayanad · 2 km from Banasura Sagar Dam</div>
          <h1 className="m-0 font-serif text-hero font-semibold">
            Three bedrooms. One big table. <Accent>All of you.</Accent>
          </h1>
          <p className="m-0 max-w-[540px] text-[19px] leading-[1.6] text-bark">
            Six villas set around two swimming pools. Each villa has room for six adults and four children, with a
            kitchen to cook in and a hall to gather in.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="#book" onClick={() => track("check_dates", { from: "hero" })}>
                Check your dates
              </a>
            </Button>
            <WhatsAppButton from="hero" />
          </div>
          <div className="flex">
            <span className="rounded-[20px] bg-mango px-3.5 py-2 text-sm font-bold text-teak">
              Only 6 villas · weekends fill first
            </span>
          </div>
        </div>
        <div className="relative mx-auto aspect-[1/1.12] w-full max-w-[560px]">
          <AlbumFrame
            src={photos.poolDay}
            alt="The pool by day"
            caption="first swim, 11 am"
            ratio="4/5"
            position="center 80%"
            className="left-0 top-[6%] z-[1] w-[58%] -rotate-[4deg]"
          />
          <AlbumFrame
            src={photos.poolNight}
            alt="The pool at night with the lights on"
            caption="pool lights on, 8 pm"
            ratio="5/4"
            className="right-0 top-0 w-[52%] rotate-[3deg]"
          />
          <AlbumFrame
            src={photos.gardenSwing}
            alt="The garden swing"
            caption="the garden swing"
            ratio="4/3"
            position="60% center"
            className="bottom-0 right-[4%] z-[2] w-[48%] -rotate-[1.5deg]"
          />
        </div>
      </header>

      <main className="flex flex-col gap-section pb-[clamp(72px,9vw,112px)]">
        {/* The villa */}
        <section
          id="villa"
          className="mx-auto grid w-full max-w-content grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(36px,5vw,64px)] px-gutter"
        >
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="The villa"
              title={
                <>
                  A whole house, <Accent>just for your family</Accent>
                </>
              }
              intro="All six villas share the same layout. Bring the grandparents, the cousins and the kids. For bigger gatherings, book two or three villas side by side."
            />
            <div className="grid grid-cols-2 gap-2.5">
              {specs.map((s) => (
                <div key={s.k} className="flex items-baseline gap-2.5 rounded-[6px] border border-teak/[.08] bg-white px-4 py-3.5">
                  <span className="font-serif text-[26px] font-semibold text-terracotta">{s.v}</span>
                  <span className="text-[15px]">{s.k}</span>
                </div>
              ))}
            </div>
            <Link to="/villa" className="self-start font-bold">
              See the villa, rates and dates →
            </Link>
          </div>
          <div className="flex flex-col gap-4 rounded-[10px] border border-teak/10 bg-white p-[clamp(20px,3vw,32px)]">
            <div className="eyebrow">Who sleeps where</div>
            <div className="grid grid-cols-3 gap-2.5 text-[15px] leading-[1.4]">
              {[
                ["Room 1", "Attached bathroom"],
                ["Room 2", "Bedroom"],
                ["Room 3", "Bedroom"],
              ].map(([n, d]) => (
                <div key={n} className="flex min-h-[110px] flex-col gap-1.5 rounded-[6px] bg-butter p-4">
                  <strong className="font-serif text-[19px]">{n}</strong>
                  <span className="text-bark">{d}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2.5 text-[15px]">
              {["Hall", "Kitchen", "Common bath"].map((s) => (
                <div key={s} className="rounded-[6px] border border-dashed border-teak/30 p-3.5">
                  {s}
                </div>
              ))}
            </div>
            <div className="rounded-[6px] bg-leaf p-4 text-center font-bold text-white">
              A swimming pool, a few steps from your door
            </div>
          </div>
        </section>

        {/* Pool (the page's one teak band) */}
        <section className="bg-teak py-band text-butter">
          <div className="mx-auto flex max-w-content flex-col gap-9 px-gutter">
            <SectionHeading
              dark
              className="max-w-[680px]"
              eyebrow="The pool"
              title={
                <>
                  A pool a few steps away. <Accent dark>Swim whenever you like.</Accent>
                </>
              }
              intro="Swim in the morning, swim between monsoon showers, and swim once more after dinner with the pool lights on."
            />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
              {[
                { src: photos.poolNightSteam, pos: "center 65%", cap: "steam on the water after rain" },
                { src: photos.poolNightLate, pos: "center 60%", cap: "late swim, the kids still awake" },
                { src: photos.poolCurve, pos: "center 80%", cap: "a curved shallow end for little ones" },
              ].map((p) => (
                <figure key={p.cap} className="m-0 flex flex-col gap-2.5">
                  <img
                    src={p.src}
                    alt={p.cap}
                    loading="lazy"
                    className="aspect-[4/5] w-full rounded-[6px] object-cover"
                    style={{ objectPosition: p.pos }}
                  />
                  <figcaption className="font-serif text-[17px] italic text-cream">{p.cap}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Plan your days */}
        <section id="plan" className="mx-auto flex w-full max-w-content flex-col gap-8 px-gutter">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Plan your days"
              title={
                <>
                  One night is too short. <Accent>Stay three.</Accent>
                </>
              }
              intro="The dam is 5 minutes away and the lakes and treks are close. That leaves time for slow pool afternoons too."
            />
            <SegmentedTabs label="Trip length" options={["2 nights", "3 nights"] as const} value={plan} onChange={setPlan} />
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4">
            {homePlans[plan].map((d) => (
              <div key={d.n + d.title} className="flex flex-col gap-4 rounded-[8px] border border-teak/10 bg-white p-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[13px] font-bold uppercase tracking-[.1em] text-terracotta">{d.n}</span>
                  <span className="font-serif text-[23px] font-semibold leading-[1.15]">{d.title}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {d.items.map((i) => (
                    <div key={i.when} className="grid grid-cols-[58px_1fr] gap-2.5 text-[15px] leading-normal">
                      <span className="font-bold text-bark">{i.when}</span>
                      <span>{i.what}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Link to="/wayanad-guide" className="self-start font-bold">
            More ideas in the Wayanad guide →
          </Link>
        </section>

        {/* Things to do */}
        <section id="nearby" className="mx-auto flex w-full max-w-content flex-col gap-7 px-gutter">
          <SectionHeading eyebrow="Nearby" title="Things to do" />
          <FilterPills options={homeCategories} value={cat} onChange={setCat} />
          <div className="grid grid-flow-row-dense grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4">
            {shown.map((p, i) => (
              <PlaceImageCard key={p.key} place={p} img={imgs[p.key]} feature={i === 0} />
            ))}
          </div>
        </section>

        {/* Where to eat */}
        <section id="eat" className="mx-auto flex w-full max-w-content flex-col gap-8 px-gutter">
          <SectionHeading
            className="max-w-[680px]"
            eyebrow="Where to eat"
            title={
              <>
                Cook together, <Accent>or eat out</Accent>
              </>
            }
            intro="Every villa has a full kitchen for family breakfasts and long dinners. For nights off, Wayanad's Kerala and Malabar kitchens are close by."
          />
          <div className="grid grid-flow-row-dense auto-rows-[clamp(170px,22vw,240px)] grid-cols-4 gap-3">
            {foods.map((f, i) => {
              const img = imgs[f.key];
              return (
                <div
                  key={f.key}
                  className={cn(
                    "group relative overflow-hidden rounded-[10px] bg-placeholder shadow-card",
                    i === 0 ? "col-span-4 feature:col-span-2 feature:row-span-2" : "col-span-2 feature:col-span-1",
                  )}
                >
                  {img === null && <PhotoPlaceholder label={`Photo of ${f.name} coming soon`} className="items-start pt-6" />}
                  {img && (
                    <img
                      src={img}
                      alt={f.name}
                      loading="lazy"
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:600ms] ease-in-out group-hover:scale-[1.05]"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(42,26,14,0)_50%,rgba(42,26,14,.8))]" />
                  <div className="pointer-events-none absolute inset-x-4 bottom-3.5 flex flex-col gap-0.5 text-white">
                    <span className="font-serif text-[21px] italic">{f.name}</span>
                    <span className="text-[13px] text-cream-light">{f.d}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-3">
            {restaurants.map((e) => (
              <div key={e.name} className="flex flex-col gap-2 rounded-[8px] border border-teak/[.08] bg-white px-5 py-[18px]">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <strong className="font-serif text-xl font-semibold">{e.name}</strong>
                  <span className="text-[13px] font-bold text-leaf">{e.where}</span>
                </div>
                <span className="text-[15px] leading-normal text-bark">{e.d}</span>
              </div>
            ))}
          </div>
          <span className="text-xs text-bark">Dish photos: Wikimedia Commons</span>
        </section>

        {/* Getting here + booking */}
        <section
          id="book"
          className="mx-auto grid w-full max-w-content grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-[clamp(32px,5vw,64px)] px-gutter"
        >
          <div className="flex flex-col gap-[18px]">
            <SectionHeading size="h2-md" eyebrow="Getting here" title="Padinjarathara, Wayanad" />
            <TravelList />
          </div>
          <div className="flex flex-col gap-[18px] rounded-[10px] border border-teak/10 bg-white p-[clamp(22px,3vw,34px)] shadow-booking">
            <div className="font-serif text-[32px] font-semibold leading-[1.1]">
              Bring everyone. <Accent>We'll keep a villa for you.</Accent>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2.5">
              <label className="flex cursor-pointer flex-col gap-0.5 rounded-[6px] bg-butter px-3.5 py-3">
                <span className="text-xs text-bark">Check in</span>
                <input
                  type="date"
                  value={checkIn}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-transparent font-bold text-teak outline-none"
                  aria-label="Check-in date"
                />
              </label>
              <div className="flex flex-col gap-0.5 rounded-[6px] bg-butter px-3.5 py-3">
                <span className="text-xs text-bark">Nights</span>
                <strong>{plan}</strong>
              </div>
              <div className="flex flex-col gap-0.5 rounded-[6px] bg-butter px-3.5 py-3">
                <span className="text-xs text-bark">Guests</span>
                <strong>6 adults + 4 kids</strong>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2.5">
              <Button size="block" onClick={goToDates}>
                Check availability
              </Button>
              <WhatsAppButton
                size="block"
                from="home_booking"
                details={{ checkIn: checkInDate, nights, adults: site.maxAdults, kids: site.maxChildren }}
              />
            </div>
            <span className="text-sm text-bark">
              There are only six villas, so long weekends, Christmas and the monsoon months book early.
            </span>
            <span className="text-[11px] leading-normal text-bark">{poolFinePrint}</span>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBar checkTo="/#book" />
    </>
  );
}
