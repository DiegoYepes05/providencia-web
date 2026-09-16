import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/landing/contact-form";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agenda una sesión con el equipo técnico de Providencia y sal con un diagnóstico inicial de tu operación.",
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
        title="Agenda 30 minutos con nuestro equipo"
        description="Cuéntanos qué necesitas resolver. Salimos de la llamada con un diagnóstico inicial y los siguientes pasos, sin compromiso."
      />

      <section className="bg-surface">
        <Container className="grid gap-10 py-20 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-ink">
              Datos de contacto
            </h2>
            <dl className="mt-7 space-y-6">
              {details.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-ink">
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
