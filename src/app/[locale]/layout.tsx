import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CookieConsent } from "@/components/CookieConsent";
import "../globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jakuninoleg.dev";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");
  const canonical = `${siteUrl}/${locale}`;
  // Query busts Telegram's sticky OG image cache after WebpageBot refreshes.
  const ogImage = {
    url: "/og.png?v=20260912",
    width: 1200,
    height: 630,
    alt: "Jakunin Oleg — Frontend / Fullstack",
    type: "image/png",
  };

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s · Jakunin Oleg`,
    },
    description,
    keywords: keywords.split(",").map((item) => item.trim()),
    authors: [{ name: "Jakunin Oleg", url: siteUrl }],
    creator: "Jakunin Oleg",
    publisher: "Jakunin Oleg",
    category: "technology",
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${siteUrl}/${l}`]),
      ),
    },
    openGraph: {
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "en_US",
      url: canonical,
      siteName: "Jakunin Oleg",
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png?v=20260912"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      ],
      apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    },
  };
}

export function generateViewport() {
  return {
    themeColor: "#07090f",
    colorScheme: "dark" as const,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const clientMessages = { Nav: messages.Nav, Contact: messages.Contact };

  return (
    <html
      lang={locale}
      className="h-full antialiased"
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider messages={clientMessages}>{children}</NextIntlClientProvider>
        <CookieConsent locale={locale} />
      </body>
    </html>
  );
}
