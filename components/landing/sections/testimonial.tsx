import { Container } from "@/components/ui/container";
import { testimonial } from "@/content/landing";

export function Testimonial() {
  return (
    <section className="bg-surface">
      <Container className="py-20 lg:py-24">
        <figure data-anim-group className="mx-auto max-w-3xl text-center">
          <blockquote
            data-anim
            className="text-[1.375rem] font-semibold leading-[1.5] tracking-[-0.02em] text-ink sm:text-[1.75rem]"
          >
            “{testimonial.quote}”
          </blockquote>
          <figcaption data-anim className="mt-8 text-sm text-muted">
            <span className="font-semibold text-ink">{testimonial.author}</span>
            <span className="mx-2 text-line">|</span>
            {testimonial.role}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
