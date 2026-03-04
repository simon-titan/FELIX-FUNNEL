"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { projectConfig } from "@/config";
import { matchPath } from "@/utils/url-matcher";
import * as CookieConsent from "vanilla-cookieconsent";

export function GoogleAnalytics() {
  const pathname = usePathname();
  const config = projectConfig.googleAnalytics;

  if (!config.enabled || !config.measurementId) {
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

  const gtag = (...args: any[]) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag(...args);
    }
  };

  useEffect(() => {
    if (!hasConsent()) {
      return;
    }

    // Page View Tracking
    if (config.advanced.pageViewTracking) {
      gtag("config", config.measurementId, {
        page_path: pathname,
        anonymize_ip: config.advanced.anonymizeIp,
      });
    }
  }, [pathname]);

  // Outbound Link Tracking
  useEffect(() => {
    if (!hasConsent() || !config.advanced.outboundLinkTracking) {
      return;
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Prüfe, ob es ein Outbound Link ist
      if (
        href.startsWith("http") &&
        !href.includes(window.location.hostname)
      ) {
        gtag("event", "click", {
          event_category: "outbound",
          event_label: href,
          transport_type: "beacon",
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Download Tracking
  useEffect(() => {
    if (!hasConsent() || !config.advanced.downloadTracking) {
      return;
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Prüfe, ob es ein Download ist
      const isDownload = config.advanced.downloadExtensions.some((ext) =>
        href.toLowerCase().endsWith(`.${ext}`)
      );

      if (isDownload) {
        gtag("event", "file_download", {
          event_category: "downloads",
          event_label: href,
          transport_type: "beacon",
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.measurementId}', {
              page_path: window.location.pathname,
              anonymize_ip: ${config.advanced.anonymizeIp},
            });
          `,
        }}
      />
    </>
  );
}

