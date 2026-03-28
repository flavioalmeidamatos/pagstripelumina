"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";

export function CheckoutButton({
  couponCode
}: {
  couponCode?: string;
}) {
  const router = useRouter();
  const { items } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  async function handleCheckout() {
    if (!items.length) {
      toast.error("Seu carrinho está vazio.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items,
          couponCode
        })
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Entre na sua conta para finalizar o pedido.");
          router.push("/login?next=/cart");
          return;
        }

        throw new Error(result.error || "Não foi possível iniciar o checkout.");
      }
      if (result.url) {
        window.location.href = result.url;
        return;
      }

      throw new Error("URL de checkout não retornada.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Falha inesperada no checkout."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isLoading}>
      {isLoading ? (
        "Redirecionando para o pagamento..."
      ) : (
        <>
          <Lock className="mr-2 h-4 w-4" />
          Finalizar Pagamento Seguro
        </>
      )}
    </Button>
  );
}
