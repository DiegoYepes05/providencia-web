import Image from "next/image";
import { Container } from "@/components/ui/container";
import { experience } from "@/content/landing";

export function Experience() {
  return (
    <section id="experiencia" className="scroll-mt-20 bg-void">
      <Container className="py-24 lg:py-32">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-20">
          <div
            data-anim="scale-in"
            className="relative order-2 aspect-4/3 max-h-112 overflow-hidden bg-panel md:order-1 md:aspect-3/4 md:max-h-none"
          >
            <Image
              src={experience.image.src}
              alt={experience.image.alt}
              fill
              sizes="(min-width: 768px) 36rem, 100vw"
              className="object-cover object-center"
            />
          </div>

          <div data-anim-group className="order-1 max-w-xl md:order-2">
            <p
              data-anim
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400"
            >
              {experience.eyebrow}
            </p>
            <h2
              data-anim
              className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl"
            >
              {experience.heading}
            </h2>
            <p
              data-anim
              className="mt-6 max-w-md text-[15px] leading-7 text-white/60"
            >
              {experience.body}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
