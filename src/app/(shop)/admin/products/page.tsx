export const revalidate = 0;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";
import { currencyFormat } from "@/utils";
import { ProductActiveToggle } from "./ui/ProductActiveToggle";

import Link from "next/link";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = pageParam ? parseInt(pageParam) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    includeInactive: true,
  });

  return (
    <>
      <Title title="Productos" subtitle="Administración" />

      <div className="mb-5 flex justify-end">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10 overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-white/10">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase"
              >
                Título
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase"
              >
                Precio
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase"
              >
                Color
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase"
              >
                Línea
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-right text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className={`border-b border-white/10 transition-colors hover:bg-white/5 ${
                  product.isActive ? "" : "opacity-55"
                }`}
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                  <Link href={`/admin/product/${product.slug}`}>
                    <ProductImage
                      src={product.ProductImage[0]?.url}
                      width={80}
                      height={80}
                      alt={product.title}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />
                  </Link>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                  {product.title}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white tabular-nums">
                  {currencyFormat(product.price)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-white/70">
                  {product.color}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                  {product.inStock}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-white/70">
                  {product.category.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <ProductActiveToggle
                    id={product.id}
                    isActive={product.isActive}
                  />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="inline-flex h-9 items-center rounded-full bg-brand-400 px-4 text-[13px] font-semibold text-void transition-colors hover:bg-brand-300"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
