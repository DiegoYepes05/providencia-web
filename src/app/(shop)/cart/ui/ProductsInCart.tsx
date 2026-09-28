"use client";
import { useEffect, useState } from "react";

import { useCartStore } from "@/store";
import { ProductImage, QuantitySelector } from "@/components";
import { currencyFormat } from "@/utils";
import Link from "next/link";

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity,
  );
  const removeProduct = useCartStore((state) => state.removeProduct);

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
            <Link
              className="font-semibold tracking-[-0.02em] text-white hover:text-brand-400"
              href={`/product/${product.slug} `}
            >
              {product.color} — {product.title}
            </Link>

            <p className="mt-1 text-sm font-semibold tabular-nums text-white/60">
              {currencyFormat(product.price)}
            </p>

            <div className="mt-3">
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChanged={(quantity) =>
                  updateProductQuantity(product, quantity)
                }
              />
            </div>

            <button
              onClick={() => removeProduct(product)}
              className="mt-3 text-xs font-semibold text-white/40 hover:text-white"
            >
              Quitar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
