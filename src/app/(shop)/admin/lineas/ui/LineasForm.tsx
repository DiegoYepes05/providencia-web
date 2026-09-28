"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory, deleteCategory } from "@/actions";

interface Linea {
  id: string;
  name: string;
  productCount: number;
}

export function LineasForm({ lineas }: { lineas: Linea[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const onCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const result = await createCategory(name);
    setPending(false);

    if (!result.ok) {
      setMessage(result.message ?? "No se pudo crear la línea");
      return;
    }

    setName("");
    router.refresh();
  };

  const onDelete = async (id: string) => {
    setMessage("");
    const result = await deleteCategory(id);
    if (!result.ok) {
      setMessage(result.message ?? "No se pudo eliminar la línea");
      return;
    }
    router.refresh();
  };

  return (
    <div className="max-w-2xl">
      <form onSubmit={onCreate} className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="linea" className="field-label">
            Nueva línea
          </label>
          <input
            id="linea"
            className="field"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ej. Urbana"
            required
          />
        </div>
        <button type="submit" disabled={pending} className="btn-primary h-12 px-6">
          {pending ? "Guardando…" : "Crear línea"}
        </button>
      </form>

      {message ? (
        <p className="mb-6 text-sm text-red-400">{message}</p>
      ) : null}

      <div className="divide-y divide-white/10 border-t border-white/10">
        {lineas.length === 0 ? (
          <p className="py-8 text-sm text-white/45">
            Aún no hay líneas. Crea la primera para clasificar productos.
          </p>
        ) : (
          lineas.map((linea) => (
            <div
              key={linea.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div>
                <p className="font-medium text-white">{linea.name}</p>
                <p className="mt-1 text-sm text-white/45">
                  {linea.productCount === 1
                    ? "1 producto"
                    : `${linea.productCount} productos`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onDelete(linea.id)}
                className="rounded-full border border-white/15 px-4 py-2 text-[12px] font-medium tracking-[0.14em] text-white/60 uppercase transition-colors hover:border-white/40 hover:text-white"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
