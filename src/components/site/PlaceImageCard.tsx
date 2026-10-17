import type { Place } from "@/content/places";
import type { WikiImageState } from "@/lib/wikimedia";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { cn } from "@/lib/utils";

/** Homepage "Things to do" card: full-bleed photo with text over a gradient. */
export function PlaceImageCard({ place, img, feature }: { place: Place; img: WikiImageState; feature?: boolean }) {
  return (
    <div
      className={cn(
        "group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[10px] bg-placeholder shadow-card",
        feature && "feature:col-span-2",
      )}
    >
      {img === null && (
        <div className="absolute inset-0">
          <PhotoPlaceholder label={`Photo of ${place.name} coming soon`} className="items-start pt-16" />
        </div>
      )}
      {img && (
        <img
          src={img}
          alt={place.name}
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:600ms] ease-in-out group-hover:scale-[1.04]"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(58,38,24,0)_35%,rgba(42,26,14,.88)_100%)]" />
      <div className="pointer-events-none absolute left-3.5 top-3.5 flex gap-2">
        <span className="rounded-[20px] bg-butter px-[11px] py-1.5 text-xs font-bold text-teak">{place.category}</span>
        <span className="rounded-[20px] bg-mango px-[11px] py-1.5 text-xs font-bold text-teak">{place.time} away</span>
      </div>
      <div className="pointer-events-none relative flex flex-col gap-1.5 p-[22px] text-white">
        <strong className="font-serif text-[26px] font-semibold leading-[1.1]">{place.name}</strong>
        <span className="max-w-[520px] text-[15px] leading-normal text-cream-light">{place.short ?? place.d}</span>
        {img && <span className="text-[11px] text-muted-dark">{place.credit ?? "Photo: Wikimedia Commons"}</span>}
      </div>
    </div>
  );
}
