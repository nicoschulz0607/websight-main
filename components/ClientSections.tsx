"use client";

import dynamic from "next/dynamic";
import { BLUR_TEXT_1_LINES, BLUR_TEXT_2_LINES, BLUR_TEXT_3_LINES } from "@/lib/constants";

const Hero         = dynamic(() => import("@/components/sections/Hero"),         { ssr: false });
const BlurText     = dynamic(() => import("@/components/sections/BlurText"),     { ssr: false });
const FeaturedWork = dynamic(() => import("@/components/sections/FeaturedWork"), { ssr: false });
const Services     = dynamic(() => import("@/components/sections/Services"),     { ssr: false });
const Process      = dynamic(() => import("@/components/sections/Process"),      { ssr: false });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { ssr: false });
const FAQ          = dynamic(() => import("@/components/sections/FAQ"),          { ssr: false });
const Contact      = dynamic(() => import("@/components/sections/Contact"),      { ssr: false });

export default function ClientSections() {
  return (
    <>
      <Hero />
      <BlurText lines={BLUR_TEXT_1_LINES} />
      <FeaturedWork />
      <BlurText lines={BLUR_TEXT_2_LINES} />
      <Services />
      <BlurText lines={BLUR_TEXT_3_LINES} noBorderTop />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
