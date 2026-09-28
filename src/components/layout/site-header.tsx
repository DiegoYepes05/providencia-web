"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { mainNav } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const shopHref = "/shop";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors",
        scrolled || menuOpen ? "bg-void/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6 lg:h-20">
          <Logo priority />

          <nav className="hidden items-center gap-9 md:flex">
            {mainNav
              .filter((item) => item.href !== shopHref)
              .map((item) => {
                const active = item.href.startsWith("/#")
                  ? false
                  : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-[12px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-white",
                      active ? "text-white" : "text-white/50",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
          </nav>

          <ButtonLink
            href={shopHref}
            size="sm"
            className="hidden uppercase tracking-[0.14em] md:inline-flex"
          >
            Tienda
          </ButtonLink>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Abrir menú"
            className="grid size-9 place-items-center rounded-full border border-white/15 text-white md:hidden"
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
        <div className="border-t border-white/10 bg-void md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav
              .filter((item) => item.href !== shopHref)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-white hover:bg-white/8"
                >
                  {item.label}
                </Link>
              ))}
            <ButtonLink
              href={shopHref}
              size="sm"
              className="mt-2 w-full uppercase tracking-[0.14em]"
              onClick={() => setMenuOpen(false)}
            >
              Tienda
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
