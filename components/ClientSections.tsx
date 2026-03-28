"use client";

import dynamic from "next/dynamic";
import { BLUR_TEXT_1_LINES, BLUR_TEXT_2_LINES, BLUR_TEXT_3_LINES } from "@/lib/constants";

const Hero = dynamic(() => import("@/components/sections/Hero"));
const BlurText = dynamic(() => import("@/components/sections/BlurText"), {
  ssr: false,
  loading: () => <div style={{ height: "100vh", background: "#000" }} />,
});
const FeaturedWork = dynamic(() => import("@/components/sections/FeaturedWork"), {
  ssr: false,
  loading: () => <div style={{ height: "80vh", background: "#000" }} />,
});
const Services = dynamic(() => import("@/components/sections/Services"), {
  ssr: false,
  loading: () => <div style={{ height: "86vh", background: "#000" }} />,
});
const Process      = dynamic(() => import("@/components/sections/Process"),      { ssr: false, loading: () => <div style={{ height: "600vh", background: "#000" }} /> });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { ssr: false, loading: () => <div style={{ height: "380vh", background: "#000" }} /> });
const FAQ          = dynamic(() => import("@/components/sections/FAQ"),          { ssr: false, loading: () => <div style={{ height: "80vh",  background: "#000" }} /> });
const Contact      = dynamic(() => import("@/components/sections/Contact"),      { ssr: false, loading: () => <div style={{ height: "70vh",  background: "#000" }} /> });

export default function ClientSections() {
  return (
    <>
      <Hero />
      <div className="hidden md:block">
        <BlurText lines={BLUR_TEXT_1_LINES} />
        <FeaturedWork />
      </div>
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
