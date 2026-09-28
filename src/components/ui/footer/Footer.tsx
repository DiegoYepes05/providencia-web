import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { shopNav, siteConfig } from "@/lib/site-config";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-void text-white">
      <Container className="py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo href="/shop" />
            <p className="mt-5 text-sm leading-relaxed text-white/45">
              Tienda oficial de {siteConfig.name}. Catálogo, pedidos y seguimiento
              en un solo lugar.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {shopNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-white"
            >
              Sitio
            </Link>
          </nav>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
        </div>
      </Container>
    </footer>
  );
};
