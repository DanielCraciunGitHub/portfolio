import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
// @ts-ignore - No type declarations
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/styles/globals.css";

import { Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import { Provider } from "@/providers/root";
import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";

import { baseMetadata, baseViewport } from "@/config/metadata";
import { baseStructuredData } from "@/config/structuredData";
import { cn } from "@/lib/utils";
import ScrollToTopButton from "@/components/Buttons/ScrollToTopButton";

export const metadata: Metadata = {
  ...baseMetadata,
};
export const viewport: Viewport = {
  ...baseViewport,
};

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7731736693350784"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <Script
        id="WebSite Structured Data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(baseStructuredData),
        }}
      />

      <body
        className={cn("flex min-h-screen flex-col", bricolage.className)}
      >
        <NextTopLoader showSpinner={false} color="blue" />
        <Provider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </Provider>
        <Analytics />
        <SpeedInsights />
        <ScrollToTopButton />
        <GoogleAnalytics gaId="G-CQFF80GV96" />
      </body>
    </html>
  );
}
