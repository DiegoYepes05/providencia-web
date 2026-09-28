import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import type { Producto } from "@/content/productos";

export function ProductFeatures({ producto }: { producto: Producto }) {
  return (
    <section className="bg-void">
      <Container className="py-24 lg:py-32">
        <div className="max-w-2xl">
          <p
            data-anim
            className="text-[11px] font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            Equipamiento
          </p>
          <h2
            data-anim
            className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl"
          >
            Detalles que se notan en el uso diario
          </h2>
        </div>

        <ul
          data-anim-group
          className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {producto.features.map((feature) => (
            <li key={feature.id} data-anim className="border-t border-white/10 pt-6">
              <span style={{ color: "var(--accent)" }}>
                <Icon name={feature.icono} />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-white">
                {feature.titulo}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-white/45">
                {feature.descripcion}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
