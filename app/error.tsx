"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container py-20">
      <div className="rounded-[32px] border border-border bg-white/90 p-10 text-center shadow-soft">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Erro inesperado</p>
        <h1 className="mt-4 text-3xl font-semibold text-foreground">
          Algo saiu do esperado nesta etapa.
        </h1>
        <p className="mt-4 text-muted">
          Você pode tentar novamente sem perder o restante da navegação.
        </p>
        <Button className="mt-8" onClick={reset}>
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}

