import { getTranslations, setRequestLocale } from "next-intl/server";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { Services } from "@/components/Services";
import { Stack } from "@/components/Stack";
import { Work } from "@/components/Work";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Nav");

  return (
    <>
      <a href="#main" className="skip-link">
        {t("skipToContent")}
      </a>
      <Header />
      <Reveal />
      <main id="main" className="flex-1">
        <Hero />
        <Work />
        <Services />
        <Contact />
        <Stack />
      </main>
      <Footer />
    </>
  );
}
