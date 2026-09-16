import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { Producto } from "@/content/productos";

export function ProductUseCases({ producto }: { producto: Producto }) {
  return (
    <section className="bg-surface">
      <Container className="py-20 lg:py-28">
        <div className="max-w-2xl">
          <p
            data-anim
            className="text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--accent)" }}
          >
            Ideal para
          </p>
          <h2
            data-anim
            className="mt-5 text-[2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.5rem]"
          >
            Cuatro formas de sacarle provecho
          </h2>
        </div>

        <ul
          data-anim-group
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {producto.casosDeUso.map((caso) => (
            <li
              key={caso.id}
              data-anim
              className="group overflow-hidden rounded-2xl border border-line bg-white"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={caso.imagen.url}
                  alt={caso.imagen.alternativeText}
                  width={caso.imagen.width}
                  height={caso.imagen.height}
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-base font-bold tracking-tight text-ink">
                  {caso.titulo}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {caso.descripcion}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
