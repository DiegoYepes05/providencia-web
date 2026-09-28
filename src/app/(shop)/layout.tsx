import { Footer, Sidebar, TopMenu } from "@/components";
import { ShopProviders } from "@/components/providers/ShopProviders";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShopProviders>
      <div className="flex min-h-full flex-col bg-void">
        <TopMenu />
        <Sidebar />

        <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 lg:px-12 lg:py-14">
          {children}
        </div>

        <Footer />
      </div>
    </ShopProviders>
  );
}
