import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/landing/contact-form";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escribe al equipo de Veltor para reservar tu vehículo.",
};

const details = [
  { label: "Correo", value: siteConfig.contact.email },
  { label: "Teléfono", value: siteConfig.contact.phone },
  { label: "Oficina", value: siteConfig.contact.address },
  { label: "Horario", value: "Lunes a viernes, 8:00 a 18:00 (GMT-5)" },
];

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos de tu próximo impulso."
        description="Cuéntanos ciudad y modelo. Confirmamos disponibilidad el mismo día."
      />

      <section className="bg-panel">
        <Container className="grid gap-14 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-white">
              Datos de contacto
            </h2>
            <dl className="mt-8 space-y-7">
              {details.map((item) => (
                <div key={item.label}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-400">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-white/60">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ContactForm />
        </Container>
      </section>
    </>
  );
}
