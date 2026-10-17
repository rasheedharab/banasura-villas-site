import { cn } from "@/lib/utils";

/** Eyebrow + headline + optional intro, the pattern every section opens with. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark,
  size = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  dark?: boolean;
  size?: "h2" | "h2-md" | "h2-sm";
  className?: string;
}) {
  return (
    <div className={cn("flex max-w-[640px] flex-col gap-3.5", className)}>
      {eyebrow && <div className={cn("eyebrow", dark && "text-mango")}>{eyebrow}</div>}
      <h2
        className={cn(
          "m-0 font-serif font-semibold",
          size === "h2" && "text-h2",
          size === "h2-md" && "text-h2-md",
          size === "h2-sm" && "text-h2-sm",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("m-0 text-[17px] leading-[1.65]", dark ? "text-cream" : "text-bark")}>{intro}</p>
      )}
    </div>
  );
}

export function Accent({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <span className={dark ? "accent-dark" : "accent"}>{children}</span>;
}
