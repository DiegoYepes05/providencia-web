import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import type { Producto } from "@/content/productos";

export function ProductFeatures({ producto }: { producto: Producto }) {
  return (
    <section className="bg-white">
      <Container className="py-20 lg:py-28">
        <div className="max-w-2xl">
          <p
            data-anim
            className="text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--accent)" }}
          >
            Equipamiento
          </p>
          <h2
            data-anim
            className="mt-5 text-[2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.5rem]"
          >
            Detalles que se notan en el uso diario
          </h2>
        </div>

        <ul
          data-anim-group
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {producto.features.map((feature) => (
            <li
              key={feature.id}
              data-anim
              className="group rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_22px_50px_-30px_rgba(6,60,50,0.35)]"
            >
              <span
                className="grid size-11 place-items-center rounded-xl transition-colors"
                style={{
                  backgroundColor: "var(--accent-soft)",
                  color: "var(--accent)",
                }}
              >
                <Icon name={feature.icono} />
              </span>
              <h3 className="mt-5 text-base font-bold tracking-tight text-ink">
                {feature.titulo}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-muted">
                {feature.descripcion}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
