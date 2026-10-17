import { Button, type ButtonProps } from "@/components/ui/button";
import { whatsappUrl, track, type BookingDetails } from "@/lib/booking";

type Props = Omit<ButtonProps, "asChild" | "variant"> & { details?: BookingDetails; from: string; label?: string };

export function WhatsAppButton({ details, from, label = "WhatsApp us", ...props }: Props) {
  return (
    <Button asChild variant="whatsapp" {...props}>
      <a
        href={whatsappUrl(details)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp", { from })}
      >
        {label}
      </a>
    </Button>
  );
}
