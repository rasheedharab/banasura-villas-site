import { Link } from "react-router-dom";
import { whatsappUrl, track } from "@/lib/booking";

/** Fixed bottom bar shown below 720px on the Homepage and Guide. */
export function MobileBar({ checkTo }: { checkTo: string }) {
  return (
    <div className="nav:hidden">
      <div className="h-20" />
      <div className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-2 gap-2 bg-teak px-3.5 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-[0_-6px_20px_rgba(0,0,0,.15)]">
        <Link
          to={checkTo}
          onClick={() => track("check_dates", { from: "mobile_bar" })}
          className="rounded-[6px] bg-terracotta px-2.5 py-[15px] text-center text-[15px] font-bold text-white hover:bg-terracotta-hover hover:text-white"
        >
          Check your dates
        </Link>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp", { from: "mobile_bar" })}
          className="rounded-[6px] bg-leaf px-2.5 py-[15px] text-center text-[15px] font-bold text-white hover:bg-leaf-hover hover:text-white"
        >
          WhatsApp us
        </a>
      </div>
    </div>
  );
}
