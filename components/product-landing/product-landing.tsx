import { VariantProvider } from "@/components/product-landing/variant-context";
import { ProductHero } from "@/components/product-landing/sections/product-hero";
import { ProductSpecs } from "@/components/product-landing/sections/product-specs";
import { ProductGallery } from "@/components/product-landing/sections/product-gallery";
import { ProductFeatures } from "@/components/product-landing/sections/product-features";
import { ProductUseCases } from "@/components/product-landing/sections/product-use-cases";
import { ProductVariants } from "@/components/product-landing/sections/product-variants";
import { ProductReserve } from "@/components/product-landing/sections/product-reserve";
import type { Producto } from "@/content/productos";

/**
 * Plantilla de landing de producto. No tiene nada del Veltor X1 escrito dentro:
 * todo sale del objeto `producto`, así que sirve igual para cualquier otro
 * modelo del catálogo. El footer y el header los aporta el layout de la ruta.
 */
export function ProductLanding({ producto }: { producto: Producto }) {
  return (
    <VariantProvider colores={producto.colores}>
      <ProductHero producto={producto} />
      <ProductSpecs producto={producto} />
      <ProductGallery producto={producto} />
      <ProductFeatures producto={producto} />
      <ProductUseCases producto={producto} />
      <ProductVariants producto={producto} />
      <ProductReserve producto={producto} />
    </VariantProvider>
  );
}
