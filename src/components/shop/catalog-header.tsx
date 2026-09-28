export function CatalogHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header className="mb-12 border-b border-white/10 pb-8 lg:mb-16 lg:pb-10">
      <p className="text-[11px] font-medium tracking-[0.2em] text-brand-400 uppercase">
        {subtitle}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-6xl">
        {title}
      </h1>
    </header>
  );
}
