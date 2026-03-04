import { Inter } from "next/font/google";
import { projectConfig } from "@/config";
import ClientRootLayout from "./client-root-layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: projectConfig.general.name,
    template: `%s | ${projectConfig.general.name}`,
  },
  description: projectConfig.general.description,
  icons: {
    icon: "/favicon-32x32.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="cc--theme light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <noscript>
          <meta httpEquiv="refresh" content="0; url=/javascript" />
        </noscript>
      </head>
      <body
        className={inter.className}
        style={{ overflowX: "hidden", maxWidth: "100vw" }}
      >
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
