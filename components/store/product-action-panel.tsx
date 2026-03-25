"use client";

import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types/domain";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";

export function ProductActionPanel({ product }: { product: Product }) {
  const { addItem, buyNow, toggleFavorite, favorites } = useCart();
  const isFavorite = favorites.includes(product.id);

  return (
    <div className="space-y-3 rounded-[28px] border border-border bg-white/90 p-6 shadow-soft">
      <Button className="w-full" size="lg" onClick={() => buyNow(product)}>
        Comprar agora
      </Button>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="secondary" onClick={() => addItem(product)}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Adicionar ao carrinho
        </Button>
        <Button variant="outline" onClick={() => toggleFavorite(product.id)}>
          <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          {isFavorite ? "Favoritado" : "Salvar"}
        </Button>
      </div>
    </div>
  );
}

