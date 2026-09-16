import { Eyebrow } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { about } from "@/content/landing";

export function About() {
  return (
    <section id="nosotros" className="bg-surface">
      <Container className="py-20 lg:py-28">
        <Eyebrow>{about.eyebrow}</Eyebrow>

        <div data-anim-group className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <h2
            data-anim
            className="text-[2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.5rem]"
          >
            {about.heading}
          </h2>

          <div className="space-y-5">
            {about.body.map((paragraph) => (
              <p
                key={paragraph}
                data-anim
                className="text-[15px] leading-7 text-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <dl
          data-anim-group
          className="mt-16 grid gap-y-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {about.stats.map((stat) => (
            <div key={stat.label} data-anim>
              <dt className="text-[2rem] font-extrabold tracking-[-0.03em] text-brand-600">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
