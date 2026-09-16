import { Eyebrow } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { capabilities } from "@/content/landing";

export function Capabilities() {
  return (
    <section className="bg-white">
      <Container className="py-20 lg:py-28">
        <div className="max-w-2xl">
          <Eyebrow>{capabilities.eyebrow}</Eyebrow>
          <h2
            data-anim
            className="mt-5 text-[2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.5rem]"
          >
            {capabilities.heading}
          </h2>
          <p data-anim className="mt-5 text-[15px] leading-7 text-muted">
            {capabilities.body}
          </p>
        </div>

        <ul
          data-anim-group
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.items.map((item) => (
            <li
              key={item.title}
              data-anim
              className="rounded-2xl border border-line bg-white p-7 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(6,60,50,0.28)]"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name={item.icon} />
              </span>
              <h3 className="mt-5 text-base font-bold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
