"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ProductoColor } from "@/content/productos";

type VariantContextValue = {
  colores: ProductoColor[];
  seleccionado: ProductoColor;
  seleccionar: (slug: string) => void;
};

const VariantContext = createContext<VariantContextValue | null>(null);

/**
 * Mantiene el color elegido y lo publica como `--accent` / `--accent-soft` en
 * un wrapper. Las secciones pueden ser Server Components y aun así reaccionar
 * al cambio usando esas variables (ver utilidades `text-accent`, `bg-accent`).
 */
export function VariantProvider({
  colores,
  children,
}: {
  colores: ProductoColor[];
  children: React.ReactNode;
}) {
  const [slug, setSlug] = useState(colores[0]?.slug ?? "");

  const value = useMemo<VariantContextValue>(() => {
    const seleccionado =
      colores.find((color) => color.slug === slug) ?? colores[0];

    return { colores, seleccionado, seleccionar: setSlug };
  }, [colores, slug]);

  return (
    <VariantContext.Provider value={value}>
      <div
        className="accent-transition"
        style={
          {
            "--accent": value.seleccionado.acento,
            "--accent-soft": value.seleccionado.acentoSuave,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </VariantContext.Provider>
  );
}

export function useVariant() {
  const context = useContext(VariantContext);
  if (!context) {
    throw new Error("useVariant debe usarse dentro de <VariantProvider>");
  }
  return context;
}
