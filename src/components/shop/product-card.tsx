import Image from "next/image";
import Link from "next/link";
import { formatPrecio, type Producto } from "@/content/productos";

/** Tarjeta de catálogo. Usa el primer color como imagen de portada. */
export function ProductCard({ producto }: { producto: Producto }) {
  const portada = producto.colores[0].imagen;
  const destacadas = producto.specs.slice(0, 2);

  return (
    <Link href={`/modelos/${producto.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-4/3 overflow-hidden bg-panel">
        {producto.reserva?.disponible && (
          <span className="absolute left-4 top-4 z-10 text-[11px] font-medium uppercase tracking-[0.16em] text-brand-400">
            {producto.reserva.etiqueta}
          </span>
        )}
        <Image
          src={portada.url}
          alt={portada.alternativeText}
          width={portada.width}
          height={portada.height}
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-brand-400">
          {producto.categoria}
        </span>
        <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-white">
          {producto.nombre}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-white/45">
          {producto.tagline}
        </p>

        <dl className="mt-5 flex gap-6 border-t border-white/10 pt-5">
          {destacadas.map((spec) => (
            <div key={spec.id}>
              <dd className="text-lg font-semibold tracking-tight text-white tabular-nums">
                {spec.valor}
                <span className="ml-1 text-xs font-medium text-white/40">
                  {spec.unidad}
                </span>
              </dd>
              <dt className="mt-0.5 text-[11px] text-white/40">{spec.etiqueta}</dt>
            </div>
          ))}
        </dl>

        {producto.precio && (
          <p className="mt-5 flex items-center gap-2 text-sm font-medium text-white">
            {producto.precio.desde && (
              <span className="font-normal text-white/45">Desde</span>
            )}
            {formatPrecio(producto.precio.valor)}
            <span
              aria-hidden="true"
              className="ml-auto text-brand-400 transition-transform group-hover:translate-x-1"
            >
              {producto.reserva?.disponible ? "Reservar →" : "→"}
            </span>
          </p>
        )}
      </div>
    </Link>
  );
}
