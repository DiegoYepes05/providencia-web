import { Eyebrow } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { process } from "@/content/landing";

export function Process() {
  return (
    <section className="bg-white">
      <Container className="py-20 lg:py-28">
        <div className="max-w-2xl">
          <Eyebrow>{process.eyebrow}</Eyebrow>
          <h2
            data-anim
            className="mt-5 text-[2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.5rem]"
          >
            {process.heading}
          </h2>
        </div>

        <ol
          data-anim-group
          className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {process.steps.map((item) => (
            <li
              key={item.step}
              data-anim
              className="border-t-2 border-brand-200 pt-5"
            >
              <span className="text-xs font-bold tracking-[0.14em] text-brand-600">
                {item.step}
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
