export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import { CatalogHeader } from "@/components/shop/catalog-header";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    linea: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

const copy: Record<string, { title: string }> = {
  nova: { title: "Nova" },
  confort: { title: "Confort" },
  carguero: { title: "Carguero" },
};

export default async function LineaPage({ params, searchParams }: Props) {
  const { linea } = await params;
  const info = copy[linea];
  if (!info) notFound();

  const { page: pageParam } = await searchParams;
  const page = pageParam ? parseInt(pageParam) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    linea,
  });

  return (
    <>
      <CatalogHeader
        title={info.title}
        subtitle="Línea"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
