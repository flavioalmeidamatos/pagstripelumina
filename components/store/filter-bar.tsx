import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ProductCategory } from "@/types/domain";

export function FilterBar({
  categories,
  selectedCategory,
  selectedBrand
}: {
  categories: ProductCategory[];
  selectedCategory?: string;
  selectedBrand?: string;
}) {
  const brands = ["Lumina Beaute", "Maison Glow", "Atelier Essence"];

  return (
    <div className="space-y-5 rounded-[32px] border border-border bg-white/80 p-6">
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">Categorias</p>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant={!selectedCategory ? "default" : "outline"} size="sm">
            <Link href="/catalog">Todas</Link>
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              asChild
              variant={selectedCategory === category.slug ? "default" : "outline"}
              size="sm"
            >
              <Link href={`/catalog?category=${category.slug}`}>{category.name}</Link>
            </Button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">Marcas</p>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant={!selectedBrand ? "default" : "outline"} size="sm">
            <Link href={selectedCategory ? `/catalog?category=${selectedCategory}` : "/catalog"}>
              Todas
            </Link>
          </Button>
          {brands.map((brand) => (
            <Button
              key={brand}
              asChild
              variant={selectedBrand === brand ? "default" : "outline"}
              size="sm"
            >
              <Link href={`/catalog?brand=${encodeURIComponent(brand)}`}>{brand}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

