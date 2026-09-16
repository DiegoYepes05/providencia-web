import Image from "next/image";
import Link from "next/link";
import { formatPrecio, type Producto } from "@/content/productos";

/** Tarjeta de catálogo. Usa el primer color como imagen de portada. */
export function ProductCard({ producto }: { producto: Producto }) {
  const portada = producto.colores[0].imagen;
  const destacadas = producto.specs.slice(0, 2);

  return (
    <Link
      href={`/productos/${producto.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-[0_22px_50px_-28px_rgba(6,60,50,0.32)]"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-surface">
        {producto.reserva?.disponible && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
            {producto.reserva.etiqueta}
          </span>
        )}
        <Image
          src={portada.url}
          alt={portada.alternativeText}
          width={portada.width}
          height={portada.height}
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
          {producto.categoria}
        </span>
        <h3 className="mt-3 text-lg font-bold tracking-tight text-ink">
          {producto.nombre}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted">
          {producto.tagline}
        </p>

        <dl className="mt-5 flex gap-6 border-t border-line pt-5">
          {destacadas.map((spec) => (
            <div key={spec.id}>
              <dd className="text-lg font-extrabold tracking-tight text-ink tabular-nums">
                {spec.valor}
                <span className="ml-1 text-xs font-bold text-muted">
                  {spec.unidad}
                </span>
              </dd>
              <dt className="mt-0.5 text-[11px] text-muted">{spec.etiqueta}</dt>
            </div>
          ))}
        </dl>

        {producto.precio && (
          <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-ink">
            {producto.precio.desde && (
              <span className="font-normal text-muted">Desde</span>
            )}
            {formatPrecio(producto.precio.valor)}
            <span
              aria-hidden="true"
              className="ml-auto text-brand-600 transition-transform group-hover:translate-x-1"
            >
              {producto.reserva?.disponible ? "Reservar →" : "→"}
            </span>
          </p>
        )}
      </div>
    </Link>
  );
}
