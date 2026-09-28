import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { mainNav, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-void text-white">
      <Container className="py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-white/45">
              Diseñado para Colombia. Ingeniería eléctrica con compromiso.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-white"
            >
              Contacto
            </Link>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <ul className="flex gap-5">
            {siteConfig.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-xs text-white/35 transition-colors hover:text-white"
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
