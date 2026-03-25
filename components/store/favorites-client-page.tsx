"use client";

import { useMemo } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { fallbackProducts } from "@/lib/mock-data";
import { ProductGrid } from "@/components/store/product-grid";

export function FavoritesClientPage() {
  const { favorites } = useCart();

  const products = useMemo(
    () => fallbackProducts.filter((product) => favorites.includes(product.id)),
    [favorites]
  );

  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight">Favoritos</h1>
      <p className="mt-4 text-muted">
        Salve produtos para retomar sua decisão de compra com calma.
      </p>
      <div className="mt-8">
        <ProductGrid
          products={products}
          emptyMessage="Você ainda não salvou produtos nos favoritos."
        />
      </div>
    </div>
  );
}

