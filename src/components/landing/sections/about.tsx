import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import {
  about,
  mission,
  valueProposition,
  values,
  vision,
} from "@/content/landing";

export function About() {
  return (
    <>
      <section id="nosotros" className="bg-void">
        <Container className="py-24 lg:py-32">
          <p
            data-anim
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400"
          >
            {about.eyebrow}
          </p>

          <div data-anim-group className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-20">
            <h2
              data-anim
              className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl"
            >
              {about.heading}
            </h2>

            <div className="space-y-5">
              {about.body.map((paragraph) => (
                <p
                  key={paragraph}
                  data-anim
                  className="text-[15px] leading-7 text-white/50"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 bg-panel">
        <Container className="grid gap-16 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
          <article data-anim-group>
            <p
              data-anim
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400"
            >
              {mission.eyebrow}
            </p>
            <div className="mt-6 space-y-5">
              {mission.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  data-anim
                  className="text-[15px] leading-7 text-white/55"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <article data-anim-group>
            <p
              data-anim
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400"
            >
              {vision.eyebrow}
            </p>
            <div className="mt-6 space-y-5">
              {vision.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  data-anim
                  className="text-[15px] leading-7 text-white/55"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </Container>
      </section>

      <section className="bg-void">
        <Container className="py-24 lg:py-32">
          <p
            data-anim
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400"
          >
            {valueProposition.eyebrow}
          </p>
          <h2
            data-anim
            className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl"
          >
            {valueProposition.quote}
          </h2>
          <p data-anim className="mt-6 max-w-xl text-[15px] leading-7 text-white/50">
            {valueProposition.body}
          </p>

          <ul
            data-anim-group
            className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {valueProposition.items.map((item) => (
              <li
                key={item.title}
                data-anim
                className="flex items-start gap-4 border-t border-white/10 pt-6"
              >
                <span className="text-brand-400">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <span className="text-sm font-medium tracking-[-0.02em] text-white">
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-white/10 bg-panel">
        <Container className="py-24 lg:py-32">
          <p
            data-anim
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400"
          >
            {values.eyebrow}
          </p>
          <ol
            data-anim-group
            className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {values.items.map((item) => (
              <li key={item.step} data-anim className="border-t border-white/10 pt-6">
                <span className="text-[11px] font-medium tracking-[0.16em] text-brand-400">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/45">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
