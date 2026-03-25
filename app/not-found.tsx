import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-20">
      <div className="rounded-[32px] border border-border bg-white/90 p-10 text-center shadow-soft">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">404</p>
        <h1 className="mt-4 text-4xl font-semibold">Página não encontrada</h1>
        <p className="mt-4 text-muted">Talvez este produto tenha saído da curadoria principal.</p>
        <Button asChild className="mt-8">
          <Link href="/catalog">Voltar ao catálogo</Link>
        </Button>
      </div>
    </div>
  );
}
