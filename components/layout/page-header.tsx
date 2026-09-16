import { Eyebrow } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="glow-mint border-b border-line">
      <Container data-anim-group="load" className="py-16 lg:py-20">
        <span data-anim className="inline-block">
          <Eyebrow>{eyebrow}</Eyebrow>
        </span>
        <h1
          data-anim
          className="mt-5 max-w-3xl text-[2.25rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[3rem]"
        >
          {title}
        </h1>
        <p data-anim className="mt-6 max-w-xl text-[15px] leading-7 text-muted">
          {description}
        </p>
      </Container>
    </section>
  );
}
