export const revalidate = 0;

import { getOrdersByUser } from "@/actions";
import { Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function OrdersPage() {
  const { ok, orders = [] } = await getOrdersByUser();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mis órdenes" subtitle="Tus pedidos" />

      <div className="mb-10">
        {orders.length === 0 ? (
          <p className="rounded-3xl border border-white/10 bg-panel px-6 py-10 text-sm text-white/50">
            Todavía no tienes órdenes.
          </p>
        ) : (
          <table className="min-w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-white/40"
                >
                  #ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-white/40"
                >
                  Nombre completo
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-white/40"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.16em] text-white/40"
                >
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-white/10 transition-colors hover:bg-white/5"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                    {order.id.split("-").at(-1)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white/70">
                    {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                  </td>
                  <td className="flex items-center whitespace-nowrap px-6 py-4 text-sm text-white/70">
                    {order.isPaid ? (
                      <>
                        <IoCardOutline className="text-brand-400" />
                        <span className="mx-2 text-brand-400">Pagada</span>
                      </>
                    ) : (
                      <>
                        <IoCardOutline className="text-red-400" />
                        <span className="mx-2 text-red-400">No Pagada</span>
                      </>
                    )}
                  </td>
                  <td className="px-6 text-sm text-white/70">
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-brand-400 hover:text-brand-300"
                    >
                      Ver orden
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
