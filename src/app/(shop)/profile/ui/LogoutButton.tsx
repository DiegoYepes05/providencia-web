"use client";

import { SignOutButton } from "@/components/auth/sign-out-button";

export const LogoutButton = () => {
  return (
    <SignOutButton className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/8">
      Cerrar sesión
    </SignOutButton>
  );
};
