import { Helmet } from "react-helmet-async";
import { site } from "@/content/site";

export function Seo({ title, description, path = "/" }: { title: string; description: string; path?: string }) {
  const url = site.url + path;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: site.name,
    description: "Six three-bedroom pool villas in Padinjarathara, Wayanad, 2 km from Banasura Sagar Dam.",
    url: site.url,
    image: site.url + "/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Padinjarathara",
      addressRegion: "Kerala",
      addressCountry: "IN",
      ...(site.address ? { streetAddress: site.address } : {}),
    },
    ...(site.phone ? { telephone: site.phone } : {}),
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Swimming pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
    ],
  };
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={site.url + "/og-image.jpg"} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
