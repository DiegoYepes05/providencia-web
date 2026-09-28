import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="grid size-16 place-items-center rounded-full border border-white/15 text-brand-400">
        <IoCartOutline size={28} />
      </div>

      <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-white">
        Tu carrito está vacío
      </h1>
      <p className="mt-2 max-w-sm text-sm text-white/45">
        Explora el catálogo y agrega los productos que necesites.
      </p>

      <Link href="/shop" className="btn-primary mt-8">
        Ir al catálogo
      </Link>
    </div>
  );
}
