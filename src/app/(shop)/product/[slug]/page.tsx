export const revalidate = 604800;
import { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";

import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from "@/components";
import { getProductBySlug } from "@/actions";
import { currencyFormat, productImageSrc } from "@/utils";
import { AddToCart } from "./ui/AddToCart";
import Link from "next/link";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [productImageSrc(product?.images[1] ?? product?.images[0])],
    },
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mb-20">
      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white"
      >
        <span aria-hidden="true">←</span>
        Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
        <div className="relative overflow-hidden bg-panel md:col-span-2">
          {product.inStock <= 0 && (
            <span className="absolute top-10 -left-8 z-10 w-[140%] rotate-[-28deg] bg-red-600 py-2 text-center text-sm font-bold tracking-[0.28em] text-white uppercase">
              Agotado
            </span>
          )}
          <ProductMobileSlideshow
            title={product.title}
            images={product.images}
            className="block md:hidden"
          />

          <ProductSlideshow
            title={product.title}
            images={product.images}
            className="hidden md:block"
          />
        </div>

        <div className="md:pt-4">
          <StockLabel slug={product.slug} />

          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-white">
            {product.title}
          </h1>

          <p className="mt-4 text-xl font-medium tabular-nums text-white/70">
            {currencyFormat(product.price)}
          </p>

          <AddToCart product={product} />

          {(product.motorW ||
            product.battery ||
            product.maxSpeed ||
            product.autonomy) && (
            <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              {product.motorW ? (
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                    Motor
                  </dt>
                  <dd className="mt-1 text-sm text-white">
                    {product.motorW} W
                  </dd>
                </div>
              ) : null}
              {product.battery ? (
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                    Batería
                  </dt>
                  <dd className="mt-1 text-sm text-white">{product.battery}</dd>
                </div>
              ) : null}
              {product.maxSpeed ? (
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                    Velocidad
                  </dt>
                  <dd className="mt-1 text-sm text-white">
                    {product.maxSpeed}
                  </dd>
                </div>
              ) : null}
              {product.autonomy ? (
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                    Autonomía
                  </dt>
                  <dd className="mt-1 text-sm text-white">
                    {product.autonomy}
                  </dd>
                </div>
              ) : null}
            </dl>
          )}

          <h3 className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
            Descripción
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/50">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
