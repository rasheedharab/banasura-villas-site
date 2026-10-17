import { useEffect, useState } from "react";
import type { WikiSource } from "@/content/places";

/**
 * Looks up a photo for a place or dish on Wikipedia / Wikimedia Commons.
 * Results are cached for the session so each image is resolved once.
 */

const cache = new Map<string, Promise<string | null>>();

const fileName = (src: string) => {
  const parts = src.split("?")[0].split("/");
  const f = parts.includes("thumb") ? parts[parts.length - 2] : parts[parts.length - 1];
  return decodeURIComponent(f).replace(/^\d+px-/, "");
};

type ImageInfoPage = { title: string; imageinfo?: { url: string; thumburl?: string }[] };

const info = (q: string): Promise<ImageInfoPage[]> =>
  fetch(
    "https://commons.wikimedia.org/w/api.php?" + q + "&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json&origin=*",
  )
    .then((r) => r.json())
    .then((j) => (j.query && j.query.pages ? (Object.values(j.query.pages) as ImageInfoPage[]) : []))
    .catch(() => []);

const fromWiki = (title: string, must?: string): Promise<string | null> =>
  fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title))
    .then((r) => (r.ok ? r.json() : null))
    .then((j) => {
      const s = j && (j.originalimage || j.thumbnail);
      if (!s) return null;
      if (must && !fileName(s.source).toLowerCase().includes(must)) return null;
      return info("action=query&titles=" + encodeURIComponent("File:" + fileName(s.source))).then((ps) => {
        const ii = ps[0]?.imageinfo?.[0];
        return ii ? ii.thumburl || ii.url : null;
      });
    })
    .catch(() => null);

const fromCommons = (q: string, must?: string): Promise<string | null> =>
  info(
    "action=query&generator=search&gsrnamespace=6&gsrlimit=20&gsrsearch=" + encodeURIComponent(q + " filetype:bitmap"),
  ).then((ps) => {
    const m = must || q.split(" ")[0].toLowerCase();
    const p = ps.find((p) => p.title.toLowerCase().includes(m) && p.imageinfo);
    return p ? p.imageinfo![0].thumburl || p.imageinfo![0].url : null;
  });

export function resolveWikiImage(key: string, src: WikiSource) {
  let p = cache.get(key);
  if (!p) {
    p = (async () => {
      for (const t of src.titles) {
        const u = await fromWiki(t, src.must);
        if (u) return u;
      }
      return fromCommons(src.query, src.must);
    })();
    cache.set(key, p);
  }
  return p;
}

/** undefined = loading, null = no image found, string = image URL */
export type WikiImageState = string | null | undefined;

export function useWikiImages(items: { key: string; wiki: WikiSource; image?: string }[]) {
  const [imgs, setImgs] = useState<Record<string, WikiImageState>>(() =>
    Object.fromEntries(items.filter((i) => i.image).map((i) => [i.key, i.image])),
  );
  useEffect(() => {
    let alive = true;
    items.forEach((i) => {
      if (i.image) return;
      resolveWikiImage(i.key, i.wiki).then((u) => {
        if (alive) setImgs((s) => ({ ...s, [i.key]: u }));
      });
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return imgs;
}
