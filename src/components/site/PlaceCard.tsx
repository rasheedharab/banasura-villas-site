import type { Place } from "@/content/places";
import type { WikiImageState } from "@/lib/wikimedia";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

/** Guide "Places" card: 3:2 photo on top, details below. */
export function PlaceCard({ place, img }: { place: Place; img: WikiImageState }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-[12px] border border-teak/10 bg-white">
      <div className="relative aspect-[3/2] overflow-hidden bg-placeholder">
        {img === null && <PhotoPlaceholder label={`Photo of ${place.name} coming soon`} />}
        {img && (
          <img
            src={img}
            alt={place.name}
            loading="lazy"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:600ms] ease-in-out group-hover:scale-[1.04]"
          />
        )}
        <div className="pointer-events-none absolute left-3 top-3 flex gap-1.5">
          <span className="rounded-[20px] bg-butter px-2.5 py-[5px] text-xs font-bold">{place.category}</span>
          <span className="rounded-[20px] bg-mango px-2.5 py-[5px] text-xs font-bold">{place.time}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <strong className="font-serif text-[23px] font-semibold leading-[1.15]">{place.name}</strong>
        <span className="text-[15px] leading-[1.55] text-bark">{place.d}</span>
        <div className="mt-auto grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1.5 border-t border-teak/[.08] pt-3 text-sm">
          <span className="font-bold">Best for</span>
          <span className="text-bark">{place.who}</span>
          <span className="font-bold">Tip</span>
          <span className="text-bark">{place.tip}</span>
        </div>
        {img && <span className="text-[11px] text-[#A08770]">{place.credit ?? "Photo: Wikimedia Commons"}</span>}
      </div>
    </div>
  );
}
