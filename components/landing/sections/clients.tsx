import { Container } from "@/components/ui/container";
import { clients } from "@/content/landing";

export function Clients() {
  return (
    <section className="border-y border-line bg-white">
      <Container className="py-10">
        <p
          data-anim
          className="text-center text-xs font-medium uppercase tracking-[0.16em] text-muted"
        >
          {clients.label}
        </p>
        <ul
          data-anim-group
          className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-5"
        >
          {clients.names.map((name) => (
            <li
              key={name}
              data-anim="fade"
              className="text-base font-bold tracking-tight text-ink/35"
            >
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
