import Link from "next/link";

export const PageNotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-400">
        Error
      </p>
      <h2 className="mt-3 text-7xl font-semibold tracking-tighter text-white">
        404
      </h2>
      <p className="mt-4 text-lg font-medium text-white">
        No encontramos esa página.
      </p>
      <p className="mt-2 text-sm text-white/45">
        Puedes volver al{" "}
        <Link href="/" className="text-brand-400 hover:text-brand-300">
          inicio
        </Link>{" "}
        o al{" "}
        <Link href="/shop" className="text-brand-400 hover:text-brand-300">
          catálogo
        </Link>
        .
      </p>
    </div>
  );
};
