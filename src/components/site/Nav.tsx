import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { track } from "@/lib/booking";

type NavProps = {
  links: { label: string; to: string }[];
  cta: { label: string; to: string };
};

export function Nav({ links, cta }: NavProps) {
  return (
    <nav className="sticky top-0 z-30 border-b border-teak/[.08] bg-butter/[.94] backdrop-blur-[8px]">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 px-gutter py-3.5">
        <Link to="/" className="font-serif text-[22px] font-semibold text-teak hover:text-teak">
          {site.name}
        </Link>
        <div className="hidden flex-wrap items-center gap-6 text-[15px] font-semibold nav:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-teak hover:text-terracotta">
              {l.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link to={cta.to} onClick={() => track("check_dates", { from: "nav" })}>
              {cta.label}
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
