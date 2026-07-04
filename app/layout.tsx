import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/components/providers/CursorContext";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL = "https://websight-design.de";
const SITE_TITLE = "Websight — Webdesign & SEO aus Balingen";
const SITE_DESCRIPTION =
  "Websites für Handwerker, Praxen und lokale Dienstleister — schnell, modern und gebaut, um Anfragen zu bringen. Webdesign, SEO und Automatisierung aus Balingen.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Websight",
  },
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Websight",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={geist.variable}>
      <body className="bg-brand-bg text-cream antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Websight",
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              telephone: "+49 172 9249820",
              email: "nico@websight-design.de",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Balingen",
                addressCountry: "DE",
              },
              areaServed: "DE",
              priceRange: "€€",
              sameAs: [],
            }),
          }}
        />
        <CursorProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CursorProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
