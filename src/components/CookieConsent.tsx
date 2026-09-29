"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import styles from "./CookieConsent.module.css";

const STORAGE_KEY = "oj-cookie-consent-v2";
const COUNTER_ID = 113131551;
const GTM_ID = "GTM-PSVWGX5K";
type Choice = "accepted" | "necessary";

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

// Kept outside React so a locale-layout remount does not lose the previous page.
let lastTrackedUrl: string | null = null;
let sessionChoice: Choice | null = null;

function readChoice(): Choice | null | undefined {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "accepted" || saved === "necessary") return saved;
  } catch { /* Storage may be unavailable in private browsing. */ }
  return sessionChoice;
}

function subscribeChoice(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("cookie-consent-changed", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("cookie-consent-changed", onChange);
  };
}

const subscribeHost = () => () => {};
const isProductionHost = () => ["jakuninoleg.dev", "www.jakuninoleg.dev"].includes(location.hostname);
const serverChoice = (): undefined => undefined;
const serverHost = () => false;

function Metrika() {
  const pathname = usePathname();

  useEffect(() => {
    const url = window.location.origin + pathname;
    if (lastTrackedUrl && lastTrackedUrl !== url) {
      window.ym?.(COUNTER_ID, "hit", url, { referer: lastTrackedUrl, title: document.title });
    }
    lastTrackedUrl = url;
  }, [pathname]);

  return <Script id="yandex-metrika" strategy="afterInteractive">{`
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
    })(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}','ym');
    ym(${COUNTER_ID},'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:'dataLayer',referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});
  `}</Script>;
}

function GoogleTagManager() {
  return <Script id="google-tag-manager" strategy="afterInteractive">{`
    (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `}</Script>;
}

export function CookieConsent({ locale }: { locale: string }) {
  const ru = locale !== "en";
  const choice = useSyncExternalStore(subscribeChoice, readChoice, serverChoice);
  const productionHost = useSyncExternalStore(subscribeHost, isProductionHost, serverHost);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener("open-cookie-settings", openSettings);
    return () => window.removeEventListener("open-cookie-settings", openSettings);
  }, []);

  function choose(value: Choice) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch { /* Session-only choice. */ }
    const mustUnloadTracker = choice === "accepted" && value === "necessary" && productionHost;
    sessionChoice = value;
    window.dispatchEvent(new Event("cookie-consent-changed"));
    setSettingsOpen(false);
    if (mustUnloadTracker) window.location.reload();
  }

  return <>
    {choice === "accepted" && productionHost && <><Metrika /><GoogleTagManager /></>}
    {choice !== undefined && (choice === null || settingsOpen) && <div className={styles.banner} role="region" aria-label={ru ? "Настройки аналитических cookie" : "Analytics cookie settings"}>
      <div className={styles.copy}>
        <strong>{ru ? "Можно собирать аналитику?" : "May I use analytics?"}</strong>
        <p>{ru ? "Яндекс Метрика и Google Tag Manager помогают понять, какие страницы полезны. Счётчики и Вебвизор включатся только с вашего согласия." : "Yandex Metrica and Google Tag Manager help me understand which pages are useful. Tags and session replay start only with your permission."} <Link href={`/${locale}/legal/cookies`}>{ru ? "Подробнее о cookie" : "Cookie policy"}</Link></p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.necessary} onClick={() => choose("necessary")}>{ru ? "Только необходимые" : "Necessary only"}</button>
        <button type="button" className={styles.accept} onClick={() => choose("accepted")}>{ru ? "Разрешить аналитику" : "Allow analytics"}</button>
      </div>
    </div>}
  </>;
}

export function CookieSettingsButton({ locale }: { locale: string }) {
  return <button type="button" className={styles.settings} onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}>{locale === "en" ? "Cookie settings" : "Настройки cookie"}</button>;
}
