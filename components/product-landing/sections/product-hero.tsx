"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  formatPrecio,
  whatsappHref,
  type Producto,
} from "@/content/productos";
import { useVariant } from "@/components/product-landing/variant-context";
import { cn } from "@/lib/utils";

export function ProductHero({ producto }: { producto: Producto }) {
  const { colores, seleccionado, seleccionar } = useVariant();

  return (
    <section className="relative overflow-hidden bg-[#0b0e14] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[46rem] rounded-full opacity-25 blur-[120px]"
        style={{ backgroundColor: "var(--accent)" }}
      />

      <Container className="relative py-10 lg:py-14">
        <nav aria-label="Ruta de navegación" className="text-xs text-white/45">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/productos"
                className="transition-colors hover:text-white"
              >
                Productos
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white/80">{producto.nombre}</li>
          </ol>
        </nav>

        <div
          data-anim-group="load"
          className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14"
        >
          <div>
            <span
              data-anim
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--accent)" }}
            >
              {producto.categoria}
            </span>

            <h1
              data-anim
              className="mt-6 text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-[3.5rem]"
            >
              {producto.nombre}
            </h1>

            <p
              data-anim
              className="mt-4 text-xl font-semibold leading-snug tracking-[-0.02em] text-white/85"
            >
              {producto.tagline}
            </p>

            <p data-anim className="mt-5 max-w-lg text-[15px] leading-7 text-white/55">
              {producto.descripcion}
            </p>

            {producto.precio && (
              <p data-anim className="mt-7 flex items-baseline gap-2">
                {producto.precio.desde && (
                  <span className="text-xs uppercase tracking-[0.14em] text-white/45">
                    Desde
                  </span>
                )}
                <span className="text-3xl font-extrabold tracking-tight">
                  {formatPrecio(producto.precio.valor)}
                </span>
              </p>
            )}

            <div data-anim className="mt-8 flex flex-wrap gap-3">
              <a
                href={producto.cta.principal.href}
                className="inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: "var(--accent)" }}
              >
                {producto.cta.principal.etiqueta}
              </a>
              <a
                href={whatsappHref(producto.cta.whatsapp)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {producto.cta.whatsapp.etiqueta}
              </a>
            </div>

            {producto.reserva?.disponible && (
              <p data-anim className="mt-5 text-sm text-white/50">
                {producto.reserva.etiqueta} · abono de{" "}
                {formatPrecio(producto.reserva.deposito)} y la separamos{" "}
                {producto.reserva.vigenciaDias} días
              </p>
            )}
          </div>

          <div>
            <div
              data-anim="scale-in"
              className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03]"
            >
              <div className="relative">
                <Image
                  key={seleccionado.imagen.url}
                  src={seleccionado.imagen.url}
                  alt={seleccionado.imagen.alternativeText}
                  width={seleccionado.imagen.width}
                  height={seleccionado.imagen.height}
                  priority
                  sizes="(min-width: 1024px) 40rem, 100vw"
                  className="h-auto w-full animate-[fadeIn_450ms_ease]"
                />
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent opacity-70"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset"
                style={{ boxShadow: "inset 0 0 90px -40px var(--accent)" }}
              />
            </div>

            <div data-anim className="mt-7">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                  Color
                </p>
                <p className="text-sm font-semibold">{seleccionado.nombre}</p>
              </div>

              <ul className="mt-4 flex flex-wrap gap-3" role="radiogroup" aria-label="Color disponible">
                {colores.map((color) => {
                  const activo = color.slug === seleccionado.slug;

                  return (
                    <li key={color.slug}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={activo}
                        aria-label={color.nombre}
                        onClick={() => seleccionar(color.slug)}
                        className={cn(
                          "grid size-11 place-items-center rounded-full border transition-all",
                          activo
                            ? "border-white/70 scale-105"
                            : "border-white/15 hover:border-white/40",
                        )}
                      >
                        <span
                          className="size-7 rounded-full ring-1 ring-black/20"
                          style={
                            color.hexSecundario
                              ? {
                                  backgroundImage: `linear-gradient(135deg, ${color.hex} 0 50%, ${color.hexSecundario} 50% 100%)`,
                                }
                              : { backgroundColor: color.hex }
                          }
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
