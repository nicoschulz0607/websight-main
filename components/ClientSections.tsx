"use client";

import dynamic from "next/dynamic";
import { BLUR_TEXT_1_LINES, BLUR_TEXT_2_LINES, BLUR_TEXT_3_LINES } from "@/lib/constants";

const Hero = dynamic(() => import("@/components/sections/Hero"));
const BlurText = dynamic(() => import("@/components/sections/BlurText"));
const FeaturedWork = dynamic(() => import("@/components/sections/FeaturedWork"));
const Services = dynamic(() => import("@/components/sections/Services"));
// CTABanner temporär ausgeblendet — Import bleibt, damit die Sektion jederzeit wieder eingehängt werden kann.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CTABanner    = dynamic(() => import("@/components/CTABanner"));
const Process      = dynamic(() => import("@/components/sections/Process"));
// Testimonials temporär ausgeblendet — Import bleibt, damit die Sektion jederzeit wieder eingehängt werden kann.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const FAQ          = dynamic(() => import("@/components/sections/FAQ"));
const Contact      = dynamic(() => import("@/components/sections/Contact"));

export default function ClientSections() {
  return (
    <>
      <Hero />
      <div className="hidden md:block">
        <BlurText lines={BLUR_TEXT_1_LINES} />
      </div>
      <FeaturedWork />
      <BlurText lines={BLUR_TEXT_2_LINES} />
      <Services />
      {/* CTABanner temporär ausgeblendet — Komponente bleibt erhalten, bis wieder gebraucht */}
      {/* <CTABanner /> */}
      <BlurText lines={BLUR_TEXT_3_LINES} noBorderTop />
      <Process />
      {/* Testimonials temporär ausgeblendet — Komponente bleibt erhalten, bis wieder gebraucht */}
      {/* <Testimonials /> */}
      <FAQ />
      <Contact />
    </>
  );
}
