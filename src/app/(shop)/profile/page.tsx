import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth.config";
import { Title } from "@/components";
import { LogoutButton } from "./ui/LogoutButton";

const roleLabel: Record<string, string> = {
  admin: "Administrador",
  user: "Cliente",
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  return letters.toUpperCase() || "P";
}

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const { name, email, role } = session.user;
  const displayRole = roleLabel[role] ?? role;

  return (
    <div className="mx-auto max-w-3xl">
      <Title title="Tu perfil" subtitle="Cuenta" />

      <section className="border-t border-white/10">
        <div className="py-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid size-16 place-items-center rounded-full bg-brand-400 text-lg font-semibold tracking-wide text-void">
              {initials(name)}
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                {name}
              </h2>
              <p className="mt-1 text-sm text-white/50">{email}</p>
              <span className="mt-3 inline-flex text-[11px] font-medium uppercase tracking-[0.16em] text-brand-400">
                {displayRole}
              </span>
            </div>
          </div>
        </div>

        <dl className="grid gap-px border-t border-white/10 sm:grid-cols-2">
          <div className="py-5 sm:pr-8">
            <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
              Nombre
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-white">{name}</dd>
          </div>
          <div className="py-5 sm:pl-8">
            <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
              Correo
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-white">{email}</dd>
          </div>
          <div className="py-5 sm:pr-8">
            <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
              Tipo de cuenta
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-white">{displayRole}</dd>
          </div>
          <div className="py-5 sm:pl-8">
            <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
              Estado
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-white">Activa</dd>
          </div>
        </dl>
      </section>

      <section className="mt-10 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
        <Link href="/orders" className="group">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-brand-400">
            Pedidos
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white group-hover:text-brand-400">
            Ver órdenes
          </h3>
          <p className="mt-1 text-sm text-white/45">
            Consulta el estado y el detalle de tus compras.
          </p>
        </Link>

        <Link href="/shop" className="group">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-brand-400">
            Catálogo
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white group-hover:text-brand-400">
            Seguir comprando
          </h3>
          <p className="mt-1 text-sm text-white/45">
            Explora productos y agrégalos al carrito.
          </p>
        </Link>
      </section>

      <div className="mt-8">
        <LogoutButton />
      </div>
    </div>
  );
}
