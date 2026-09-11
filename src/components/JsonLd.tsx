import { site } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jakuninoleg.dev";

type JsonLdProps = {
  locale: string;
  title: string;
  description: string;
};

export function JsonLd({ locale, title, description }: JsonLdProps) {
  const pageUrl = `${siteUrl}/${locale}`;
  const sameAs = [site.github, site.telegram];

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        description,
        inLanguage: locale,
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
        inLanguage: locale,
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: site.name,
        url: siteUrl,
        email: site.email,
        jobTitle: "Frontend / Fullstack Developer",
        description,
        image: `${siteUrl}/mascot/mascot-contact.webp`,
        sameAs,
        knowsAbout: [
          "Web development",
          "Frontend development",
          "Fullstack development",
          "Next.js",
          "React",
          "Website creation",
          "Web applications",
          "AI product features",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: `${site.name} — web development`,
        url: pageUrl,
        image: `${siteUrl}/mascot/mascot-contact.webp`,
        description,
        provider: { "@id": `${siteUrl}/#person` },
        areaServed: "Worldwide",
        serviceType: [
          "Website development",
          "Landing page development",
          "Web application development",
          "MVP development",
          "Frontend development",
          "Fullstack development",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
