"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoCartOutline, IoMenuOutline } from "react-icons/io5";

import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { useCartStore, useUIStore } from "@/store";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-void/90 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6 lg:h-20">
          <Logo href="/shop" />

          <div className="flex items-center gap-1">
            <Link
              href="/preventa"
              className="hidden px-3 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-brand-400 transition-colors hover:text-white sm:inline"
            >
              Preventa
            </Link>
            <Link
              href="/"
              className="hidden px-3 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-white sm:inline"
            >
              Sitio
            </Link>

            <Link
              href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}
              className="relative grid size-10 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
              aria-label="Carrito"
            >
              {loaded && totalItemsInCart > 0 && (
                <span className="fade-in absolute top-1 right-1 grid min-w-4 place-items-center rounded-full bg-brand-400 px-1 text-[10px] font-bold leading-4 text-void">
                  {totalItemsInCart}
                </span>
              )}
              <IoCartOutline className="size-5" />
            </Link>

            <button
              type="button"
              onClick={openSideMenu}
              aria-label="Abrir menú"
              className="grid size-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <IoMenuOutline className="size-5" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};
