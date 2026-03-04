"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { projectConfig } from "@/config";
import { matchPath } from "@/utils/url-matcher";
import * as CookieConsent from "vanilla-cookieconsent";

export function MetaPixel() {
  const pathname = usePathname();
  const config = projectConfig.metaAds;

  if (!config.enabled || !config.pixelId) {
    return null;
  }

  // Prüfe, ob der aktuelle Pfad eingeschlossen werden soll
  const shouldInclude = config.includePaths.length === 0 
    ? true 
    : config.includePaths.some((path) => matchPath(pathname, path));

  // Prüfe, ob der aktuelle Pfad ausgeschlossen werden soll
  const shouldExclude = config.excludePaths.some((path) =>
    matchPath(pathname, path)
  );

  if (!shouldInclude || shouldExclude) {
    return null;
  }

  // Prüfe Cookie Consent
  const hasConsent = () => {
    const prefs = CookieConsent.getUserPreferences();
    return prefs.acceptedCategories.includes(config.cookieCategory);
  };

  const fbq = (...args: any[]) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq(...args);
    }
  };

  useEffect(() => {
    if (!hasConsent()) {
      return;
    }

    // PageView Tracking
    if (config.autoTrackEvents.pageView) {
      fbq("track", "PageView");
    }
  }, [pathname]);

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${config.pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${config.pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

