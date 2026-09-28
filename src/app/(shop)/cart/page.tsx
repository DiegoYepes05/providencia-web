import Link from "next/link";

import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

export default function CartPage() {
  return (
    <div className="mb-16">
      <Title title="Carrito" subtitle="Tu pedido" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border-t border-white/10 pt-8">
          <p className="text-sm font-medium text-white">¿Quieres algo más?</p>
          <Link
            href="/shop"
            className="mt-1 inline-block text-sm text-brand-400 hover:text-brand-300"
          >
            Seguir comprando
          </Link>

          <div className="mt-6">
            <ProductsInCart />
          </div>
        </div>

        <div className="h-fit border-t border-white/10 pt-8">
          <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">
            Resumen de orden
          </h2>

          <div className="mt-6">
            <OrderSummary />
          </div>

          <Link
            className="btn-primary mt-8 flex w-full justify-center"
            href="/checkout/address"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
