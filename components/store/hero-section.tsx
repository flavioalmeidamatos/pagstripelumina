import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection({ heroTag }: { heroTag: string }) {
  return (
    <section className="bg-hero">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.15fr_0.85fr] md:py-20">
        <div className="flex flex-col justify-center">
          <Badge className="w-fit">{heroTag}</Badge>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Cosméticos premium para uma rotina de beleza elegante, sensorial e
            confiável.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
            Descubra fórmulas sofisticadas, kits promocionais e fragrâncias de
            presença marcante em uma experiência feita para converter com leveza.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/catalog">
                Explorar catálogo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/catalog?featured=true">Ver destaques</Link>
            </Button>
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-[36px] border border-white/60 bg-white/50 shadow-glow">
          <Image
            src="https://images.unsplash.com/photo-1526758097130-bab247274f58?auto=format&fit=crop&w=1200&q=80"
            alt="Produtos premium de skincare sobre bancada elegante"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(56,27,48,0.35)] via-transparent to-[rgba(255,255,255,0.2)]" />
          <div className="absolute bottom-5 left-5 rounded-3xl bg-white/92 p-5 shadow-soft backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Coleção assinatura</p>
            <p className="mt-2 text-lg font-semibold text-foreground">Glow, ritual e performance</p>
          </div>
        </div>
      </div>
    </section>
  );
}

