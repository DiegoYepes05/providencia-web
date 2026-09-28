"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { shopNav, shopCta } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function ShopHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo href="/shop" className="[&_img]:h-10 md:[&_img]:h-11" />
            <span className="hidden rounded-full bg-brand-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white sm:inline">
              Tienda
            </span>
          </div>

          <nav className="hidden items-center gap-7 md:flex">
            {shopNav.map((item) => {
              const active =
                item.href === "/shop"
                  ? pathname === "/shop" || pathname.startsWith("/shop/")
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[13px] transition-colors hover:text-ink",
                    active ? "font-semibold text-ink" : "text-muted",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/"
              className="text-[13px] text-muted transition-colors hover:text-ink"
            >
              Sitio corporativo
            </Link>
            <ButtonLink href={shopCta.href} variant="brand" size="sm">
              {shopCta.label}
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Abrir menú de la tienda"
            className="grid size-9 place-items-center rounded-full border border-line text-ink md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              className="size-4"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div className="border-t border-line bg-white md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {shopNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface"
            >
              Sitio corporativo
            </Link>
            <ButtonLink
              href={shopCta.href}
              variant="brand"
              className="mt-2 w-full"
              onClick={() => setMenuOpen(false)}
            >
              {shopCta.label}
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
