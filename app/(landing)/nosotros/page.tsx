import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { About } from "@/components/landing/sections/about";
import { Process } from "@/components/landing/sections/process";
import { Testimonial } from "@/components/landing/sections/testimonial";
import { FinalCta } from "@/components/landing/sections/final-cta";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce al equipo que diseña, implementa y opera la infraestructura digital de compañías en logística, banca y retail.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nosotros"
        title="Un equipo técnico que se queda operando contigo"
        description="Somos 120 especialistas en datos, automatización y seguridad. Nos contratan cuando la operación no puede detenerse y el margen de error es mínimo."
      />
      <About />
      <Process />
      <Testimonial />
      <FinalCta />
    </>
  );
}
