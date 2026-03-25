"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/types/domain";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-provider";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, toggleFavorite, favorites } = useCart();
  const isFavorite = favorites.includes(product.id);

  return (
    <Card className="group overflow-hidden border-white/80 bg-white/90 transition hover:-translate-y-1 hover:shadow-glow">
      <Link href={`/product/${product.slug}`} className="relative block h-72 overflow-hidden">
        <Image
          src={product.images[0]?.image_url ?? ""}
          alt={product.images[0]?.alt_text ?? product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">{product.brand}</p>
            <Link href={`/product/${product.slug}`} className="mt-2 block text-lg font-semibold">
              {product.name}
            </Link>
            <p className="mt-2 text-sm leading-6 text-muted">{product.subtitle}</p>
          </div>
          <button
            className={`rounded-full border p-2 ${isFavorite ? "border-primary bg-primary/10 text-primary" : "border-border text-muted"}`}
            onClick={() => toggleFavorite(product.id)}
            aria-label="Favoritar produto"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {product.is_featured && <Badge>Destaque</Badge>}
          {product.is_kit && <Badge className="bg-accent text-accent-foreground">Kit</Badge>}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-foreground">{formatCurrency(product.price)}</p>
            {product.compare_at_price && (
              <p className="text-sm text-muted line-through">
                {formatCurrency(product.compare_at_price)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-warning">
            <Star className="h-4 w-4 fill-current" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <Button className="w-full" onClick={() => addItem(product)}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Adicionar ao carrinho
        </Button>
      </CardContent>
    </Card>
  );
}

