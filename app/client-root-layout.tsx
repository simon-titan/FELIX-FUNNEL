"use client";

import Provider from "@/components/provider/provider";
import { projectConfig } from "@/config";
import { useChatVisibility } from "@/utils/use-chat-visibility";
import { Analytics } from "@/components/analytics";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "@/styles/cookie-banner-styles.css";
import "@/styles/outseta-styles.css";
import "@/styles/global-styles.css";
import * as CookieConsent from "vanilla-cookieconsent";
import { useEffect } from "react";
import Script from "next/script";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useChatVisibility();

  useEffect(() => {
    if (projectConfig.cookieBannerOptions) {
      CookieConsent.run(projectConfig.cookieBannerOptions as any);
    } else {
      console.warn("Cookie banner options are not defined in projectConfig.");
    }
  }, []);

  return (
    <>
      <Script
        id="outseta-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `var o_options = ${JSON.stringify(projectConfig.outsetaOptions)};`,
        }}
      />
      <Script
        id="outseta-script"
        src="https://cdn.outseta.com/outseta.min.js"
        data-options="o_options"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log("Outseta loaded successfully");
        }}
        onError={(e) => {
          console.error("Error loading Outseta:", e);
        }}
      />
      <Provider>{children}</Provider>
      <Analytics />
    </>
  );
}
