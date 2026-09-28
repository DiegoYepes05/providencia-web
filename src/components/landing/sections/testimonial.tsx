import { Container } from "@/components/ui/container";
import { testimonial } from "@/content/landing";

export function Testimonial() {
  return (
    <section className="bg-void">
      <Container className="py-24 lg:py-32">
        <div data-anim-group className="grid gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
          <p
            data-anim
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400"
          >
            Lo que dicen
          </p>
          <figure>
            <blockquote
              data-anim
              className="max-w-4xl text-3xl font-semibold leading-[1.15] tracking-[-0.035em] text-white sm:text-5xl"
            >
              “{testimonial.quote}”
            </blockquote>
            <figcaption data-anim className="mt-10 text-sm text-white/45">
              <span className="text-white/70">{testimonial.author}</span>
              <span className="mx-2">·</span>
              {testimonial.role}
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
