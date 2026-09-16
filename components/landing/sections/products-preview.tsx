import Image from "next/image";
import { Eyebrow } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { formatPrecio, productos } from "@/content/productos";

/**
 * Vitrina de producto de la landing corporativa. Recorre el catálogo, así que
 * al agregar modelos en Strapi aparecen aquí sin tocar el componente.
 */
export function ProductsPreview() {
  return (
    <section id="productos" className="bg-surface">
      <Container className="py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow>Productos</Eyebrow>
            <h2
              data-anim
              className="mt-5 text-[2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.5rem]"
            >
              Nuestra línea de movilidad eléctrica
            </h2>
          </div>
          <ButtonLink data-anim href="/productos" variant="secondary">
            Ver todo el catálogo
          </ButtonLink>
        </div>

        <ul className="mt-14 space-y-8">
          {productos.map((producto) => {
            const portada = producto.colores[0].imagen;

            return (
              <li
                key={producto.id}
                data-anim-group
                className="overflow-hidden rounded-3xl border border-line bg-white"
              >
                <div className="grid lg:grid-cols-2">
                  <div data-anim="fade" className="relative aspect-4/3 lg:aspect-auto">
                    <Image
                      src={portada.url}
                      alt={portada.alternativeText}
                      width={portada.width}
                      height={portada.height}
                      sizes="(min-width: 1024px) 40rem, 100vw"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-8 lg:p-12">
                    <div data-anim className="flex flex-wrap items-center gap-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                        {producto.categoria}
                      </span>
                      {producto.reserva?.disponible && (
                        <span className="inline-flex rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                          {producto.reserva.etiqueta}
                        </span>
                      )}
                    </div>

                    <h3
                      data-anim
                      className="mt-4 text-[1.75rem] font-extrabold tracking-[-0.03em] text-ink sm:text-[2rem]"
                    >
                      {producto.nombre}
                    </h3>

                    <p
                      data-anim
                      className="mt-2 text-base font-semibold text-ink/70"
                    >
                      {producto.tagline}
                    </p>

                    <dl
                      data-anim
                      className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-7 sm:grid-cols-4"
                    >
                      {producto.specs.slice(0, 4).map((spec) => (
                        <div key={spec.id}>
                          <span className="text-brand-600">
                            <Icon name={spec.icono} className="size-4" />
                          </span>
                          <dd className="mt-2 text-xl font-extrabold leading-none tracking-[-0.03em] text-ink tabular-nums">
                            {spec.valor}
                            <span className="ml-1 text-[11px] font-bold text-muted">
                              {spec.unidad}
                            </span>
                          </dd>
                          <dt className="mt-1 text-[11px] leading-tight text-muted">
                            {spec.etiqueta}
                          </dt>
                        </div>
                      ))}
                    </dl>

                    <div data-anim className="mt-7 flex items-center gap-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-muted">
                        Colores
                      </p>
                      <ul className="flex gap-2">
                        {producto.colores.map((color) => (
                          <li
                            key={color.slug}
                            title={color.nombre}
                            className="size-5 rounded-full ring-1 ring-black/10"
                            style={
                              color.hexSecundario
                                ? {
                                    backgroundImage: `linear-gradient(135deg, ${color.hex} 0 50%, ${color.hexSecundario} 50% 100%)`,
                                  }
                                : { backgroundColor: color.hex }
                            }
                          />
                        ))}
                      </ul>
                    </div>

                    <div
                      data-anim
                      className="mt-9 flex flex-wrap items-center gap-4"
                    >
                      <ButtonLink href={`/productos/${producto.slug}`}>
                        Ver el {producto.nombre}
                      </ButtonLink>
                      {producto.reserva?.disponible && (
                        <ButtonLink
                          href={`/productos/${producto.slug}#reservar`}
                          variant="secondary"
                        >
                          Reservar
                        </ButtonLink>
                      )}
                      {producto.precio && (
                        <p className="text-sm text-muted">
                          {producto.precio.desde && "Desde "}
                          <span className="font-bold text-ink">
                            {formatPrecio(producto.precio.valor)}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
