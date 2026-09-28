import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { hero } from "@/content/landing";

export function Hero() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-void">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[78%_42%] lg:object-[72%_38%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-void via-void/80 to-void/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-void via-transparent to-void/40"
      />

      <Container className="relative flex min-h-svh flex-col justify-end pb-16 pt-28 lg:justify-center lg:pb-24 lg:pt-32">
        <div
          data-anim-group="load"
          className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
        >
          <div className="max-w-xl">
            <p
              data-anim
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50"
            >
              {hero.eyebrow}
            </p>

            <h1
              data-anim
              className="mt-5 text-[3.25rem] font-semibold leading-[0.92] tracking-[-0.045em] text-white sm:text-6xl lg:text-display"
            >
              {hero.headline}
            </h1>

            <p
              data-anim
              className="mt-6 max-w-md text-[15px] leading-7 text-white/55"
            >
              {hero.body}
            </p>

            <div data-anim className="mt-9">
              <ButtonLink href={hero.actions.primary.href}>
                {hero.actions.primary.label}
                <span aria-hidden="true">→</span>
              </ButtonLink>
            </div>
          </div>

          <dl
            data-anim
            className="grid grid-cols-3 gap-6 sm:gap-10 lg:min-w-88"
          >
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                  {stat.value}
                  <span className="ml-1 text-sm font-medium text-white/45">
                    {stat.unit}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
