import { cn } from "@/lib/utils";

/** Shown where an owner photo is still to come. */
export function PhotoPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-placeholder p-4 text-center font-serif text-[17px] italic text-bark",
        className,
      )}
    >
      {label}
    </div>
  );
}
