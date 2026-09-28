import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { technology } from "@/content/landing";

export function Capabilities() {
  return (
    <section id="tecnologia" className="scroll-mt-20 bg-panel">
      <Container className="py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-20">
          <div>
            <p
              data-anim
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400"
            >
              {technology.eyebrow}
            </p>
            <h2
              data-anim
              className="mt-5 max-w-md text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl"
            >
              {technology.heading}
            </h2>
          </div>

          <dl
            data-anim-group
            className="grid gap-10 sm:grid-cols-3 sm:gap-0"
          >
            {technology.items.map((item, index) => (
              <div
                key={item.label}
                data-anim
                className={
                  index === 0
                    ? "sm:pr-8"
                    : "sm:border-l sm:border-white/10 sm:px-8 last:sm:pr-0"
                }
              >
                <span className="text-brand-400">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <dd className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  {item.value}
                  <span className="ml-1 text-base font-medium text-white/40">
                    {item.unit}
                  </span>
                </dd>
                <dt className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/40">
                  {item.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
