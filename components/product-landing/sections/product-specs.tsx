import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import type { Producto } from "@/content/productos";

export function ProductSpecs({ producto }: { producto: Producto }) {
  return (
    <section className="border-t border-white/10 bg-[#0b0e14] text-white">
      <Container className="py-16 lg:py-20">
        <p
          data-anim
          className="text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: "var(--accent)" }}
        >
          Ficha técnica
        </p>
        <h2
          data-anim
          className="mt-5 max-w-xl text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[2.25rem]"
        >
          Los números que importan cuando te mueves a diario
        </h2>

        <dl
          data-anim-group
          className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {producto.specs.map((spec) => (
            <div
              key={spec.id}
              data-anim
              className="group border-t border-white/12 pt-6 transition-colors hover:border-[var(--accent)]"
            >
              <span
                className="inline-grid size-10 place-items-center rounded-xl bg-white/[0.06] transition-colors group-hover:bg-[var(--accent-soft)]"
                style={{ color: "var(--accent)" }}
              >
                <Icon name={spec.icono} />
              </span>

              <dd className="mt-5 flex items-baseline gap-1.5">
                <span
                  data-count-to={spec.valor}
                  data-count-decimals={spec.decimales}
                  className="text-[2.75rem] font-extrabold leading-none tracking-[-0.045em] tabular-nums"
                >
                  {spec.valor.toLocaleString("es-CO", {
                    minimumFractionDigits: spec.decimales,
                    maximumFractionDigits: spec.decimales,
                  })}
                </span>
                <span className="text-lg font-bold text-white/50">
                  {spec.unidad}
                </span>
              </dd>

              <dt className="mt-2 text-sm text-white/50">{spec.etiqueta}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
