"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { mainNav, primaryCta } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors",
        scrolled
          ? "border-b border-white/10 bg-[#0b0e14]/90 backdrop-blur-md"
          : "border-b border-transparent bg-[#0b0e14]",
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex">
            {mainNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[13px] transition-colors hover:text-white",
                    active ? "font-semibold text-white" : "text-white/50",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <ButtonLink href={primaryCta.href} variant="brand" size="sm">
              {primaryCta.label}
            </ButtonLink>
          </div>

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
        <div className="border-t border-white/10 bg-[#0b0e14] md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
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
              href={primaryCta.href}
              variant="brand"
              className="mt-2 w-full"
              onClick={() => setMenuOpen(false)}
            >
              {primaryCta.label}
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
