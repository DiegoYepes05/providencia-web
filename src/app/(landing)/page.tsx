import { Hero } from "@/components/landing/sections/hero";
import { Capabilities } from "@/components/landing/sections/capabilities";
import { BatteryComparison } from "@/components/landing/sections/battery-comparison";
import { ProductsPreview } from "@/components/landing/sections/products-preview";
import { Experience } from "@/components/landing/sections/experience";
import { About } from "@/components/landing/sections/about";
import { Testimonial } from "@/components/landing/sections/testimonial";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <BatteryComparison />
      <ProductsPreview />
      <Experience />
      <About />
      <Testimonial />
    </>
  );
}
