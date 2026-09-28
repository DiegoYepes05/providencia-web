"use client";

import { signOut } from "next-auth/react";

interface Props {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function SignOutButton({ className, children, onClick }: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        onClick?.();
        await signOut({ callbackUrl: "/auth/login" });
      }}
    >
      {children}
    </button>
  );
}
