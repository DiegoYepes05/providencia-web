"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export const ShopProviders = ({ children }: Props) => {
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

  const session = (
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

  if (!paypalClientId) {
    return session;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: paypalClientId,
        intent: "capture",
        currency: "USD",
      }}
    >
      {session}
    </PayPalScriptProvider>
  );
};
