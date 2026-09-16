import { notFound } from "next/navigation";
import { ProductLanding } from "@/components/product-landing/product-landing";
import { getProductoBySlug, productos } from "@/content/productos";

export function generateStaticParams() {
  return productos.map((producto) => ({ slug: producto.slug }));
}

export async function generateMetadata(props: PageProps<"/productos/[slug]">) {
  const { slug } = await props.params;
  const producto = getProductoBySlug(slug);

  if (!producto) return {};

  return {
    title: `${producto.nombre} — ${producto.tagline}`,
    description: producto.descripcion,
    openGraph: {
      title: `${producto.nombre} — ${producto.tagline}`,
      description: producto.descripcion,
      images: [{ url: producto.galeria[0].url }],
    },
  };
}

export default async function ProductoPage(
  props: PageProps<"/productos/[slug]">,
) {
  const { slug } = await props.params;
  const producto = getProductoBySlug(slug);

  if (!producto) notFound();

  return <ProductLanding producto={producto} />;
}
