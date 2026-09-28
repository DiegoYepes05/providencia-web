import { redirect } from "next/navigation";
import Image from "next/image";

import { getOrderById } from "@/actions/order/get-order-by-id";
import { currencyFormat, productImageSrc } from "@/utils";
import { OrderStatus, PayPalButton, Title } from "@/components";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = await params;
  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/shop");
  }

  const address = order!.OrderAddress;

  return (
    <div className="mb-16">
      <Title title={`Orden #${id.split("-").at(-1)}`} subtitle="Pedido" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border-t border-white/10 pt-8">
          <OrderStatus isPaid={order?.isPaid ?? false} />

          <div className="mt-6 divide-y divide-white/10">
            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug + "-" + item.color}
                className="flex gap-4 py-5 first:pt-0 last:pb-0"
              >
                <Image
                  src={productImageSrc(item.product.ProductImage[0].url)}
                  width={100}
                  height={100}
                  style={{
                    width: "96px",
                    height: "96px",
                  }}
                  alt={item.product.title}
                  className="rounded-2xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="font-semibold tracking-[-0.02em] text-white">
                    {item.color} — {item.product.title}
                  </p>
                  <p className="mt-1 text-sm text-white/45">
                    {item.quantity} {item.quantity === 1 ? "unidad" : "unidades"}{" "}
                    · {currencyFormat(item.price)}
                  </p>
                  <p className="mt-2 text-sm font-semibold tabular-nums text-white/60">
                    {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-fit border-t border-white/10 pt-8">
          <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">
            Dirección de entrega
          </h2>
          <div className="mt-4 space-y-1 text-sm text-white/55">
            <p className="text-base font-medium text-white">
              {address!.firstName} {address!.lastName}
            </p>
            <p>{address!.address}</p>
            {address!.address2 ? <p>{address!.address2}</p> : null}
            <p>{address!.postalCode}</p>
            <p>
              {address!.city}, {address!.countryId}
            </p>
            <p>{address!.phone}</p>
          </div>

          <div className="my-8 h-px w-full bg-white/10" />

          <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">
            Resumen de orden
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-y-3 text-sm text-white/45">
            <span>Productos</span>
            <span className="text-right text-white">
              {order?.itemsInOrder === 1
                ? "1 artículo"
                : `${order?.itemsInOrder} artículos`}
            </span>

            <span>Subtotal</span>
            <span className="text-right text-white">
              {currencyFormat(order!.subTotal)}
            </span>

            <span>Impuestos (15%)</span>
            <span className="text-right text-white">
              {currencyFormat(order!.tax)}
            </span>

            <span className="mt-4 text-base font-semibold text-white">Total</span>
            <span className="mt-4 text-right text-base font-semibold text-white">
              {currencyFormat(order!.total)}
            </span>
          </div>

          <div className="mt-8 w-full">
            {order?.isPaid ? (
              <OrderStatus isPaid={order?.isPaid ?? false} />
            ) : (
              <PayPalButton amount={order!.total} orderId={order!.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
