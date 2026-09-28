"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Product } from "@/interfaces";
import { currencyFormat, productImageSrc } from "@/utils";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  const hasAlt = Boolean(product.images[1]);
  const soldOut = product.inStock <= 0;

  return (
    <article className="fade-in group">
      <Link
        href={`/product/${product.slug}`}
        className="block"
        onMouseEnter={() => {
          if (hasAlt) setDisplayImage(product.images[1]);
        }}
        onMouseLeave={() => setDisplayImage(product.images[0])}
      >
        <div className="relative aspect-4/5 overflow-hidden bg-[#eceae4]">
          <Image
            src={productImageSrc(displayImage)}
            alt={`${product.title} ${product.color}`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            width={640}
            height={800}
          />
          {soldOut && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black/25">
              <span className="absolute top-7 -left-10 w-[160%] rotate-[-28deg] bg-red-600 py-2 text-center text-sm font-bold tracking-[0.28em] text-white uppercase shadow-md">
                Agotado
              </span>
            </div>
          )}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/45 to-transparent px-5 py-4 text-[12px] font-medium tracking-[0.14em] text-white uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Ver producto →
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4 border-t border-white/10 pt-4">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-white/35 uppercase">
              <span
                className="size-2.5 rounded-full border border-white/20"
                style={{ backgroundColor: product.colorHex }}
              />
              {product.color}
            </p>
            <h3 className="mt-1.5 text-[15px] leading-snug font-medium tracking-[-0.02em] text-white transition-colors group-hover:text-brand-400">
              {product.title}
            </h3>
          </div>
          <p className="shrink-0 pt-5 text-sm text-white/50 tabular-nums">
            {currencyFormat(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
};
