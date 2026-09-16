"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import type { Producto } from "@/content/productos";

export function ProductGallery({ producto }: { producto: Producto }) {
  const { galeria } = producto;
  const [abierto, setAbierto] = useState<number | null>(null);

  const cerrar = useCallback(() => setAbierto(null), []);
  const mover = useCallback(
    (paso: number) =>
      setAbierto((actual) =>
        actual === null
          ? actual
          : (actual + paso + galeria.length) % galeria.length,
      ),
    [galeria.length],
  );

  useEffect(() => {
    if (abierto === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") cerrar();
      if (event.key === "ArrowRight") mover(1);
      if (event.key === "ArrowLeft") mover(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [abierto, cerrar, mover]);

  const activa = abierto === null ? null : galeria[abierto];

  return (
    <section className="bg-[#0f131b] text-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p
              data-anim
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--accent)" }}
            >
              Galería
            </p>
            <h2
              data-anim
              className="mt-5 max-w-lg text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[2.25rem]"
            >
              Mírala desde todos los ángulos
            </h2>
          </div>
          <p data-anim className="text-sm text-white/45">
            Toca cualquier foto para ampliarla
          </p>
        </div>

        <ul
          data-anim-group
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {galeria.map((foto, index) => (
            <li
              key={foto.id}
              data-anim="scale-in"
              className={index === 0 ? "lg:col-span-2 lg:row-span-2" : undefined}
            >
              <button
                type="button"
                onClick={() => setAbierto(index)}
                className="group relative block h-full w-full overflow-hidden rounded-2xl border border-white/10"
              >
                <Image
                  src={foto.url}
                  alt={foto.alternativeText}
                  width={foto.width}
                  height={foto.height}
                  sizes="(min-width: 1024px) 40rem, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                />
              </button>
            </li>
          ))}
        </ul>
      </Container>

      {activa && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activa.alternativeText}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={cerrar}
        >
          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar galería"
            className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <Image
            src={activa.url}
            alt={activa.alternativeText}
            width={activa.width}
            height={activa.height}
            sizes="90vw"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] w-auto rounded-2xl object-contain"
          />

          <p className="absolute bottom-6 left-0 right-0 text-center text-sm text-white/60">
            {abierto! + 1} / {galeria.length}
          </p>
        </div>
      )}
    </section>
  );
}
