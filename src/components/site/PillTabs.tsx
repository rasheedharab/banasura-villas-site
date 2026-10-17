import { cn } from "@/lib/utils";

/** Segmented control (plan length) */
export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap rounded-[30px] border border-teak/[.12] bg-white p-1">
      {options.map((o) => (
        <button
          key={o}
          role="tab"
          aria-selected={value === o}
          onClick={() => onChange(o)}
          className={cn(
            "cursor-pointer rounded-[26px] px-5 py-2.5 text-[15px] font-bold transition-colors",
            value === o ? "bg-teak text-butter" : "bg-transparent text-teak hover:bg-butter",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/** Category filter pills */
export function FilterPills<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={cn(
            "cursor-pointer rounded-[20px] border border-teak/[.15] px-4 py-2 text-sm font-bold transition-colors",
            value === o ? "bg-teak text-butter" : "bg-transparent text-teak hover:bg-white",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
