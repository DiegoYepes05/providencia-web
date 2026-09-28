"use client";

import { getStockBySlug } from "@/actions";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      const inStock = await getStockBySlug(slug);
      setStock(inStock);
      setIsLoading(false);
    };

    getStock();
  }, [slug]);

  if (isLoading) {
    return (
      <span className="mb-3 inline-block h-6 w-28 animate-pulse rounded-full bg-white/10" />
    );
  }

  return (
    <span
      className={`mb-3 inline-flex text-[11px] font-medium uppercase tracking-[0.16em] ${
        stock > 0 ? "text-brand-400" : "text-red-400"
      }`}
    >
      {stock > 0 ? `${stock} en stock` : "Sin stock"}
    </span>
  );
};
