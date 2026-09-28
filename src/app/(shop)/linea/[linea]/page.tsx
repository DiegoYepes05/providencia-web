export const revalidate = 3600;

import { getCategories, getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import { CatalogHeader } from "@/components/shop/catalog-header";
import { categorySlug } from "@/lib/category-slug";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    linea: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function LineaPage({ params, searchParams }: Props) {
  const { linea } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => categorySlug(item.name) === linea);

  if (!category) notFound();

  const { page: pageParam } = await searchParams;
  const page = pageParam ? parseInt(pageParam) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    linea: category.name,
  });

  return (
    <>
      <CatalogHeader
        title={category.name}
        subtitle="Línea"
        activeHref={`/linea/${linea}`}
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
