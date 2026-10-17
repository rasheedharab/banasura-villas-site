import { travel } from "@/content/site";
import { cn } from "@/lib/utils";

export function TravelList({ roomy }: { roomy?: boolean }) {
  return (
    <div className="flex flex-col">
      {travel.map((t) => (
        <div
          key={t.from}
          className={cn("flex justify-between gap-3 border-b border-line text-[15px]", roomy ? "py-3.5" : "py-3")}
        >
          <span>{t.from}</span>
          <span className="text-right text-bark">{t.d}</span>
        </div>
      ))}
    </div>
  );
}
