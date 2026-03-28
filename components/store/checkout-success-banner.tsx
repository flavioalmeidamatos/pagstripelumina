"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export function CheckoutSuccessBanner() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setVisible(false);
      router.replace("/");
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [router]);

  if (!visible) {
    return null;
  }

  return (
    <div className="container pt-6">
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-emerald-800 shadow-sm">
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">
          Pagamento Concluído com Sucesso. Obrigado.
        </p>
      </div>
    </div>
  );
}
