export const revalidate = 3600;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import { CatalogHeader } from "@/components/shop/catalog-header";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function ShopPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = pageParam ? parseInt(pageParam) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    take: 24,
  });

  return (
    <>
      <CatalogHeader
        title="Catálogo"
        subtitle="Tienda Veltor"
        activeHref="/shop"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
