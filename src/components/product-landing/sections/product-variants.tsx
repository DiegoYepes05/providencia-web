import { Container } from "@/components/ui/container";
import { formatPrecio, type Producto } from "@/content/productos";
import { cn } from "@/lib/utils";

export function ProductVariants({ producto }: { producto: Producto }) {
  if (producto.variantes.length < 2) return null;

  return (
    <section className="bg-void">
      <Container className="py-24 lg:py-32">
        <div className="max-w-2xl">
          <p
            data-anim
            className="text-[11px] font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            Comparar versiones
          </p>
          <h2
            data-anim
            className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl"
          >
            Elige la que se ajuste a tu recorrido
          </h2>
        </div>

        <ul data-anim-group className="mt-16 grid gap-10 lg:grid-cols-3">
          {producto.variantes.map((variante) => (
            <li
              key={variante.id}
              data-anim
              className={cn(
                "border-t pt-6",
                variante.destacada ? "border-[var(--accent)]" : "border-white/10",
              )}
            >
              {variante.destacada && (
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.16em]"
                  style={{ color: "var(--accent)" }}
                >
                  Más vendida
                </p>
              )}

              <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white">
                {producto.nombre.split(" ")[0]} {variante.nombre}
              </h3>

              <p className="mt-4 text-2xl font-semibold tracking-tight text-white">
                {formatPrecio(variante.precio)}
              </p>

              <dl className="mt-7 space-y-3 text-sm">
                <Row etiqueta="Autonomía" valor={`${variante.autonomiaKm} km`} />
                <Row
                  etiqueta="Velocidad máxima"
                  valor={`${variante.velocidadKmh} km/h`}
                />
                <Row etiqueta="Motor" valor={`${variante.potenciaW} W`} />
              </dl>

              {producto.reserva?.disponible && (
                <a
                  href="#reservar"
                  className={cn(
                    "mt-8 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    variante.destacada
                      ? "text-void"
                      : "border border-white/20 text-white hover:bg-white/8",
                  )}
                  style={
                    variante.destacada
                      ? { backgroundColor: "var(--accent)" }
                      : undefined
                  }
                >
                  Reservar {variante.nombre}
                </a>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Row({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-white/40">{etiqueta}</dt>
      <dd className="font-semibold text-white tabular-nums">{valor}</dd>
    </div>
  );
}
