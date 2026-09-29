import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { preventa } from "@/content/preventa";

export const metadata: Metadata = {
  title: "Preventa",
  description: preventa.body,
};

export default function PreventaPage() {
  return (
    <section className="bg-void">
      <Container className="grid gap-12 pt-32 pb-20 lg:grid-cols-2 lg:items-center lg:pt-40 lg:pb-28">
        <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-[#eceae4] lg:aspect-4/5">
          <Image
            src={preventa.image.src}
            alt={preventa.image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[70%_40%]"
          />
        </div>

        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] text-brand-400 uppercase">
            {preventa.eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl">
            {preventa.headline}
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-white/55">
            {preventa.body}
          </p>

          <dl className="mt-10 space-y-5 border-t border-white/10 pt-8">
            {preventa.points.map((point) => (
              <div key={point.label}>
                <dt className="text-[11px] tracking-[0.16em] text-white/40 uppercase">
                  {point.label}
                </dt>
                <dd className="mt-1 text-base text-white">{point.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={preventa.actions.whatsapp.href}
              target="_blank"
              rel="noreferrer"
            >
              {preventa.actions.whatsapp.label}
            </ButtonLink>
            <ButtonLink href={preventa.actions.catalog.href} variant="secondary">
              {preventa.actions.catalog.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
