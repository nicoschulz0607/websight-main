import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/components/providers/CursorContext";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Websight — People-first Digital Agency",
  description:
    "Websight is a people-first digital agency crafting brand identities, web experiences, and digital products that matter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-brand-bg text-cream antialiased">
        <CursorProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CursorProvider>
      </body>
    </html>
  );
}
