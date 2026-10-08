import { getTranslations, setRequestLocale } from "next-intl/server";
import { Contact } from "@/components/Contact";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Services } from "@/components/Services";
import { Solutions } from "@/components/Solutions";
import { Work } from "@/components/Work";
import { BlogFeature } from "@/components/BlogFeature";
import { HomeCalculator } from "@/components/HomeCalculator";
import { PartnershipFeature } from "@/components/PartnershipFeature";
import "../home.css";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations("Nav");
  const tMeta = await getTranslations("Meta");

  return (
    <>
      <JsonLd
        locale={locale}
        title={tMeta("title")}
        description={tMeta("description")}
      />
      <a href="#main" className="skip-link">
        {tNav("skipToContent")}
      </a>
      <Header />
      <Reveal />
      <main id="main" className="flex-1">
        <Hero />
        <Process />
        <Services />
        <HomeCalculator locale={locale} />
        <Work />
        <About />
        <Solutions />
        <BlogFeature />
        <PartnershipFeature locale={locale} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
