import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { shopNav, siteConfig } from "@/lib/site-config";

export function ShopFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface text-ink">
      <Container className="py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Logo href="/shop" className="[&_img]:h-10" />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Tienda oficial de {siteConfig.legalName}. Motos y scooters
              eléctricos con reserva y respaldo en Colombia.
            </p>
          </div>

          <ul className="space-y-2 text-sm">
            {shopNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/auth/login" className="text-muted hover:text-ink">
                Ingresar
              </Link>
            </li>
            <li>
              <Link href="/" className="text-muted hover:text-ink">
                Sitio corporativo
              </Link>
            </li>
          </ul>
        </div>

        <p className="mt-8 border-t border-line pt-5 text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.legalName}. Tienda aparte del
          sitio corporativo.
        </p>
      </Container>
    </footer>
  );
}
