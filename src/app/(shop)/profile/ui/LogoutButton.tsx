"use client";

import { logout } from "@/actions";

export const LogoutButton = () => {
  return (
    <button
      type="button"
      onClick={() => logout()}
      className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/8"
    >
      Cerrar sesión
    </button>
  );
};
