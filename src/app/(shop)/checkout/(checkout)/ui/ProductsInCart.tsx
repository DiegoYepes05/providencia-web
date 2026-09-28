"use client";

import { useEffect, useState } from "react";

import { useCartStore } from "@/store";
import { ProductImage } from "@/components";
import { currencyFormat } from "@/utils";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p className="text-sm text-white/45">Cargando…</p>;
  }

  return (
    <div className="divide-y divide-white/10">
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.color}`}
          className="flex gap-4 py-5 first:pt-0 last:pb-0"
        >
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            style={{
              width: "96px",
              height: "96px",
            }}
            alt={product.title}
            className="rounded-2xl object-cover"
          />

          <div className="min-w-0 flex-1">
            <p className="font-semibold tracking-[-0.02em] text-white">
              {product.color} — {product.title}
            </p>
            <p className="mt-1 text-sm text-white/45">
              {product.quantity} {product.quantity === 1 ? "unidad" : "unidades"}
            </p>
            <p className="mt-2 text-sm font-semibold tabular-nums text-white/60">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
