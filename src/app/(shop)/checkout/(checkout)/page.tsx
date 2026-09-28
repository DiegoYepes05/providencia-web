import Link from "next/link";

import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage() {
  return (
    <div className="mb-16">
      <Title title="Verificar orden" subtitle="Checkout" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border-t border-white/10 pt-8">
          <p className="text-sm font-medium text-white">Ajustar elementos</p>
          <Link
            href="/cart"
            className="mt-1 inline-block text-sm text-brand-400 hover:text-brand-300"
          >
            Editar carrito
          </Link>

          <div className="mt-6">
            <ProductsInCart />
          </div>
        </div>

        <PlaceOrder />
      </div>
    </div>
  );
}
