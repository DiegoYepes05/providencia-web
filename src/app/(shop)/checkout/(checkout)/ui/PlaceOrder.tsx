"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from '@/utils';

export const PlaceOrder = () => {

  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);



  const address = useAddressStore((state) => state.address);

  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const cart = useCartStore( state => state.cart );
  const clearCart = useCartStore( state => state.clearCart );

  useEffect(() => {
    setLoaded(true);
  }, []);


  const onPlaceOrder = async() => {
    setIsPlacingOrder(true);
    // await sleep(2);

    const productsToOrder = cart.map( product => ({
      productId: product.id,
      quantity: product.quantity,
      color: product.color,
    }))


    //! Server Action
    const resp = await placeOrder( productsToOrder, address);
    if ( !resp.ok ) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    //* Todo salio bien!
    clearCart();
    router.replace('/orders/' + resp.order?.id );


  }




  if (!loaded) {
    return <p className="text-sm text-white/45">Cargando…</p>;
  }

  return (
    <div className="h-fit border-t border-white/10 pt-8">
      <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">
        Dirección de entrega
      </h2>
      <div className="mt-4 space-y-1 text-sm text-white/55">
        <p className="text-base font-medium text-white">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        {address.address2 ? <p>{address.address2}</p> : null}
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      <div className="my-8 h-px w-full bg-white/10" />

      <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">
        Resumen de orden
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-y-3 text-sm text-white/45">
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

      <div className="mt-8 w-full">
        <p className="mb-5 text-xs leading-5 text-white/40">
          Al colocar la orden aceptas nuestros términos y condiciones y la
          política de privacidad.
        </p>

        {errorMessage ? (
          <p className="mb-4 text-sm text-red-400">{errorMessage}</p>
        ) : null}

        <button
          onClick={onPlaceOrder}
          className={clsx("flex w-full justify-center", {
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
