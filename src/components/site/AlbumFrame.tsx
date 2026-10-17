import { cn } from "@/lib/utils";

/** White polaroid-style frame with a handwritten-feel caption. */
export function AlbumFrame({
  src,
  alt,
  caption,
  ratio,
  position = "center",
  className,
  style,
}: {
  src: string;
  alt: string;
  caption: string;
  ratio: string;
  position?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <figure
      className={cn("absolute m-0 box-border bg-white px-3 pt-3 pb-[46px] shadow-frame", className)}
      style={style}
    >
      <img
        src={src}
        alt={alt}
        className="block w-full object-cover"
        style={{ aspectRatio: ratio, objectPosition: position }}
        loading="eager"
      />
      <figcaption className="absolute bottom-[13px] left-3.5 font-serif text-[17px] italic text-teak">
        {caption}
      </figcaption>
    </figure>
  );
}
