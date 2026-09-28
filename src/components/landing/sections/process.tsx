import { Container } from "@/components/ui/container";
import { process } from "@/content/landing";

export function Process() {
  return (
    <section className="bg-panel">
      <Container className="py-24 lg:py-32">
        <div className="max-w-2xl">
          <p
            data-anim
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400"
          >
            {process.eyebrow}
          </p>
          <h2
            data-anim
            className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl"
          >
            {process.heading}
          </h2>
        </div>

        <ol
          data-anim-group
          className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {process.steps.map((item) => (
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
  );
}
