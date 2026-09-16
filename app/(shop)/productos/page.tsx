import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/shop/product-card";
import { productos } from "@/content/productos";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Catálogo de motos y scooters eléctricos Providencia para movilidad urbana, reparto y uso diario.",
};

export default function ProductosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Movilidad eléctrica lista para la calle"
        description="Cada modelo llega con batería removible, garantía y respaldo de repuestos en el país. Elige el que se ajuste a tu recorrido diario."
      />

      <section className="bg-surface">
        <Container className="py-16 lg:py-20">
          <ul
            data-anim-group
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {productos.map((producto) => (
              <li key={producto.id} data-anim>
                <ProductCard producto={producto} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
