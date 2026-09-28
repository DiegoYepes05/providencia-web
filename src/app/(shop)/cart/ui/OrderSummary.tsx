"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export const OrderSummary = () => {

  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);


  useEffect(() => {

    if ( itemsInCart === 0 && loaded === true )   {
      router.replace('/empty')
    }


  },[ itemsInCart, loaded, router ])



  if (!loaded) return <p className="text-sm text-white/45">Cargando…</p>;

  return (
    <div className="grid grid-cols-2 gap-y-3 text-sm text-white/45">
      <span>Productos</span>
      <span className="text-right text-white">
        {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
      </span>

      <span>Subtotal</span>
      <span className="text-right text-white">{currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right text-white">{currencyFormat(tax)}</span>

      <span className="mt-4 text-base font-semibold text-white">Total</span>
      <span className="mt-4 text-right text-base font-semibold text-white">
        {currencyFormat(total)}
      </span>
    </div>
  );
};
