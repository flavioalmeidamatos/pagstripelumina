"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function PortalButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleOpenPortal() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/portal", { method: "POST" });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Não foi possível abrir o portal.");
      }

      window.location.href = result.url;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao abrir portal.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button variant="secondary" className="w-full" onClick={handleOpenPortal} disabled={isLoading}>
      {isLoading ? "Abrindo portal..." : "Abrir customer portal"}
    </Button>
  );
}

