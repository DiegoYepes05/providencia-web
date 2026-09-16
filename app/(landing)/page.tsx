import { Hero } from "@/components/landing/sections/hero";
import { Clients } from "@/components/landing/sections/clients";
import { About } from "@/components/landing/sections/about";
import { Capabilities } from "@/components/landing/sections/capabilities";
import { ProductsPreview } from "@/components/landing/sections/products-preview";
import { Process } from "@/components/landing/sections/process";
import { Testimonial } from "@/components/landing/sections/testimonial";
import { FinalCta } from "@/components/landing/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Clients />
      <About />
      <Capabilities />
      <ProductsPreview />
      <Process />
      <Testimonial />
      <FinalCta />
    </>
  );
}
