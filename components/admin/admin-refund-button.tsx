"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function AdminRefundButton({
  orderId,
  paymentIntentId
}: {
  orderId: string;
  paymentIntentId: string | null;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleRefund() {
    if (!paymentIntentId) {
      toast.error("Este pedido ainda não possui payment intent.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/refund", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderId,
          paymentIntentId
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Não foi possível criar o refund.");
      }

      toast.success(`Refund criado: ${result.refundId}`);
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao gerar refund.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefund}
      disabled={isLoading || !paymentIntentId}
    >
      {isLoading ? "Reembolsando..." : "Refund"}
    </Button>
  );
}

