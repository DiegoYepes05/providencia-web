import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { About } from "@/components/landing/sections/about";
import { Process } from "@/components/landing/sections/process";
import { Clients } from "@/components/landing/sections/clients";
import { Testimonial } from "@/components/landing/sections/testimonial";
import { aboutPage } from "@/content/landing";

export const metadata: Metadata = {
  title: "Nosotros",
  description: aboutPage.description,
};

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
        description={aboutPage.description}
      />
      <About />
      <Process />
      <Clients />
      <Testimonial />
    </>
  );
}
