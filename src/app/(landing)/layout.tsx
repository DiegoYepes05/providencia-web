import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PreventaModal } from "@/components/landing/preventa-modal";

/** Sitio corporativo. El e-commerce vive en el route group `(shop)`. */
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <PreventaModal />
    </>
  );
}
