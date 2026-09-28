"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { toggleProductActive } from "@/actions";

interface Props {
  id: string;
  isActive: boolean;
}

export const ProductActiveToggle = ({ id, isActive }: Props) => {
  const [active, setActive] = useState(isActive);
  const [isPending, startTransition] = useTransition();

  const onToggle = () => {
    const next = !active;
    setActive(next);

    startTransition(async () => {
      const result = await toggleProductActive(id, next);

      if (!result.ok) {
        setActive(!next);
        toast.error(result.message ?? "No se pudo actualizar");
        return;
      }

      toast.success(next ? "Producto activado" : "Producto desactivado");
    });
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={isPending}
      className={`inline-flex h-9 items-center rounded-full px-3 text-[12px] font-semibold tracking-[0.08em] uppercase transition-colors ${
        active
          ? "bg-brand-400/15 text-brand-400 hover:bg-brand-400/25"
          : "bg-white/8 text-white/45 hover:bg-white/12"
      }`}
    >
      {active ? "Activo" : "Inactivo"}
    </button>
  );
};
