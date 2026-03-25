"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function CartSheet({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { items, removeItem, updateQuantity } = useCart();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
      <button className="absolute inset-0" onClick={onClose} aria-label="Fechar" />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="flex items-center gap-3 text-2xl font-semibold">
            <ShoppingBag className="text-primary" />
            Seu carrinho
          </h2>
          <button onClick={onClose} className="text-muted transition hover:text-foreground">
            <X />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-muted">
              <ShoppingBag className="h-12 w-12" />
              <p>Seu carrinho está vazio por enquanto.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-3xl border border-border p-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-secondary">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted">{item.brand}</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-full border border-border p-1"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        className="rounded-full border border-border p-1"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{formatCurrency(item.price)}</span>
                      <button className="text-danger" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-border p-6">
          <Button asChild className="w-full">
            <Link href="/cart" onClick={onClose}>
              Ir para o carrinho
            </Link>
          </Button>
        </div>
      </aside>
    </div>
  );
}

