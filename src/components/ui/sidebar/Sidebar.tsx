"use client";

import Link from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { Icon, type IconName } from "@/components/ui/icons";
import { useUIStore } from "@/store";

const itemClass =
  "flex items-center rounded-2xl p-3 text-white/80 transition-colors hover:bg-white/8 hover:text-white";

function ItemIcon({ name }: { name: IconName }) {
  return <Icon name={name} className="size-5 shrink-0 text-brand-400" />;
}

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return (
    <div>
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed inset-0 z-10 bg-black/60 backdrop-blur-sm"
        />
      )}

      <nav
        className={clsx(
          "fixed top-0 right-0 z-20 h-screen w-full max-w-md overflow-y-auto border-l border-white/10 bg-void p-6 transition-transform duration-300",
          { "translate-x-full": !isSideMenuOpen },
        )}
      >
        <button
          type="button"
          aria-label="Cerrar menú"
          className="absolute top-5 right-5 grid size-10 place-items-center rounded-full border border-white/15 text-white hover:bg-white/8"
          onClick={() => closeMenu()}
        >
          <Icon name="close" className="size-4" />
        </button>

        <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400">
          Tienda
        </p>

        <div className="mt-8 space-y-1">
          <Link href="/" onClick={() => closeMenu()} className={itemClass}>
            <ItemIcon name="home" />
            <span className="ml-3 text-base font-medium">Inicio</span>
          </Link>
        </div>

        <div className="my-8 h-px bg-white/10" />

        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              onClick={() => closeMenu()}
              className={itemClass}
            >
              <ItemIcon name="user" />
              <span className="ml-3 text-base font-medium">Perfil</span>
            </Link>

            <Link
              href="/orders"
              onClick={() => closeMenu()}
              className={itemClass}
            >
              <ItemIcon name="orders" />
              <span className="ml-3 text-base font-medium">Mis órdenes</span>
            </Link>

            <SignOutButton
              className={`${itemClass} w-full`}
              onClick={() => closeMenu()}
            >
              <ItemIcon name="logout" />
              <span className="ml-3 text-base font-medium">Salir</span>
            </SignOutButton>
          </>
        )}

        {!isAuthenticated && (
          <Link
            href="/auth/login"
            className={itemClass}
            onClick={() => closeMenu()}
          >
            <ItemIcon name="login" />
            <span className="ml-3 text-base font-medium">Ingresar</span>
          </Link>
        )}

        {isAdmin && (
          <>
            <div className="my-8 h-px bg-white/10" />
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Administración
            </p>

            <Link
              href="/admin/lineas"
              onClick={() => closeMenu()}
              className={itemClass}
            >
              <ItemIcon name="layers" />
              <span className="ml-3 text-base font-medium">Líneas</span>
            </Link>

            <Link
              href="/admin/products"
              onClick={() => closeMenu()}
              className={itemClass}
            >
              <ItemIcon name="scooter" />
              <span className="ml-3 text-base font-medium">Productos</span>
            </Link>

            <Link
              href="/admin/orders"
              onClick={() => closeMenu()}
              className={itemClass}
            >
              <ItemIcon name="orders" />
              <span className="ml-3 text-base font-medium">Todas las órdenes</span>
            </Link>

            <Link
              href="/admin/users"
              onClick={() => closeMenu()}
              className={itemClass}
            >
              <ItemIcon name="people" />
              <span className="ml-3 text-base font-medium">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
