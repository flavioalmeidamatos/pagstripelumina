"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";
import { CartProvider } from "@/components/cart/cart-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster richColors position="top-right" />
    </CartProvider>
  );
}

