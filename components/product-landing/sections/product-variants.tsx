import { Container } from "@/components/ui/container";
import { formatPrecio, type Producto } from "@/content/productos";
import { cn } from "@/lib/utils";

export function ProductVariants({ producto }: { producto: Producto }) {
  if (producto.variantes.length < 2) return null;

  return (
    <section className="bg-white">
      <Container className="py-20 lg:py-28">
        <div className="max-w-2xl">
          <p
            data-anim
            className="text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--accent)" }}
          >
            Comparar versiones
          </p>
          <h2
            data-anim
            className="mt-5 text-[2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.5rem]"
          >
            Elige la que se ajuste a tu recorrido
          </h2>
        </div>

        <ul data-anim-group className="mt-14 grid gap-6 lg:grid-cols-3">
          {producto.variantes.map((variante) => (
            <li
              key={variante.id}
              data-anim
              className={cn(
                "relative rounded-2xl border bg-white p-8",
                variante.destacada
                  ? "border-[var(--accent)] shadow-[0_24px_60px_-34px_rgba(6,60,50,0.4)]"
                  : "border-line",
              )}
            >
              {variante.destacada && (
                <span
                  className="absolute -top-3 left-8 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  Más vendida
                </span>
              )}

              <h3 className="text-lg font-bold tracking-tight text-ink">
                {producto.nombre.split(" ")[0]} {variante.nombre}
              </h3>

              <p className="mt-4 text-2xl font-extrabold tracking-tight text-ink">
                {formatPrecio(variante.precio)}
              </p>

              <dl className="mt-7 space-y-3 border-t border-line pt-6 text-sm">
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
                    "mt-7 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition-transform hover:scale-[1.02]",
                    variante.destacada
                      ? "text-white"
                      : "border border-line text-ink hover:border-accent",
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
      <dt className="text-muted">{etiqueta}</dt>
      <dd className="font-semibold text-ink tabular-nums">{valor}</dd>
    </div>
  );
}
