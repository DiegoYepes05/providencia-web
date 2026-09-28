"use client";

import { useState } from "react";

import { QuantitySelector } from "@/components";
import type { CartProduct, Product } from "@/interfaces";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductTocart);
  const [quantity, setQuantity] = useState(1);
  const soldOut = product.inStock <= 0;

  const addToCart = () => {
    if (soldOut) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      color: product.color,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setQuantity(1);
  };

  const changeQuantity = (value: number) => {
    setQuantity(Math.min(Math.max(1, value), Math.max(1, product.inStock)));
  };

  return (
    <>
      <div className="mt-6 flex items-center gap-3">
        <span
          className="size-4 rounded-full border border-white/20"
          style={{ backgroundColor: product.colorHex }}
        />
        <p className="text-sm text-white/70">
          Color: <span className="font-medium text-white">{product.color}</span>
        </p>
      </div>

      {!soldOut && product.inStock > 1 && (
        <div className="mt-6">
          <QuantitySelector
            quantity={quantity}
            max={product.inStock}
            onQuantityChanged={changeQuantity}
          />
        </div>
      )}

      <button
        onClick={addToCart}
        disabled={soldOut}
        className={`my-5 w-full ${soldOut ? "btn-disabled" : "btn-primary"}`}
      >
        {soldOut ? "Agotado" : "Agregar al carrito"}
      </button>

      <p className="text-sm tabular-nums text-white/50">
        {soldOut
          ? "Sin unidades disponibles"
          : `${product.inStock} en stock · ${currencyFormat(product.price)}`}
      </p>
    </>
  );
};
