import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { Producto } from "@/content/productos";

export function ProductUseCases({ producto }: { producto: Producto }) {
  return (
    <section className="bg-panel">
      <Container className="py-24 lg:py-32">
        <div className="max-w-2xl">
          <p
            data-anim
            className="text-[11px] font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            Ideal para
          </p>
          <h2
            data-anim
            className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl"
          >
            Cuatro formas de sacarle provecho
          </h2>
        </div>

        <ul
          data-anim-group
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {producto.casosDeUso.map((caso) => (
            <li key={caso.id} data-anim className="group">
              <div className="relative aspect-4/3 overflow-hidden bg-void">
                <Image
                  src={caso.imagen.url}
                  alt={caso.imagen.alternativeText}
                  width={caso.imagen.width}
                  height={caso.imagen.height}
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pt-5">
                <h3 className="text-base font-semibold tracking-[-0.02em] text-white">
                  {caso.titulo}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/45">
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
