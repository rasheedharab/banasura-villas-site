import { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { Accent, SectionHeading } from "@/components/site/Heading";
import { FilterPills, SegmentedTabs } from "@/components/site/PillTabs";
import { PlaceCard } from "@/components/site/PlaceCard";
import { PhotoPlaceholder } from "@/components/site/PhotoPlaceholder";
import { TravelList } from "@/components/site/TravelList";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { guidePlans, seasons, tips, type GuidePlan } from "@/content/guide";
import { guideCategories, places } from "@/content/places";
import { useWikiImages } from "@/lib/wikimedia";
import { track } from "@/lib/booking";

export default function WayanadGuide() {
  const [plan, setPlan] = useState<GuidePlan>("3 nights");
  const [cat, setCat] = useState<(typeof guideCategories)[number]>("All");
  const imgs = useWikiImages(places);

  const hero = imgs["Banasura_Sagar_Dam"];
  const shown = cat === "All" ? places : places.filter((p) => p.category === cat);

  return (
    <>
      <Seo
        title="Wayanad guide · Banasura Villas"
        description="Lakes, hills and waterfalls, all within an hour of the villas. 2, 3 and 4 night itineraries, 14 places by drive time, and the best season to visit Wayanad."
        path="/wayanad-guide"
      />
      <Nav
        links={[
          { label: "Itinerary", to: "/wayanad-guide#itinerary" },
          { label: "Places", to: "/wayanad-guide#places" },
          { label: "When to come", to: "/wayanad-guide#seasons" },
          { label: "The villa", to: "/villa" },
        ]}
        cta={{ label: "Check your dates", to: "/villa#dates" }}
      />

      <header className="relative flex min-h-[clamp(420px,62vh,620px)] items-end overflow-hidden bg-teak">
        {hero && <img src={hero} alt="Banasura Sagar Dam" className="absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,26,14,.15)_0%,rgba(42,26,14,.82)_100%)]" />
        <div className="relative mx-auto flex w-full max-w-content flex-col gap-[18px] px-gutter py-[clamp(32px,6vw,72px)] text-white">
          <div className="eyebrow text-mango">The Wayanad guide</div>
          <h1 className="m-0 max-w-[900px] font-serif text-[clamp(44px,6.4vw,84px)] font-semibold leading-none">
            Lakes, hills and waterfalls, <Accent dark>all within an hour.</Accent>
          </h1>
          <p className="m-0 max-w-[620px] text-lg leading-[1.6] text-cream-light">
            The villas sit 2 km from Banasura Sagar Dam in Padinjarathara. Here's how we'd spend two or three days, with
            time left over for the pool.
          </p>
          {hero && <span className="text-[11px] text-muted-dark">Banasura Sagar Dam · Photo: Wikimedia Commons</span>}
        </div>
      </header>

      <main className="flex flex-col gap-[clamp(80px,10vw,120px)] pt-[clamp(56px,7vw,88px)] pb-[clamp(72px,9vw,112px)]">
        <section id="itinerary" className="mx-auto flex w-full max-w-content flex-col gap-8 px-gutter">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Itinerary" title="Pick your pace" intro={guidePlans[plan].intro} />
            <SegmentedTabs
              label="Trip length"
              options={Object.keys(guidePlans) as GuidePlan[]}
              value={plan}
              onChange={setPlan}
            />
          </div>
          <div className="flex flex-col gap-5">
            {guidePlans[plan].days.map((d) => {
              const key = imgs[d.img] ? d.img : "alt" in d && d.alt && imgs[d.alt] ? d.alt : d.img;
              const img = imgs[key];
              return (
                <div
                  key={d.n + d.title}
                  className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] overflow-hidden rounded-[12px] border border-teak/10 bg-white"
                >
                  <div className="relative min-h-[260px] bg-placeholder">
                    {img === null && <PhotoPlaceholder label={`Photo for ${d.title} coming soon`} className="absolute inset-0" />}
                    {img && <img src={img} alt={d.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
                    <div className="absolute left-4 top-4 rounded-[20px] bg-teak px-3.5 py-2 text-[13px] font-bold text-butter">
                      {d.n}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[18px] p-[clamp(22px,3vw,34px)]">
                    <div className="font-serif text-[clamp(26px,2.8vw,32px)] font-semibold leading-[1.1]">{d.title}</div>
                    <div className="flex flex-col gap-3.5">
                      {d.items.map((i) => (
                        <div key={i.when} className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 text-base leading-normal">
                          <span className="font-bold text-terracotta">{i.when}</span>
                          <span>{i.what}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-teak/10 pt-3.5 font-serif text-base italic text-bark">{d.tip}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="places" className="mx-auto flex w-full max-w-content flex-col gap-7 px-gutter">
          <SectionHeading eyebrow="Places" title="Everything nearby, by drive time" />
          <FilterPills options={guideCategories} value={cat} onChange={setCat} />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-[18px]">
            {shown.map((p) => (
              <PlaceCard key={p.key} place={p} img={imgs[p.key]} />
            ))}
          </div>
        </section>

        <section id="seasons" className="bg-teak py-band text-butter">
          <div className="mx-auto flex max-w-content flex-col gap-8 px-gutter">
            <SectionHeading
              dark
              eyebrow="When to come"
              title={
                <>
                  Every season, <Accent dark>a different Wayanad</Accent>
                </>
              }
            />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
              {seasons.map((s) => (
                <div key={s.name} className="flex flex-col gap-2.5 rounded-[10px] bg-butter/[.07] p-[22px]">
                  <span className="text-[13px] font-bold text-mango">{s.months}</span>
                  <strong className="font-serif text-2xl font-semibold">{s.name}</strong>
                  <span className="text-[15px] leading-[1.55] text-cream">{s.d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-content grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-[clamp(32px,5vw,64px)] px-gutter">
          <div className="flex flex-col gap-[18px]">
            <SectionHeading size="h2-md" eyebrow="Good to know" title="Before you set out" />
            <div className="flex flex-col">
              {tips.map((t) => (
                <div key={t.k} className="grid grid-cols-[minmax(110px,150px)_minmax(0,1fr)] gap-3.5 border-b border-line py-3.5 text-[15px] leading-[1.55]">
                  <strong>{t.k}</strong>
                  <span className="text-bark">{t.v}</span>
                </div>
              ))}
            </div>
            <span className="text-xs leading-normal text-bark">
              Timings, fees and seasonal closures change often, especially after heavy rain. Check locally before you go.
            </span>
          </div>
          <div className="flex flex-col gap-[18px]">
            <SectionHeading size="h2-md" eyebrow="Getting here" title="Padinjarathara, Wayanad" />
            <TravelList roomy />
          </div>
        </section>

        <section className="mx-auto w-full max-w-content px-gutter">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[14px] border border-teak/10 bg-white p-[clamp(28px,4vw,48px)] shadow-booking">
            <div className="flex max-w-[620px] flex-col gap-2.5">
              <div className="font-serif text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.1]">
                That's three days, <Accent>easily.</Accent>
              </div>
              <span className="text-base leading-[1.6] text-bark">
                Book three nights and you'll still have a full afternoon with nothing to do but swim. With only six
                villas, long weekends go first.
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Button asChild>
                <Link to="/villa?nights=3#dates" onClick={() => track("check_dates", { from: "guide_cta" })}>
                  Check your dates
                </Link>
              </Button>
              <WhatsAppButton from="guide_cta" details={{ nights: 3 }} />
            </div>
          </div>
        </section>
      </main>

      <Footer note="Photos of places: Wikimedia Commons contributors" />
      <MobileBar checkTo="/villa#dates" />
    </>
  );
}
