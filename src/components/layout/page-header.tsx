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
    <section className="border-b border-white/10 bg-void">
      <Container data-anim-group="load" className="pt-36 pb-16 lg:pt-40 lg:pb-20">
        <p
          data-anim
          className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400"
        >
          {eyebrow}
        </p>
        <h1
          data-anim
          className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl"
        >
          {title}
        </h1>
        <p data-anim className="mt-6 max-w-xl text-[15px] leading-7 text-white/50">
          {description}
        </p>
      </Container>
    </section>
  );
}
