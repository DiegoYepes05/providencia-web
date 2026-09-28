import { Container } from "@/components/ui/container";
import { clients } from "@/content/landing";

export function Clients() {
  return (
    <section className="border-y border-white/10 bg-void">
      <Container className="py-10">
        <p
          data-anim
          className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/40"
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
              className="text-sm font-medium tracking-[0.12em] text-white/35"
            >
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
