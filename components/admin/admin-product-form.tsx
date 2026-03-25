"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function AdminProductForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Falha ao salvar produto.");
      }

      toast.success("Produto salvo com sucesso.");
      event.currentTarget.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <div className="md:col-span-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" required />
      </div>
      <div>
        <Label htmlFor="brand">Marca</Label>
        <Input id="brand" name="brand" required />
      </div>
      <div>
        <Label htmlFor="categorySlug">Categoria</Label>
        <Input id="categorySlug" name="categorySlug" placeholder="skincare" required />
      </div>
      <div>
        <Label htmlFor="price">Preço</Label>
        <Input id="price" name="price" type="number" step="0.01" required />
      </div>
      <div>
        <Label htmlFor="compareAtPrice">Preço anterior</Label>
        <Input id="compareAtPrice" name="compareAtPrice" type="number" step="0.01" />
      </div>
      <div>
        <Label htmlFor="inventoryCount">Estoque</Label>
        <Input id="inventoryCount" name="inventoryCount" type="number" required />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input id="subtitle" name="subtitle" required />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea id="description" name="description" required />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="imageUrl">Imagem principal</Label>
        <Input id="imageUrl" name="imageUrl" type="url" required />
      </div>
      <div className="flex items-center gap-3">
        <input id="isFeatured" name="isFeatured" type="checkbox" value="true" />
        <Label htmlFor="isFeatured" className="mb-0 tracking-normal uppercase normal-case text-sm">
          Produto em destaque
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <input id="isKit" name="isKit" type="checkbox" value="true" />
        <Label htmlFor="isKit" className="mb-0 tracking-normal uppercase normal-case text-sm">
          Kit promocional
        </Label>
      </div>
      <div className="md:col-span-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar produto"}
        </Button>
      </div>
    </form>
  );
}

