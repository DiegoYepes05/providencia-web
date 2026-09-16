import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * Layout del e-commerce. Hoy reutiliza el encabezado corporativo; cuando exista
 * carrito y checkout, el encabezado propio de la tienda se cambia solo aquí sin
 * afectar la landing de `app/(landing)`.
 */
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
