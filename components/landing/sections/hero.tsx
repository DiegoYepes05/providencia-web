import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { hero } from "@/content/landing";

export function Hero() {
  return (
    <section className="glow-mint relative overflow-hidden">
      <Container className="py-16 lg:py-24">
        <div
          data-anim-group="load"
          className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16"
        >
          <div>
            <span data-anim className="inline-block">
              <Badge>{hero.badge}</Badge>
            </span>

            <h1
              data-anim
              className="mt-7 text-[2.75rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.25rem] lg:text-display"
            >
              {hero.headline.lead}{" "}
              <span className="text-brand-600">{hero.headline.accent}</span>
            </h1>

            <p data-anim className="mt-6 max-w-md text-[15px] leading-7 text-muted">
              {hero.body}
            </p>

            <div data-anim className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={hero.actions.primary.href}>
                {hero.actions.primary.label}
              </ButtonLink>
              <ButtonLink href={hero.actions.secondary.href} variant="secondary">
                {hero.actions.secondary.label}
              </ButtonLink>
            </div>

            <ul
              data-anim
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
            >
              {hero.trust.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs text-muted"
                >
                  <span className="size-1.5 rounded-full bg-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div
              data-anim="scale-in"
              className="overflow-hidden rounded-3xl border border-white/70 shadow-[0_30px_70px_-30px_rgba(6,60,50,0.35)]"
            >
              <Image
                src="/hero-glass.svg"
                alt="Representación abstracta de la plataforma modular de Providencia"
                width={800}
                height={600}
                priority
                unoptimized
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
