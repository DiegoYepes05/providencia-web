import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { finalCta } from "@/content/landing";

export function FinalCta() {
  return (
    <section className="bg-white pb-20 lg:pb-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center sm:px-16">
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl"
          />
          <div data-anim-group className="relative">
            <h2
              data-anim
              className="mx-auto max-w-2xl text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-white sm:text-[2.25rem]"
            >
              {finalCta.heading}
            </h2>
            <p
              data-anim
              className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/65"
            >
              {finalCta.body}
            </p>
            <div data-anim className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href={finalCta.primary.href} variant="brand">
                {finalCta.primary.label}
              </ButtonLink>
              <ButtonLink
                href={finalCta.secondary.href}
                className="border border-white/20 bg-transparent text-white hover:bg-white/10"
              >
                {finalCta.secondary.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
