"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export const ShopProviders = ({ children }: Props) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      {children}
      <Toaster
        theme="dark"
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast: "bg-panel border-white/10 text-white",
          },
        }}
      />
    </SessionProvider>
  );
};
