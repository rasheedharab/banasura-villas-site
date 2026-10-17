import { Link } from "react-router-dom";
import { site } from "@/content/site";

export function Footer({ note }: { note?: string }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-content flex-wrap justify-between gap-4 px-gutter py-7 text-sm text-bark">
        <Link to="/" className="font-serif text-lg font-semibold text-teak hover:text-teak">
          {site.name}
        </Link>
        <span>{note ?? site.locality}</span>
      </div>
    </footer>
  );
}
