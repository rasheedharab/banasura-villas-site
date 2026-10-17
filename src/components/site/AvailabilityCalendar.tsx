import { freeVillas, freeForStay } from "@/lib/availability";
import { formatStay } from "@/lib/booking";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type Props = {
  month: { y: number; m: number };
  onMonthChange: (v: { y: number; m: number }) => void;
  checkIn: Date | null;
  onCheckIn: (d: Date) => void;
  nights: number;
  onNights: (n: number) => void;
};

const startOfToday = () => {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
};

export function AvailabilityCalendar({ month, onMonthChange, checkIn, onCheckIn, nights, onNights }: Props) {
  const { y, m } = month;
  const today = startOfToday();
  const lead = (new Date(y, m, 1).getDay() + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  const atCurrentMonth = y === today.getFullYear() && m <= today.getMonth();

  const inRange = (d: Date) => {
    if (!checkIn) return false;
    const diff = Math.round((d.getTime() - checkIn.getTime()) / 86400000);
    return diff >= 0 && diff < nights;
  };

  const summaryFree = checkIn ? freeForStay(checkIn, nights) : null;

  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-teak/10 bg-white p-[clamp(18px,2.4vw,26px)] shadow-booking">
      <div className="flex items-center justify-between gap-3">
        <button
          aria-label="Previous month"
          disabled={atCurrentMonth}
          onClick={() => onMonthChange(m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 })}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-teak/20 font-bold disabled:cursor-default disabled:opacity-30"
        >
          ‹
        </button>
        <strong className="font-serif text-[22px]">
          {MONTHS[m]} {y}
        </strong>
        <button
          aria-label="Next month"
          onClick={() => onMonthChange(m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 })}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-teak/20 font-bold"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-bark">
        {DOW.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: lead }).map((_, i) => (
          <div key={"lead" + i} />
        ))}
        {Array.from({ length: days }).map((_, i) => {
          const date = new Date(y, m, i + 1);
          const past = date < today;
          const free = freeVillas(date);
          const chosen = inRange(date);
          const isCheckIn = checkIn && date.getTime() === checkIn.getTime();
          const selectable = !past && free > 0;
          return (
            <button
              key={i}
              disabled={!selectable}
              onClick={() => onCheckIn(date)}
              aria-label={`${date.toDateString()}, ${past ? "past" : free === 0 ? "full" : free + " villas free"}`}
              className={cn(
                "flex aspect-[1/1.05] flex-col items-center justify-center gap-px rounded-[6px] border",
                selectable ? "cursor-pointer" : "cursor-default",
                isCheckIn ? "border-2 border-terracotta" : "border-transparent",
                chosen
                  ? "bg-teak text-butter"
                  : past
                    ? "bg-transparent text-teak opacity-35"
                    : free === 0
                      ? "bg-cal-full text-teak"
                      : free <= 2
                        ? "bg-cal-few text-teak"
                        : "bg-cal-free text-teak",
              )}
            >
              <span className="text-sm font-bold">{i + 1}</span>
              <span className="text-[10px] font-bold">{past ? "" : free === 0 ? "full" : `${free} free`}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3.5 text-xs text-bark">
        <Legend color="bg-cal-free" label="Villas free" />
        <Legend color="bg-cal-few" label="1–2 left" />
        <Legend color="bg-cal-full" label="Full" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[13px] font-bold text-bark">Nights</span>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((v) => (
            <button
              key={v}
              aria-pressed={nights === v}
              onClick={() => onNights(v)}
              className={cn(
                "flex-1 cursor-pointer rounded-[6px] border border-teak/[.15] py-2.5 text-center font-bold",
                nights === v ? "bg-teak text-butter" : "bg-white text-teak",
              )}
            >
              {v === 4 ? "4+" : v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1 rounded-[8px] bg-butter px-4 py-3.5">
        <strong className="text-base">{checkIn ? formatStay(checkIn, nights) : "Pick a check-in date"}</strong>
        <span className="text-[13px] text-bark">
          {summaryFree == null
            ? `Numbers show how many of the ${site.totalVillas} villas are free.`
            : summaryFree <= 2
              ? `Only ${summaryFree} of ${site.totalVillas} villas free for your dates.`
              : `${summaryFree} of ${site.totalVillas} villas free for your dates.`}
        </span>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("h-2.5 w-2.5 rounded-[3px]", color)} />
      {label}
    </span>
  );
}
