import Link from "next/link";
import { getCategories } from "@/actions";
import { categorySlug } from "@/lib/category-slug";
import { cn } from "@/lib/utils";

export async function CatalogHeader({
  title,
  subtitle,
  activeHref,
}: {
  title: string;
  subtitle: string;
  activeHref: string;
}) {
  const categories = await getCategories();
  const items = [
    { label: "Catálogo", href: "/shop" },
    ...categories.map((category) => ({
      label: category.name,
      href: `/linea/${categorySlug(category.name)}`,
    })),
  ];

  return (
    <header className="mb-12 border-b border-white/10 pb-8 lg:mb-16 lg:pb-10">
      <p className="text-[11px] font-medium tracking-[0.2em] text-brand-400 uppercase">
        {subtitle}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-6xl">
        {title}
      </h1>

      <nav aria-label="Categorías" className="mt-8 flex flex-wrap gap-2">
        {items.map((item) => {
          const active = item.href === activeHref;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-[12px] font-medium tracking-[0.14em] uppercase transition-colors",
                active
                  ? "bg-brand-400 text-void"
                  : "border border-white/15 text-white/55 hover:border-white/40 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
