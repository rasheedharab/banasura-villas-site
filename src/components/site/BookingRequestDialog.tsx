import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { poolFinePrint, site } from "@/content/site";
import { formatStay, mailtoUrl, track, whatsappUrl } from "@/lib/booking";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  checkIn: Date | null;
  nights: number;
};

/**
 * Booking request form (name, phone, dates, adults, kids). It sends the request
 * on WhatsApp, and by email when an owner email is set in content/site.ts.
 */
export function BookingRequestDialog({ open, onOpenChange, checkIn, nights }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(checkIn ? toInput(checkIn) : "");
  const [n, setN] = useState(nights);
  const [adults, setAdults] = useState(site.maxAdults);
  const [kids, setKids] = useState(0);
  const [villas, setVillas] = useState(1);

  const details = { name, phone, checkIn: date ? fromInput(date) : null, nights: n, adults, kids, villas };
  const mail = mailtoUrl(details);
  const valid = name.trim() && phone.trim() && date;

  const submit = (via: "whatsapp" | "email") => {
    track("booking_submit", { via, nights: n, villas });
    window.open(via === "whatsapp" ? whatsappUrl(details) : mail!, "_blank", "noopener");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (o) {
          setDate(checkIn ? toInput(checkIn) : "");
          setN(nights);
        }
        onOpenChange(o);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Request a booking. <span className="accent">We'll confirm personally.</span>
          </DialogTitle>
          <DialogDescription>
            {details.checkIn ? formatStay(details.checkIn, n) : "Tell us your dates and who's coming."}
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-3.5"
          onSubmit={(e) => {
            e.preventDefault();
            if (valid) submit("whatsapp");
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="br-name">Your name</Label>
            <Input id="br-name" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="br-phone">Phone</Label>
            <Input id="br-phone" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="br-date">Check in</Label>
              <Input id="br-date" required type="date" min={toInput(new Date())} value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="br-nights">Nights</Label>
              <Input id="br-nights" type="number" min={1} max={30} value={n} onChange={(e) => setN(clamp(+e.target.value, 1, 30))} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="br-adults">Adults</Label>
              <Input id="br-adults" type="number" min={1} max={site.maxAdults * 3} value={adults} onChange={(e) => setAdults(clamp(+e.target.value, 1, site.maxAdults * 3))} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="br-kids">Kids under {site.childAgeLimit}</Label>
              <Input id="br-kids" type="number" min={0} max={site.maxChildren * 3} value={kids} onChange={(e) => setKids(clamp(+e.target.value, 0, site.maxChildren * 3))} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="br-villas">Villas</Label>
              <Input id="br-villas" type="number" min={1} max={site.totalVillas} value={villas} onChange={(e) => setVillas(clamp(+e.target.value, 1, site.totalVillas))} />
            </div>
          </div>
          {adults > site.maxAdults * villas && (
            <p className="m-0 text-[13px] text-terracotta">
              Each villa sleeps up to {site.maxAdults} adults and {site.maxChildren} children, so {Math.ceil(adults / site.maxAdults)} villas would fit your group.
            </p>
          )}
          <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button type="submit" variant="whatsapp" size="block" disabled={!valid}>
              Send on WhatsApp
            </Button>
            {mail && (
              <Button type="button" size="block" disabled={!valid} onClick={() => submit("email")}>
                Send by email
              </Button>
            )}
          </div>
          <span className="text-[11px] leading-normal text-bark">{poolFinePrint}</span>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const clamp = (v: number, lo: number, hi: number) => (Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : lo);
const toInput = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fromInput = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
