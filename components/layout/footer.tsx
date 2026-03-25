import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white/70 py-14">
      <div className="container grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            Lumina Beaute
          </p>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted">
            Curadoria premium de skincare, maquiagem, kits e perfumes com experiência
            de compra elegante, segura e moderna.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Navegação
          </p>
          <div className="space-y-3 text-sm">
            <Link href="/catalog" className="block">
              Catálogo
            </Link>
            <Link href="/cart" className="block">
              Carrinho
            </Link>
            <Link href="/account/orders" className="block">
              Meus pedidos
            </Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Suporte
          </p>
          <div className="space-y-3 text-sm">
            <p>Atendimento com resposta humanizada.</p>
            <p>Pagamentos seguros com Stripe.</p>
            <p>Pedidos sincronizados com Supabase.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

