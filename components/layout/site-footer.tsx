import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { mainNav, siteConfig } from "@/lib/site-config";
import { productos } from "@/content/productos";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0b0e14] text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              {siteConfig.tagline}. Diseñamos, implementamos y operamos la capa
              técnica de compañías en toda la región.
            </p>
          </div>

          <FooterColumn title="Navegación">
            {mainNav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Productos">
            {productos.map((producto) => (
              <FooterLink
                key={producto.slug}
                href={`/productos/${producto.slug}`}
              >
                {producto.nombre}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contacto">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="text-sm text-white/50">{siteConfig.contact.phone}</li>
            <li className="text-sm leading-relaxed text-white/50">
              {siteConfig.contact.address}
            </li>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos los
            derechos reservados.
          </p>
          <ul className="flex gap-5">
            {siteConfig.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-xs text-white/40 transition-colors hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-white/50 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
