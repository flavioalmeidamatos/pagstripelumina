import type { Product } from "@/types/domain";
import { ProductCard } from "@/components/store/product-card";

export function ProductGrid({
  products,
  emptyMessage = "Nenhum produto encontrado com os filtros escolhidos."
}: {
  products: Product[];
  emptyMessage?: string;
}) {
  if (!products.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-border bg-white/70 p-10 text-center text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

